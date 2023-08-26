<template>
    <div>
        <div v-for="message in messages" :key="message.id">
            {{ message.user.name }}: {{ message.text }}
        </div>

        <form @submit.prevent="send">
            <input type="text" v-model="text">
            <button type="submit">Send</button>
        </form>
    </div>
</template>

<script>
import Echo from "laravel-echo";
const axios = require('axios');
window.io = require('socket.io-client');

let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjkyNjI4NDAwLCJleHAiOjE2OTI5ODg0MDAsIm5iZiI6MTY5MjYyODQwMCwianRpIjoiNmhaMVJWVFJJUmVScHluQyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tFYJEV5EwmgMP93MXUeJQm_xa2euua1VAWCsddD4CE8';

export default {
    name: 'RoomUser',
    data() {
        return {
            messages: [],
            text: "",
        };
    },

    mounted() {
        // 初始化Echo
        this.initEcho();
        // 获取以往的聊天记录
        this.fetchMessages()
    },

    methods: {
        initEcho() {
            window.Echo = new Echo({
                broadcaster: "socket.io",
                host: 'http://api.ying.com:6001',
                withCredentials: true,
				// 用户1
				// auth: {
                //     headers: {
                //         Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjkyMjk3MjgzLCJleHAiOjE2OTI2NTcyODMsIm5iZiI6MTY5MjI5NzI4MywianRpIjoibmtJT3c5bHVrV3Zka2RsRiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.n0LZC4foayU2POUXAu9ude1KaX0in3l5CvQimoe33Ts'
                //     }
                // }
				// 用户2
				auth: {
                    headers: {
                        Authorization: token
                    }
                }
            });

            // 接收聊天室频道，用户这边在打开窗口时，自动监听room.user_id 的聊天室
			window.Echo.join("room.2")
			.here((users) => {
                // 显示频道所有用户
				console.log(users);
			})
			.joining((user) => {
                // 管理员加入时，可以在这里显示：客服加入房间
				console.log(user.name + '进入了房间');
			})
			.leaving((user) => {
                // 管理员或者用户离开频道时执行
				console.log(user.name + '离开了房间');
			})
            .listen('RoomNewMessage', (event) => {
                console.log(event)
            })
			.error((error) => {
                // 错误
				console.error(error);
			});
        },
        // 获取以往的聊天记录
        fetchMessages() {
            axios.get('http://api.ying.com/api/swoole/room-chat-messages?user_id=2').then((response) => {
                this.messages = response.data.data.messages;
                console.log(response.data.data);
            });
        },
        send() {
            // X-Socket-ID  标头将自动附加到每个传出请求中
            axios.defaults.headers.common['X-Socket-ID'] = window.Echo.socketId();
            axios.defaults.headers.common['Authorization'] = token;
            axios.post('http://api.ying.com/api/swoole/room-new-message', {
                message: this.text, room: 'room.2'
            }).then(() => {
                this.text = "";
            });
        },
    },
};
</script>

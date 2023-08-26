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

let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTY5MjM0MzY1NiwiZXhwIjoxNjkyNzAzNjU2LCJuYmYiOjE2OTIzNDM2NTYsImp0aSI6InViSTdFdXRiY2dEc2ZmZEgiLCJzdWIiOiIxIiwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9._GdMKoQK3MepuqhTSdkpishhKJVS9hhcrbcYPAiyOxQ';

export default {
    name: 'RoomAdmin',
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
				// 管理员1
				auth: {
                    headers: {
                        Authorization: token
                    }
                }
				// 管理员2
				// auth: {
                //     headers: {
                //         Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTY5MjM0Mzk1OSwiZXhwIjoxNjkyNzAzOTU5LCJuYmYiOjE2OTIzNDM5NTksImp0aSI6IjlEdmtBOTl6QjZPZWI3OEsiLCJzdWIiOiIyIiwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.qfBNiEo5Yn9cbPZf39RmqizGHLpBGEHmzlUOMcrc1Ac'
                //     }
                // }
            });

            // 接收聊天室频道
			window.Echo.join("room.2")
			.here((users) => {
                // 显示频道所有用户
				console.log(users);
			})
			.joining((user) => {
                // 有人加入频道显示用户信息
				console.log(user.name + '进入了房间');
			})
			.leaving((user) => {
                // 管理员或者用户离开频道时执行，可以显示：客户已经离开房间
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
        fetchMessages() {
            axios.get('http://api.ying.com/api/swoole/room-chat-messages?user_id=2').then((response) => {
                this.messages = response.data.data.messages;
                console.log(response.data.data);
            });
        },
        // 发送消息
        send() {
            // X-Socket-ID  标头将自动附加到每个传出请求中
            axios.defaults.headers.common['X-Socket-ID'] = window.Echo.socketId();
            axios.defaults.headers.common['Authorization'] = token;
            axios.post('http://api.ying.com/api/swoole/room-new-message', { message: this.text, room: 'room.2'}).then(() => {
                this.text = "";
            });
        },
    },
};
</script>

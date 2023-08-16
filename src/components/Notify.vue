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
import Pusher from "pusher-js";
const axios = require('axios');

export default {
    name: 'Notify',
    data() {
        return {
            messages: [],
            text: "",
        };
    },

    mounted() {
        this.initEcho();
        // this.fetchMessages();
    },

    methods: {
        initEcho() {
            window.Echo = new Echo({
                broadcaster: "pusher",
                wsHost: "http://api.ying.com",
                // wsPort: 80,
                // wssPort: 433,
                key: "9c4bd1644e4d169d5885",
                cluster: "mt1",
                // forceTLS: location.protocol === 'https:',
                // forceTLS: false,
                // enabledTransports: ['ws', 'wss'],
                authEndpoint: "http://api.ying.com/api/swoole/auth",
                auth: {
                    headers: {
                        // Authorization: "Bearer " + localStorage.getItem("access_token"),
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjkxOTExODAyLCJleHAiOjE2OTIyNzE4MDIsIm5iZiI6MTY5MTkxMTgwMiwianRpIjoiM284S1l4WUVaa1Btd3Z1WCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.9PWhA0pPCQL7mjJi1-O0nJOiku4opovxIZajmfWMx_s",
                    },
                },
            });

            window.Echo.join('test').here((users) => {
                console.log(users);
            });

            window.Echo.channel('test').listen("SwooleTest", (event) => {
            // window.Echo.private('test').listen("SwooleTest", (event) => {
                console.log('1111111111111111')
                console.log(event)
                // this.messages.push(event.message);
            });
        },

        fetchMessages() {
            axios.get('http://api.ying.com/api/swoole/messages').then((response) => {
                this.messages = response.data.messages;
            });
        },

        send() {
            axios.post('http://api.ying.com/api/swoole/messages', { text: this.text }).then(() => {
                this.text = "";
            });
        },
    },
};
</script>

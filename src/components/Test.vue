<template>
    
</template>

<script>
import Echo from "laravel-echo";
const axios = require('axios');
window.io = require('socket.io-client');


export default {
    name: 'Test',
    data() {
        return {
            messages: [],
            text: "",
        };
    },

    mounted() {
        this.initEcho();
    },

    methods: {
        initEcho() {
            window.Echo = new Echo({
                broadcaster: "socket.io",
                // host: "192.168.56.56",
                host: 'http://api.ying.com:6001',
                withCredentials: true
            });

            // 接收公共频道
            window.Echo.channel('swoole-test');
            // window.Echo.channel('swoole-test').listen("SwooleTest", (event) => {
            // // 接收私有频道
            // // window.Echo.private('swoole-test').listen("SwooleTest", (event) => {
            //     console.log(event)
            //     // this.messages.push(event.message);
            // });
        },
    },
};
</script>

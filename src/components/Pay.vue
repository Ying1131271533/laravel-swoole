<template>
    
</template>

<script>
import Echo from "laravel-echo";
const axios = require('axios');
window.io = require('socket.io-client');


export default {
    name: 'Pay',
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
                host: 'http://api.ying.com:6001',
                withCredentials: true,
                auth: {
                    headers: {
                        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjkyMjk3MjgzLCJleHAiOjE2OTI2NTcyODMsIm5iZiI6MTY5MjI5NzI4MywianRpIjoibmtJT3c5bHVrV3Zka2RsRiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.n0LZC4foayU2POUXAu9ude1KaX0in3l5CvQimoe33Ts'
                    }
                }
            });

            // 接收公共频道
            // window.Echo.channel('user.' + 1).listen("OrderPay", (event) => {
            // 接收私有频道
            window.Echo.private('user.1').listen("OrderPay", (event) => {
                console.log(event)
                if (event.status == 2) {
                    alert('您的订单已支付！');
                }
            });
        },

    },
};
</script>

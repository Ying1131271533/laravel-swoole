<template>
    
</template>

<script>
import Echo from "laravel-echo";
const axios = require('axios');
window.io = require('socket.io-client');


export default {
    name: 'Dispatch',
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
                        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjkyMjk3MzIyLCJleHAiOjE2OTI2NTczMjIsIm5iZiI6MTY5MjI5NzMyMiwianRpIjoiNURDZnlkbXhsU3FaZEhSZyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.bmN6bqYBjtnqPa4l64XIYZPP-icrqb2h9N5OINlO8x0'
                    }
                }
            });

            // 接收私有频道
            window.Echo.private('user.2')
            // .listen(/* ... */) // 这里监听多个事件
            .listen("OrderDispatch", (event) => {
            // window.Echo.private('user.' + 1).listen("OrderDispatch", (event) => {
                console.log(event)
                if (event.status == 3) {
                    alert('您的订单已发货！');
                }
            });
        },

    },
};
</script>

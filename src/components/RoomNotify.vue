<template>
    
</template>

<script>
import Echo from "laravel-echo";
const axios = require('axios');
window.io = require('socket.io-client');


export default {
    name: 'RoomNotify',
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
				// 管理员1
				auth: {
                    headers: {
                        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTY5MjM0MzY1NiwiZXhwIjoxNjkyNzAzNjU2LCJuYmYiOjE2OTIzNDM2NTYsImp0aSI6InViSTdFdXRiY2dEc2ZmZEgiLCJzdWIiOiIxIiwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9._GdMKoQK3MepuqhTSdkpishhKJVS9hhcrbcYPAiyOxQ'
                    }
                }
            });

            // 接收私有频道
            window.Echo.private('admin.1').listen("RoomNotify", (event) => {
                console.log(event)
                alert('您的有一条用户回复：' + event.messages);
            });
        },

    },
};
</script>

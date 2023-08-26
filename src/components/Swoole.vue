<template>
    <div>
        <button @click="sendMessage">Send Message</button>
    </div>
</template>

<!-- socket.io -->
<script>

let data = {
    'event': 'test',
    'data': $('#input').val()
};
// 发送消息
websocket.send(JSON.stringify(data));

// import io from 'socket.io-client';
// // window.io = require('socket.io-client');

// export default {
//     created() {
//         this.socket = io('ws://192.168.56.56:1215');

//         this.socket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         this.socket.on('disconnect', () => {
//             console.log('Disconnected from server');
//         });
//     },
//     methods: {
//         sendMessage() {
//             this.socket.emit('test', 'Hello');
//         },
//     },
// };
</script>

<!-- websocket -->
<!-- <script>
import Echo from "laravel-echo";
const axios = require('axios');
window.io = require('socket.io-client');
import $ from 'jquery';

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjkyMjk3MzIyLCJleHAiOjE2OTI2NTczMjIsIm5iZiI6MTY5MjI5NzMyMiwianRpIjoiNURDZnlkbXhsU3FaZEhSZyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.bmN6bqYBjtnqPa4l64XIYZPP-icrqb2h9N5OINlO8x0';
// let wsServer = 'ws://192.168.56.56:1215?type=chat&token=' + token;
// let wsServer = 'ws://192.168.56.56:1215?token=' + token;
let wsServer = 'ws://api.ying.com:1215';
let websocket = null;
let lock = false; // 锁，用于断线重连


export default {
    mounted() {
        // 连接
        this.link();
    },
    methods: {
        // 连接聊天室
        link() {
            // 创建WebSocket Server对象，监听124.71.218.160:9502端口
            websocket = new WebSocket(wsServer);
            websocket.send(JSON.stringify({ event: 'test', data: 'Hello' }));
            // 连接
            websocket.onopen = function (res) {
                $('#akali').append(
                    '<h1>连接成功！牡蛎摸牡蛎~</h1>'
                );
            };
            // 关闭连接
            websocket.onclose = function (res) {
                websocket.close();
                // 关闭连接时，重连
                // relink();
            };

            // 服务器返回的数据
            websocket.onmessage = function (res) {
                console.log('Retrieved data from server: ' + res.data);
                $('#message').append(
                    '<h3>' + res.data + '</h3>'
                );
            };

            // 内容抛出的错误，可以写入日志，用户那边则显示404错误
            websocket.onerror = function (res, e) {
                console.log('Error occured: ' + res.data);
                websocket.close();
                // 关闭连接时，重连
                // relink();
            };
        },

        // 发送消息
        send() {
            var message = $('#input').val();
            websocket.send(message);
        },

        // 重连聊天室
        relink() {
            if (lock) {
                return false;
            }
            // 锁住
            lock = true;
            setTimeout(() => {
                link();
                lock = false;
            }, 1000);
        }
    },
}



</script> -->
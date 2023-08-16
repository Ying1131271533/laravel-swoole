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
  
	export default {
    	name: 'Room',
		data() {
			return {
				messages: [],
				text: "",
			};
		},
  
		mounted() {
			this.initEcho();
			this.fetchMessages();
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
					forceTLS: location.protocol === 'https:',
					// forceTLS: false,
					enabledTransports: ['ws', 'wss'],
					authEndpoint: "http://api.ying.com/api/swoole/test",
					auth: {
						headers: {
							// Authorization: "Bearer " + localStorage.getItem("access_token"),
							Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnlpbmcuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTY5MTkwNzUxNywiZXhwIjoxNjkyMjY3NTE3LCJuYmYiOjE2OTE5MDc1MTcsImp0aSI6Ind6d3hiVFh1dlZzOUU5ZXgiLCJzdWIiOiIxIiwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.j-1MDXx0v412k9QYyaMGwlK1doVPRivOzRZ4Zbdyuk8",
						},
					},
				});
  
				window.Echo.join('test').here((users) => {
					console.log(users);
				});
  
				window.Echo.channel('test').listen(".message.sent", (event) => {
					this.messages.push(event.message);
				});
			},
  
			fetchMessages() {
				axios.get('http://api.ying.com/api/chat/messages').then((response) => {
					this.messages = response.data.messages;
				});
			},
  
			send() {
				axios.post('http://api.ying.com/api/chat/messages', { text: this.text }).then(() => {
					this.text = "";
				});
			},
		},
	};
  </script>
  
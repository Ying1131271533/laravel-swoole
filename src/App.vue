<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/test">测试</router-link> |
    <router-link to="/pay">订单已支付</router-link> |
    <router-link to="/dispatch">发货通知</router-link> |
    <router-link to="/room-notify">聊天室申请</router-link> |
    <router-link to="/room-user">聊天室-用户</router-link> |
    <router-link to="/room-admin">聊天室-管理员</router-link> |
    <router-link to="/swoole">Swoole</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

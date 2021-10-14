<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
  background: #f8fafc;
  padding: 50px 40px;
}
</style>

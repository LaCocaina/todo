<template>
  <div id="app">
    <div id="app-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
  * {
    outline: none;
  }
  #app {
    font-family: Arial, sans-serif;
  }
  #app-view {
    max-width: 700px;
    margin: 0 auto;
  }
</style>

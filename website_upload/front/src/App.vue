<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html { overflow-y: hidden; }
  html, body {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
</style>

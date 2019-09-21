<template>
  <div id="app">
    <router-view></router-view>
    <music-player id="MusicPlayer"></music-player>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer'
export default {
  name: 'app',
  components: { MusicPlayer }
}
</script>

<style lang='scss'>
#app {
  width: 100%;
  height: 100vh;
  #MusicPlayer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
  }
}
</style>

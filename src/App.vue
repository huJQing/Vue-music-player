<template>
  <div id="app">
    <!-- <transition name="musicListFade"> -->
    <router-view></router-view>
    <!-- </transition> -->
    <music-player id="MusicPlayer"></music-player>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer'
export default {
  name: 'app',
  components: { MusicPlayer },
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

  // .musicListFade-enter-to {
  //   transition: all 0.8s;
  // }
  // .musicListFade-enter {
  //   transform: translateX(500px);
  //   opacity: 0.5;
  // }
  // .musicListFade-leave-active {
  //   transition: all 0.8s;
  // }
  // .musicListFade-leave-to
  //   /* .slide-fade-leave-active for below version 2.1.8 */ {
  //   transform: translateX(500px);
  //   opacity: 0.5;
  // }
}
</style>

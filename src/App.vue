<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <music-player id="MusicPlayer"></music-player>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer'
export default {
  name: 'app',
  components: { MusicPlayer },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right';
        } else {
          this.transitionName = 'slide-left';
        }
      } else if (to.meta.index == 0 && from.meta.index > 0) {
        this.transitionName = 'slide-right';
      }
      window.console.log(this.transitionName)
      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      /*if( to.meta.index < from.meta.index){
            this.transitionName = 'slide-right';
      }else{
            this.transitionName = 'slide-left';
      }*/
    }
  }
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
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    left: 0;
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-right-leave-active {
    transform: translateX(100%);
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-leave-active {
    transform: translateX(-100%);
  }
}
</style>

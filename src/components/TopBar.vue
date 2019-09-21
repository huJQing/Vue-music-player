<template>
  <div id="topBar">
    <nav id="top-nav">
      <div class="top-title">MUSIC</div>
      <section class="top-list">
        <ul>
          <li
            v-for="(item , index) of navList"
            :key="item.text"
            :class="{active: item.isActive}"
            @click="changeActive(index,item.src)"
          >{{item.title}}</li>
        </ul>
      </section>
    </nav>
  </div>
</template>

<script>
import router from '../router/router'

export default {
  name: 'TopBar',
  data() {
    return {
      navList: [
        { title: '推荐', src: '/home', isActive: true },
        { title: '排行', src: '/rank', isActive: false },
        { title: '歌手', src: '/singer', isActive: false },
        { title: '搜索', src: '/serch', isActive: false }
      ]
    }
  },
  watch: {
    $route() {
      this.getRouterPath()
    }
  },
  methods: {
    changeActive: function (index, src) {
      router.push(src)
      this.navList.map(function (item, i) {
        return index == i ? (item.isActive = true) : (item.isActive = false)
      })
    },
    getRouterPath() {
      let routerPath = this.$route.path
      this.navList.map(function (item) {
        return item.src == routerPath
          ? (item.isActive = true)
          : (item.isActive = false)
      })
    }
  },
  mounted() {
    this.getRouterPath()
  }
}
</script>

<style lang='scss' scoped>
#top-nav {
  height: 90px;
  background: $globalContentBackColor;
  .top-title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
  }
  .top-list {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    ul {
      width: 100%;
      display: flex;
      li {
        width: 25%;
      }
      .active {
        @include activeText;
      }
    }
  }
}
</style>
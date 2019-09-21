<template>
  <section id="RecommendList">
    <div class="rocommendItem" v-for="item of playlists" :key="item.id">
      <div class="playListImg">
        <img :src="item.coverImgUrl | httpToHttps" class="coverImg" />
        <div class="playCount">
          <img src="../assets/headset.png" class="headsetIcon" />
          <div class="playCountNum">{{item.playCount | numFormat}}</div>
        </div>
        <img src="../assets/pause.png" class="stopPlayIcon" />
      </div>
      <div class="name">{{item.name}}</div>
      <div class="description">{{item.description}}</div>
    </div>
  </section>
</template>

<script>
import { getPlaylist } from '../request/api'

export default {
  name: 'RecommendList',
  data() {
    return {
      playlists: []
    }
  },
  methods: {
    getPlaylist() {
      getPlaylist().then(res => {
        if (res.code == 200) {
          this.playlists = res.playlists
          window.console.log(res)
        }
      })
    }
  },
  mounted() {
    this.getPlaylist()
  }
}
</script>

<style lang="scss" scoped>
#RecommendList {
  min-height: 100vh;
  padding: 10px 10px;
  background: $globalContentBackColor;
  color: $textColor;
  .rocommendItem {
    width: 100%;
    height: 100px;
    margin-bottom: 15px;
    .playListImg {
      width: 100px;
      height: 100px;
      float: left;
      position: relative;
      .coverImg {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        box-shadow: 13px 0 0 -6px rgba(100, 100, 100, 0.1);
      }
      .stopPlayIcon {
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
      .playCount {
        width: 60px;
        line-height: 15px;
        position: absolute;
        bottom: 7px;
        left: 5px;
        .headsetIcon {
          width: 15px;
          height: 15px;
          float: left;
          vertical-align: text-top;
        }
        .playCountNum {
          display: inline;
          font-size: 8px;
          margin-left: 5px;
          color: #ffffff;
          font-weight: 100;
        }
      }
    }
    .name {
      font-size: 14px;
      height: 20px;
      padding-top: 5px;
      line-height: 20px;
      margin-left: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .description {
      font-size: 12px;
      height: 63px;
      text-align: left;
      font-weight: lighter;
      margin-top: 4px;
      margin-left: 120px;
      color: #c6c6c6;
      overflow: hidden;
    }
  }
}
</style>
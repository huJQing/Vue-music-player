<template>
  <div id="recommend">
    <section id="recommendList">
      <div
        class="rocommendItem"
        v-for="item of playlists"
        :key="item.id"
        @click="gotoPlayList(item.id)"
      >
        <div class="listCover">
          <img :src="item.coverImgUrl + '?param=300y300' | httpToHttps" class="coverImg" />
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
  </div>
</template>

<script>
import { getPlaylist } from '../request/api'
import router from '../router/router'

export default {
  name: 'recommend',
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
        }
      })
    },
    gotoPlayList(e) {
      router.push('/playList/songlist/' + e)
    }
  },
  mounted() {
    this.getPlaylist()
  }
}
</script>

<style lang="scss" scoped>
#recommend {
  padding-bottom: 50px;
  #recommendList {
    padding: 10px 10px;
    background: $globalContentBackColor;
    color: $textColor;
    .rocommendItem {
      width: 100%;
      height: 100px;
      margin-bottom: 15px;
      @include listCover(true);
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
        text-align: justify;
      }
    }
  }
}
</style>
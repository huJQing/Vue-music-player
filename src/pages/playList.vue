<template>
  <div id="playList">
    <div class="topBar">
      <img class="returnButton" src="../assets/return-left.png" @click="returnPrePage" />
    </div>

    <div
      class="playListInfo"
      :style="{ backgroundImage:'url('+ httpToHttps(playListType == 'songlist' ? playListInfo.coverImgUrl : playListInfo.img1v1Url ) +')'}"
    >
      <div class="listName">{{playListInfo.name}}</div>
    </div>

    <song-list :songList="playList" id="SongList"></song-list>
  </div>
</template>

<script>
import { getPlaylistDetail, getArtists } from "../request/api"
import router from '../router/router'
import SongList from '../components/SongList'

export default {
  name: "playList",
  data() {
    return {
      playListType: '',
      playListId: '',
      playListInfo: {},
      playList: []
    }
  },
  components: {
    SongList,
  },
  methods: {
    httpToHttps(url) {
      if (!url) return '';
      if (url.substring(0, 5) == 'https') return url
      return 'https' + url.slice(4)
    },
    getPlaylistDetail(id) {
      getPlaylistDetail({ id: id }).then(e => {
        this.playListInfo = e.playlist
        this.playList = e.playlist.tracks
      })
    },
    getArtists(id) {
      getArtists({ id: id }).then(e => {
        window.console.log(e)
        this.playListInfo = e.artist
        this.playList = e.hotSongs
      })
    },
    returnPrePage() {
      router.go(-1)
    }
  },
  mounted() {
    window.console.log(this.$route.params.type, this.$route.params.id)
    this.playListType = this.$route.params.type
    this.playListId = this.$route.params.id
    if (this.playListType == 'songlist') {
      this.getPlaylistDetail(this.playListId)
    } else {
      this.getArtists(this.playListId)
    }
  }
}
</script>

<style lang="scss" scoped>
#playList {
  .topBar {
    width: 100%;
    height: 40px;
    position: absolute;
    z-index: 99999;
    .returnButton {
      height: 20px;
      width: 20px;
      margin: 15px 0 0 5px;
    }
  }
  .playListInfo {
    height: 240px;
    padding: 10px;
    position: relative;
    background-position: center;
    background-size: cover;
    .listName {
      font-size: 16px;
      font-weight: bold;
      line-height: 20px;
      color: #ffffff;
      position: absolute;
      left: 10px;
      bottom: 20px;
    }
  }
  .playList {
    background: $globalContentBackColor;
    border-radius: 12px;
  }
  #SongList {
    position: relative;
    top: -10px;
  }
}
</style>
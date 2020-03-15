<template>
  <div class="SongList">
    <section class="songList" v-if="!noData">
      <div class="playListAllSong" @click="playListAllMusic()">
        <img src="../assets/pause-green.png" class="pauseIcon" v-if="songList" />
        <p v-if="songList">全部播放（{{ songList.length }}）</p>
      </div>
      <div class="songListItem" v-for="(item, index) of songList" :key="item.id" @click="insertSongToList(item)">
        <div class="songIndex">{{ index + 1 }}</div>
        <div class="songInfo">
          <div class="songName">{{ item.name }}</div>
          <div class="songArtist">
            {{ item.ar ? item.ar[0].name : item.artists[0].name }} &sdot; {{ item.al ? item.al.name : item.album.name }}
          </div>
        </div>
      </div>
    </section>

    <section class="noSerchTip" v-if="noData">无结果</section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getSongsDetail } from '../request/api'

export default {
  name: 'SongList',
  data() {
    return {}
  },
  props: {
    //歌曲列表
    songList: {
      type: Array
    },
    //是否是无数据
    noData: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    insertSongToList(song) {
      getSongsDetail({ ids: song.id }).then((e) => {
        window.console.log(e.songs[0])
        this.insertSong(e.songs[0])
      })
    },
    playListAllMusic() {
      window.console.log(this.songList)
      this.playListAll(this.songList)
    },
    ...mapActions(['insertSong', 'playListAll'])
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.SongList {
  padding: 10px;
  border-radius: 12px;
  background: $globalContentBackColor;
  .playListAllSong {
    height: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    font-size: 14px;
    .pauseIcon {
      height: 20px;
      width: 20px;
      margin-top: 5px;
      float: left;
      padding-right: 5px;
    }
  }
  .songListItem {
    height: 50px;
    .songIndex {
      height: 50px;
      line-height: 50px;
      width: 25px;
      font-size: 14px;
      color: #333;
      float: left;
    }
    .songInfo {
      height: 50px;
      letter-spacing: 1px;
      .songName {
        height: 20px;
        padding-top: 8px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .songArtist {
        height: 12px;
        font-size: 10px;
        font-weight: lighter;
        padding-top: 1px;
        color: #c6c6c6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .noSerchTip {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 1px;
    color: #666;
  }
}
</style>

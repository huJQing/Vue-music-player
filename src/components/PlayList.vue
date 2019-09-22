<template>
  <div class="playList">
    <div class="playList-cover" @touchmove.prevent @click="hiddenPlayList"></div>
    <div class="playListContainer">
      <section class="songList" v-if="!noMusic">
        <div class="playListAllSong" @click="playListAllMusic()">
          <img src="../assets/pause-green.png" class="pauseIcon" v-if="playlist" />
          <p v-if="playlist">全部播放（{{playlist.length}}）</p>
        </div>
        <div
          class="songListItem"
          v-for="(item,index) of playlist"
          :key="item.id"
          @click="insertSongToList(item)"
          :class="{activeMusic: index == currentIndex }"
        >
          <div class="songIndex">{{index+1}}</div>
          <div class="songInfo">
            <div class="songName">{{item.name}}</div>
            <div
              class="songArtist"
            >{{item.ar ? item.ar[0].name : item.artists[0].name}} &sdot; {{item.al ? item.al.name : item.album.name}}</div>
          </div>
          <div class="deleteSong" @click.stop="deleteSong(item)" v-if="playlist.length > 1">
            <img src="../assets/delete.png" class="deleteSongIcon" />
          </div>
        </div>
      </section>

      <section class="noMusicTip" v-if="noMusic">您还没有添加任何音乐</section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getSongsDetail } from '../request/api'

export default {
  name: 'playList',
  data() {
    return {
      noMusic: false
    }
  },
  watch: {
    playlist(e) {
      if (e.length == 0) {
        this.noMusic = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'playlist',
      'currentSong',
      'currentIndex',
      'currentPlayFlag'
    ])
  },
  methods: {
    hiddenPlayList() {
      this.$emit("hiddenPlayList", false)
    },
    insertSongToList(song) {
      getSongsDetail({ ids: song.id }).then((e) => {
        window.console.log(e.songs[0])
        this.insertSong(e.songs[0])
        this.setCurrentPlayFlagState(true)
      })
    },
    playListAllMusic() {
      window.console.log(this.playlist)
      this.playListAll(this.playlist)
    },
    deleteSong(song) {
      this.deleteSong(song)
    },
    ...mapMutations({
      setPlayListState: 'SET_PLAYLIST_STATE',
      setCurrentSongState: 'SET_CURRENTSONG_STATE',
      setCurrentIndexState: 'SET_CURRENTINDEX_STATE',
      setCurrentPlayFlagState: 'SET_CURRENTPLAYFLAG_STATE',
    }),
    ...mapActions([
      'insertSong',
      'deleteSong',
      'playListAll'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.playList {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  .playList-cover {
    width: 100%;
    height: 100vh;
    position: absolute;
  }
  .playListContainer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    max-height: 500px;
    background: #ffffff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: scroll;
    float: left;
    flex-direction: column;
    .playListItem {
      width: 100%;
      height: 50px;
    }
    .songList {
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
          width: 280px;
          height: 50px;
          letter-spacing: 0.5px;
          float: left;
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
            padding-top: 0.5px;
            color: #c6c6c6;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .deleteSong {
          width: 30px;
          height: 30px;
          float: right;
          padding-top: 17px;
          margin-left: 10px;
          .deleteSongIcon {
            width: 16px;
            height: 16px;
          }
        }
      }
      .activeMusic {
        color: #64d09c;
        font-weight: bold;
        .songIndex {
          color: #64d09c;
        }
        .songInfo {
          .songArtist {
            color: #64d09c;
          }
        }
      }
    }

    .noMusicTip {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      letter-spacing: 1px;
      color: #666;
    }
  }
}
</style>
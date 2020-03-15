<template>
  <section id="MusicPlayer">
    <section
      class="miniMusicPlayer"
      @touchmove.prevent
      @scroll.prevent
    >
      <div
        class="musicPicContainer"
        @click="showPlus = true"
      >
        <img
          :src="currentSong.al.picUrl | httpToHttps"
          class="musicPic"
          v-if="currentSong.al"
        />
      </div>
      <div
        class="musciName"
        @click="showPlus = true"
      >{{ currentSong.name }}</div>
      <div class="musicControl">
        <img
          class="musicflag-icon"
          :src="currentPlayFlag ? require('../assets/pause-music-green.png') : require('../assets/start-music-green.png')"
          @click.prevent="playMusic"
        />
        <img
          class="musiclist-icon"
          src="../assets/music-list-green.png"
          @click="showPlayList = true"
        />
      </div>
    </section>

    <transition name="plusMusicPlayerFade">
      <section
        id="plusMusicPlayer"
        v-show="showPlus"
        @touchmove.prevent
        @scroll.prevent
      >
        <div
          class="bg bg-blur"
          v-if="currentSong.al"
          :style="{
            backgroundImage: 'url(' + httpToHttps(currentSong.al.picUrl) + '), linear-gradient(rgb(25, 0, 0), rgb(0, 0, 55))'
          }"
        ></div>

        <div class="topBar">
          <img
            class="hiddenButton"
            src="../assets/return_down.png"
            @click="hiddenPlusMusicPlayer"
          />
          <div class="musciName">{{ currentSong.name }}</div>
          <div
            class="artists"
            v-if="currentSong.ar"
          >{{ currentSong.ar[0].name }}</div>
        </div>

        <div class="albumPicContainer">
          <img
            :src="(currentSong.al.picUrl + '?param=300y300') | httpToHttps"
            class="albumPic"
            v-if="currentSong.al"
          />
        </div>

        <div class="progress">
          <div class="startTime">{{ currentDuration | timeFormat }}</div>
          <progress-bar
            @percentChange="percentChange"
            @percentChangeEnd="percentChangeEnd"
            class="progress-bar"
            :percentage="currentPercentage"
          ></progress-bar>
          <div
            class="endTime"
            v-if="currentSong"
          >{{ currentSong.dt | timeFormat }}</div>
        </div>

        <div class="musicContorl">
          <div class="contorlIcon">
            <img
              class="small-icon"
              :src="currentPlayMode.img"
              @click="changePlayMode"
            />
          </div>
          <div class="contorlIcon">
            <img
              class="middel-icon"
              src="../assets/pre-music.png"
              @click="playPreMusic"
            />
          </div>
          <div class="contorlIcon">
            <img
              class="large-icon"
              :src="currentPlayFlag ? require('../assets/pause-music.png') : require('../assets/start-music.png')"
              @click="playMusic"
            />
          </div>
          <div class="contorlIcon">
            <img
              class="middel-icon"
              src="../assets/next-music.png"
              @click="playNextMusic"
            />
          </div>
          <div class="contorlIcon">
            <img
              class="small-icon"
              src="../assets/music-list.png"
              @click="showPlayList = true"
            />
          </div>
        </div>

        <audio
          ref="audio"
          autoplay
          @timeupdate="updateTime"
          @ended="musicEnd"
        ></audio>
      </section>
    </transition>

    <!--播放列表-->
    <play-list
      class="playList"
      v-if="showPlayList"
      @hiddenPlayList="hiddenPlayListControl"
    ></play-list>
  </section>
</template>

<script>
import ProgressBar from '../components/ProgressBar'
import PlayList from '../components/PlayList'
import { getSongUrl, getSongsDetail, getTopSong } from '../request/api'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MusicPlayer',
  components: { ProgressBar, PlayList },
  data () {
    return {
      playNum: 0, //播放过的歌曲数量
      nowPlayMusicUrl: '', //当前播放音乐的URL
      showPlus: false, //是否显示plus音乐控件
      currentDuration: 0, //歌曲当前播放时间
      currentPercentage: 0, //歌曲当前播放百分比
      progressMoveFlag: false, //进度条是否在拖动
      showPlayList: false, //进度条是否在拖动
      playMode: [
        { mode: 'sequence', type: 0, img: require('../assets/sequence.png') },
        { mode: 'repeatone', type: 1, img: require('../assets/repeatone.png') },
        { mode: 'random', type: 2, img: require('../assets/random.png') }
      ], //播放模式
      currentPlayMode: { mode: 'sequence', type: 0, img: require('../assets/sequence.png') } //当前播放模式
    }
  },
  computed: {
    ...mapGetters(['playlist', 'currentSong', 'currentIndex', 'currentPlayFlag'])
  },
  watch: {
    currentSong () {
      this.nowPlayMusicUrl = ''
      this.playMusic()
    }
  },
  methods: {
    httpToHttps (url) {
      if (!url) return ''
      if (url.substring(0, 5) == 'https') return url
      return 'https' + url.slice(4)
    },
    //隐藏歌曲列表
    hiddenPlayListControl (e) {
      window.console.log(e)
      this.showPlayList = false
    },
    //进度条拖动,歌曲百分比改变
    percentChange (e) {
      this.progressMoveFlag = true
      window.console.log(this.currentSong.dt)
      this.currentDuration = this.currentSong.dt * e
    },
    //进度条拖动结束
    percentChangeEnd (e) {
      this.progressMoveFlag = false
      if (!this.currentPlayFlag) {
        this.playMusic()
        let musicLength = (this.currentSong.dt / 1000) * e
        this.$refs.audio.currentTime = Math.ceil(musicLength)
      } else {
        let musicLength = (this.currentSong.dt / 1000) * e
        this.$refs.audio.currentTime = Math.ceil(musicLength)
      }
    },
    //更改播放模式
    changePlayMode () {
      if (this.currentPlayMode.type == 0) {
        this.currentPlayMode = this.playMode[1]
      } else if (this.currentPlayMode.type == 1) {
        this.currentPlayMode = this.playMode[2]
      } else if (this.currentPlayMode.type == 2) {
        this.currentPlayMode = this.playMode[0]
      }
    },
    //播放音乐
    playMusic () {
      if (this.nowPlayMusicUrl != '') {
        if (!this.currentPlayFlag) {
          this.setCurrentPlayFlagState(true)
          if (this.$refs.audio.src == '') {
            this.$refs.audio.src = this.nowPlayMusicUrl
          }
          this.$refs.audio.play()
        } else {
          this.setCurrentPlayFlagState(false)
          this.$refs.audio.pause()
        }
      } else {
        getSongUrl({ id: this.currentSong.id, br: 999000 }).then((e) => {
          if (this.playNum == 0) {
            this.setCurrentPlayFlagState(false)
            this.nowPlayMusicUrl = e.data[0].url
          } else {
            this.setCurrentPlayFlagState(true)
            this.nowPlayMusicUrl = e.data[0].url
            this.$refs.audio.src = e.data[0].url
          }
          this.playNum++
        })
      }
    },
    //音乐播放结束
    musicEnd () {
      this.playNextMusic()
    },
    //播放下一首音乐
    playNextMusic () {
      //重置播放数据
      this.nowPlayMusicUrl = ''
      this.setCurrentPlayFlagState(false)
      this.currentDuration = 0
      this.currentTime = 0

      let nextIndex = this.currentIndex
      const playMode = this.currentPlayMode.mode
      if (this.currentIndex == this.playlist.length - 1) {
        //根据播放模式计算下首歌的index
        if (playMode == 'sequence') {
          nextIndex = 0
        } else if (playMode == 'random') {
          nextIndex = Math.round(Math.random(0, this.playMusic.length) * 100)
          window.console.log(nextIndex)
        }
      } else {
        if (playMode == 'sequence') {
          nextIndex++
        } else if (playMode == 'random') {
          nextIndex = Math.round(Math.random(0, this.playMusic.length) * 100)
          window.console.log(nextIndex)
        }
      }

      console.log(this.currentSong)
      this.setCurrentSongState(this.playlist[nextIndex])
      this.setCurrentIndexState(nextIndex)
      this.playMusic()
    },
    //播放上一首音乐
    playPreMusic () {
      //重置播放数据
      this.nowPlayMusicUrl = ''
      this.setCurrentPlayFlagState(false)
      this.currentDuration = 0
      this.currentTime = 0

      let nextIndex = this.currentIndex
      const playMode = this.currentPlayMode.mode
      if (this.currentIndex <= 0) {
        //根据播放模式计算下首歌的index
        if (playMode == 'sequence') {
          nextIndex = this.playlist.length - 1
        } else if (playMode == 'random') {
          nextIndex = Math.round(Math.random(0, this.playMusic.length) * 100)
          window.console.log(nextIndex)
        }
      } else {
        if (playMode == 'sequence') {
          nextIndex--
        } else if (playMode == 'random') {
          nextIndex = Math.round(Math.random(0, this.playMusic.length) * 100)
          window.console.log(nextIndex)
        }
      }

      this.setCurrentSongState(this.playlist[nextIndex])
      this.setCurrentIndexState(nextIndex)
      this.playMusic()
    },
    //更新音乐播放时间
    updateTime (e) {
      // window.console.log(Math.ceil(e.target.currentTime * 1000))
      if (this.progressMoveFlag) {
        return 0
      }
      this.currentDuration = Math.ceil(e.target.currentTime * 1000)
      this.currentPercentage = (e.target.currentTime / this.currentSong.dt) * 1000
    },
    //获取每日新歌推荐
    getPersonalizedNewsong () {
      if (this.playlist.length == 0) {
        getTopSong({ type: 0 }).then((e) => {
          window.console.log(e)
          let ids = e.data
            .map(function (item) {
              return item.id
            })
            .join(',')
          getSongsDetail({ ids: ids }).then((e) => {
            window.console.log(e.songs[0])
            this.setPlayListState(e.songs)
            this.setCurrentSongState(e.songs[0])
            this.setCurrentPlayFlagState(false)
            window.console.log(this.playlist)
          })
        })
      }
    },
    //隐藏音乐播放控件
    hiddenPlusMusicPlayer () {
      this.showPlus = false
    },
    ...mapMutations({
      setPlayListState: 'SET_PLAYLIST_STATE',
      setCurrentSongState: 'SET_CURRENTSONG_STATE',
      setCurrentIndexState: 'SET_CURRENTINDEX_STATE',
      setCurrentPlayFlagState: 'SET_CURRENTPLAYFLAG_STATE'
    })
  },
  mounted () {
    this.getPersonalizedNewsong()
  }
}
</script>

<style lang="scss" scoped>
#MusicPlayer {
  height: 60px;
  width: 100%;
  box-shadow: 0 3px 14px 2px #d5d5d5;
  .miniMusicPlayer {
    height: 60px;
    width: 100%;
    opacity: 0.98;
    background: $globalContentBackColor;
    position: relative;
    .musicPicContainer {
      margin: 10px 0 10px 20px;
      height: 40px;
      width: 40px;
      float: left;
      .musicPic {
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
    }
    .musciName {
      width: 200px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      padding: 15px 0;
      margin-left: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      float: left;
    }
    .musicControl {
      width: 70px;
      height: 30px;
      position: absolute;
      right: 20px;
      top: 15px;
      .musicflag-icon {
        width: 30px;
        height: 30px;
        float: left;
      }
      .musiclist-icon {
        width: 24px;
        height: 28px;
        float: left;
        margin-left: 16px;
      }
    }
  }

  #plusMusicPlayer {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999999;
    background: $globalContentBackColor;
    overflow: hidden;
    .bg {
      width: 100%;
      height: 100vh;
      background-blend-mode: lighten;
    }
    .bg-blur {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      filter: blur(50px);
    }

    .topBar {
      width: 100%;
      height: 80px;
      position: absolute;
      top: 0;
      left: 0;
      .hiddenButton {
        height: 22px;
        width: 22px;
        margin: 20px 0 0 15px;
        float: left;
      }
      .musciName {
        width: 70%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        letter-spacing: 1px;
        margin: 15px 0 0 60px;
        font-size: 16px;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artists {
        width: 50%;
        height: 15px;
        margin: 0 0 0 50%;
        transform: translate(-50%, 0);
        text-align: center;
        line-height: 15px;
        font-weight: lighter;
        font-size: 12px;
        letter-spacing: 1px;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .albumPicContainer {
      height: 300px;
      width: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      -webkit-animation: rotateAnimation 40s linear infinite;
      animation-delay: 0.5s;
      .albumPic {
        height: 284px;
        width: 284px;
        border-radius: 50%;
        border: 8px solid rgba(0, 0, 0, 0.2);
      }
      @-webkit-keyframes rotateAnimation {
        0% {
          transform: translate(-50%, -60%) rotate(0deg);
        }
        50% {
          transform: translate(-50%, -60%) rotate(180deg);
        }
        100% {
          transform: translate(-50%, -60%) rotate(360deg);
        }
      }
    }
    .progress {
      height: 30px;
      width: 300px;
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translate(-50%, 50%);
      .startTime {
        width: 30px;
        height: 30px;
        line-height: 30px;
        float: left;
        padding-right: 5px;
        color: #ffffff;
      }
      .endTime {
        width: 30px;
        height: 30px;
        line-height: 30px;
        float: left;
        padding-left: 5px;
        color: #ffffff;
      }
      .progress-bar {
        width: 220px;
        float: left;
      }
    }
    .musicContorl {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 10%;
      left: 0;
      display: flex;
      .contorlIcon {
        width: 20%;
        height: 60px;
        position: relative;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .small-icon {
          width: 20px;
          height: 20px;
        }
        .middel-icon {
          width: 40px;
          height: 40px;
        }
        .large-icon {
          width: 60px;
          height: 60px;
        }
      }
    }
  }

  .plusMusicPlayerFade-enter-to,
  .plusMusicPlayerFade-leave-active {
    transition: transform 0.8s;
  }
  .plusMusicPlayerFade-enter,.plusMusicPlayerFade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(100%);
  }

  .playList {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999999;
  }
}
</style>

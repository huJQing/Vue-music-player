<template>
  <div id="serch">
    <div class="serchInput">
      <img class="serchIcon" src="../assets/serch.png" />
      <input v-model="serchKey" type="serch" @keypress="searchMusic" @focus="clearPlayList()" />
    </div>

    <section id="hotSerchList" v-if="serchKey =='' && !playList.length">
      <div
        class="hotSerchListItem"
        v-for="(item,index) of hotSerchList"
        :key="item.searchWord"
        @click="getSearch(item.searchWord)"
      >
        <div class="index" :style="'color:'+ (index<3 ? '#31c27c':'')">{{index+1}}</div>
        <div class="searchInfo">
          <div class="searchWord">{{item.searchWord}}</div>
          <div class="score">{{item.score}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </section>

    <section id="suggestSerchList" v-if="!playList.length">
      <div
        class="suggestSerchListItem"
        v-for="item of suggestSerchList"
        :key="item.keyword"
        @click="getSearch(item.keyword)"
      >
        <img class="serchIcon" src="../assets/serch.png" />
        <div class="keyword">{{item.keyword}}</div>
      </div>
    </section>

    <song-list
      :songList="playList"
      id="SongList"
      v-if="playList.length || this.noData"
      :noData="noData"
    ></song-list>
  </div>
</template>

<script>
import { getSearchHotDetail, getSearchSuggest, getSearch } from '../request/api'
import SongList from '../components/SongList'

export default {
  name: 'serch',
  components: {
    SongList,
  },
  data() {
    return {
      serchKey: '',//搜索关键词
      hotSerchList: [],//热门搜索
      suggestSerchList: [],//建议搜索
      debouncedGetSearchSuggest: {}, //获取建议搜索的事件节流延迟器
      playList: [],//歌曲列表
      noData: false
    }
  },
  watch: {
    serchKey: function () {
      //监听serchKey是否改变，获取搜索建议（事件节流）
      clearTimeout(this.debouncedGetSearchSuggest)
      if (this.serchKey != '') {
        this.debouncedGetSearchSuggest = setTimeout(() => {
          this.noData = false;
          this.getSearchSuggest()
        }, 200)
      } else {
        this.suggestSerchList = []
        this.playList = []
      }
    }
  },
  methods: {
    //按回车搜索歌曲
    searchMusic(e) {
      if (e.keyCode == 13) {
        window.console.log(this.serchKey)
        this.getSearch()
      }
    },
    //获取建议搜索
    getSearchSuggest() {
      if (!this.serchKey) return
      getSearchSuggest({ keywords: this.serchKey, type: 'mobile' }).then((e) => {
        this.suggestSerchList = e.result.allMatch
      })
    },
    //获取热门搜索
    getSearchHotDetail() {
      getSearchHotDetail().then((e) => {
        this.hotSerchList = e.data
      })
    },
    //搜索歌曲
    getSearch(serchKey = this.serchKey) {
      this.serchKey = serchKey
      getSearch({ keywords: this.serchKey, type: 1 }).then((e) => {
        window.console.log(e)
        if (e.result.songCount != 0 || e.result.songs ? e.result.songs.length : false) {
          this.noData = false
          this.playList = e.result.songs;
        } else {
          this.noData = true
        }
      })
    },
    clearPlayList() {
      this.noData = false
      this.playList = [];
    }
  },
  mounted() {
    this.getSearchHotDetail()
  }
}
</script>

<style lang="scss" scoped>
#serch {
  padding-bottom: 50px;
  .serchInput {
    height: 30px;
    padding: 10px;
    position: relative;
    .serchIcon {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 18px;
      left: 24px;
    }
    input {
      width: 85%;
      height: 30px;
      font-size: 14px;
      border: none;
      border-radius: 20px;
      outline: none;
      background: #f2f2f2;
      padding: 0 5% 0 10%;
      letter-spacing: 1px;
    }
  }

  #hotSerchList {
    padding: 10px;
    background: $globalContentBackColor;
    .hotSerchListItem {
      height: 60px;
      font-size: 14px;
      .index {
        width: 25px;
        height: 40px;
        line-height: 40px;
        float: left;
        color: #aaa;
      }
      .searchInfo {
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        .searchWord {
          font-size: 16px;
          height: 20px;
        }
        .score {
          margin-left: 5px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #c6c6c6;
          font-weight: lighter;
        }
        .content {
          font-size: 12px;
          color: #c6c6c6;
          flex-basis: 100%;
          font-weight: lighter;
        }
      }
    }
  }

  #suggestSerchList {
    padding: 0 10px 10px;
    .suggestSerchListItem {
      height: 40px;
      line-height: 40px;
      .serchIcon {
        width: 14px;
        height: 14px;
        margin-top: 13px;
        float: left;
      }
      .keyword {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        margin-left: 24px;
        letter-spacing: 1px;
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
</style>
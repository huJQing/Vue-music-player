<template>
  <div id="rank">
    <section id="officialRankList">
      <div class="officialRankListTitle" v-if="officialTopList.length">官方榜单</div>
      <div
        class="officialRankListItem"
        v-for="item of officialTopList"
        :key="item.id"
        @click="gotoRankList(item.id)"
      >
        <div class="listCover">
          <img :src="item.coverImgUrl" class="coverImg" />
          <div class="playCount">
            <img src="../assets/headset.png" class="headsetIcon" />
            <div class="playCountNum">{{item.playCount | numFormat}}</div>
          </div>
          <img src="../assets/pause.png" class="stopPlayIcon" />
        </div>
        <div class="tracksList">
          <div
            class="tracks"
            v-for="(tracksItem,index) of item.tracks"
            :key="tracksItem.first"
          >{{index+1+'.'+tracksItem.first+' - '+tracksItem.second}}</div>
        </div>
      </div>
    </section>

    <section id="othersRankList">
      <div class="othersRankListTitle" v-if="othersTopList.length">其他榜单</div>
      <div
        class="othersRankListItem"
        v-for="item of othersTopList"
        :key="item.id"
        @click="gotoRankList(item.id)"
      >
        <div class="listCover">
          <img :src="item.coverImgUrl" class="coverImg" />
          <div class="playCount">
            <img src="../assets/headset.png" class="headsetIcon" />
            <div class="playCountNum">{{item.playCount | numFormat}}</div>
          </div>
          <img src="../assets/pause.png" class="stopPlayIcon" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getToplistDetail } from '../request/api'
import router from '../router/router'

export default {
  name: 'rank',
  data() {
    return {
      officialTopList: [],
      othersTopList: []
    }
  },
  methods: {
    getToplistDetail() {
      getToplistDetail().then(e => {
        this.officialTopList = e.list.filter(item => item.tracks.length)
        this.othersTopList = e.list.filter(item => !item.tracks.length)
        window.console.log(this.othersTopList)
      })
    },
    gotoRankList(e) {
      router.push('/musicList/songlist/' + e)
    }
  },
  mounted() {
    this.getToplistDetail()
  }
}
</script>

<style lang="scss" scoped>
#rank {
  padding-bottom: 50px;
  #officialRankList {
    padding: 15px 10px 5px 10px;
    background: $globalContentBackColor;
    color: $textColor;
    .officialRankListTitle {
      font-size: 16px;
      font-weight: bold;
      flex-basis: 100%;
      padding-bottom: 14px;
      margin-left: 3px;
    }
    .officialRankListItem {
      width: 100%;
      height: 100px;
      margin-bottom: 15px;
      @include listCover(false);
    }
    .tracksList {
      font-size: 12px;
      height: 56;
      padding-top: 16px;
      margin-left: 120px;
      letter-spacing: 1px;
      color: #555;
      .tracks {
        margin-top: 5px;
      }
    }
  }

  #othersRankList {
    padding: 0 10px 10px 10px;
    background: $globalContentBackColor;
    color: $textColor;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .othersRankListTitle {
      font-size: 16px;
      font-weight: bold;
      flex-basis: 100%;
      padding-bottom: 15px;
      margin-left: 3px;
    }
    .othersRankListItem {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
      @include listCover(false);
    }
  }
}
</style>
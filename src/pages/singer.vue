<template>
  <div id="singer">
    <section id="singerTagSelect">
      <slide :list="regionList" itemKey="region" ref="regionSlide" @selectItem="getRegionSelected"></slide>
      <slide :list="genderList" itemKey="gender" @selectItem="getGenderSelected"></slide>
      <slide :list="initialList" itemKey="initial" @selectItem="getInitialSelected"></slide>
    </section>

    <section id="singerList">
      <div
        class="singerListItem"
        v-for="item of singerList"
        :key="item.id"
        @click="gotoSingerList(item.id)"
      >
        <img class="singerImg" :src="item.img1v1Url + '?param=300y300'" />
        <div class="singerName">{{item.alias.length ? item.name+'('+item.alias[0]+')' :item.name}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import Slide from '../components/Slide'
import { getArtistList } from '../request/api'
import router from '../router/router'


export default {
  name: 'singer',
  data() {
    return {
      regionList: [
        { region: '华语', code: '10' },
        { region: '欧美', code: '20' },
        { region: '日本', code: '60' },
        { region: '韩国', code: '70' },
        { region: '其他', code: '40' }
      ],
      genderList: [
        { gender: '男', code: '01' },
        { gender: '女', code: '02' },
        { gender: '组合', code: '03' }
      ],
      initialList: [
        { initial: 'A', code: 'A' },
        { initial: 'B', code: 'B' },
        { initial: 'C', code: 'C' },
        { initial: 'D', code: 'D' },
        { initial: 'E', code: 'E' },
        { initial: 'F', code: 'F' },
        { initial: 'G', code: 'G' },
        { initial: 'H', code: 'H' },
        { initial: 'I', code: 'I' },
        { initial: 'J', code: 'J' },
        { initial: 'K', code: 'K' },
        { initial: 'L', code: 'L' },
        { initial: 'M', code: 'M' },
        { initial: 'N', code: 'N' },
        { initial: 'O', code: 'O' },
        { initial: 'P', code: 'P' },
        { initial: 'Q', code: 'Q' },
        { initial: 'R', code: 'R' },
        { initial: 'S', code: 'S' },
        { initial: 'T', code: 'T' },
        { initial: 'U', code: 'U' },
        { initial: 'V', code: 'V' },
        { initial: 'W', code: 'W' },
        { initial: 'X', code: 'X' },
        { initial: 'Y', code: 'Y' },
        { initial: 'Z', code: 'Z' }
      ],
      regionSelected: { region: '华语', code: '10' },
      genderSelected: { gender: '男', code: '01' },
      initialSelected: { initial: 'A', code: 'A' },
      categoryCode: '1001',
      initial: 'A',
      singerList: []
    }
  },
  components: { Slide },
  methods: {
    getRegionSelected(e) {
      this.regionSelected = e
      this.getArtistList()
    },
    getGenderSelected(e) {
      this.genderSelected = e
      this.getArtistList()
    },
    getInitialSelected(e) {
      this.initialSelected = e
      this.getArtistList()
    },
    getArtistList() {
      let categoryCode = this.regionSelected.code + this.genderSelected.code
      let initial = this.initialSelected.code
      if (categoryCode == this.categoryCode && initial == this.initial && this.singerList.length)
        return
      this.categoryCode = categoryCode
      this.initial = initial
      window.console.log(this.categoryCode, this.initial)

      getArtistList({
        limit: 50,
        cat: this.categoryCode,
        initial: this.initial
      }).then(e => {
        this.singerList = e.artists
        window.console.log(e)
      })
    },
    gotoSingerList(e) {
      router.push('/musicList/singerList/' + e)
    }
  },
  mounted() {
    this.getArtistList()
  }
}
</script>

<style lang="scss" scoped>
#singer {
  padding-bottom: 50px;
  #singerTagSelect {
    padding: 10px 0 10px 10px;
  }

  #singerList {
    padding: 10px 15px;
    .singerListItem {
      width: 100%;
      height: 50px;
      margin-bottom: 15px;
    }
    .singerImg {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      box-shadow: 1px 2px 2px #ccc;
      float: left;
    }
    .singerName {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      padding-top: 10px;
      margin-left: 60px;
      color: $textColor;
    }
  }
}
</style>
<template>
  <div id="carousel">
    <div
      class="carousel-box"
      :style="'width:'+ carouselWidth +'px; transform: translate('+translateX+'px)'"
    >
      <img
        v-for="item of images"
        :key="item.src"
        :src="item.src"
        :style="'width:' + imgWidth + 'px'"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      />
    </div>
  </div>
</template>

<script>
import { timeout } from 'q'
export default {
  name: 'Carousel',
  data() {
    return {
      carouselWidth: 375,
      imgWidth: 375,
      nowImgIndex: 0,
      translateX: 0,
      touchstartX: 0,
      touchendX: 0,
      touchFlag: false,
      moveTimeOut: new timeout()
    }
  },
  props: { images: Array },
  mounted() {
    this.imgWidth = window.innerWidth
    this.carouselWidth = window.innerWidth * this.images.length
    // setInterval(() => {
    //   if (this.translateX != '0' - this.carouselWidth + window.innerWidth) {
    //     this.translateX -= window.innerWidth
    //   } else {
    //     this.translateX = 0
    //   }
    // }, 3000)
  },
  methods: {
    touchStart: function(e) {
      this.touchstartX = e.changedTouches[0].clientX
    },
    touchMove: function(e) {
      let moveX = e.changedTouches[0].clientX
      let distanceX = moveX - this.touchstartX
      this.translateX = distanceX
      window.console.log('end', distanceX)
    },
    touchEnd: function(e) {
      let distanceX = e.changedTouches[0].clientX - this.touchstartX
      let min = this.imgWidth / 10
      if (distanceX > 0) {
        if (distanceX > min && this.nowImgIndex > 0) {
          window.console.log('111')
          this.nowImgIndex--
          this.translateX = -this.nowImgIndex * this.imgWidth
        } else {
          this.translateX = -this.nowImgIndex * this.imgWidth
        }
      } else {
        //右
        if (-distanceX > min && this.nowImgIndex < this.images.length - 1) {
          window.console.log('222')
          this.nowImgIndex++
          this.translateX = -this.nowImgIndex * this.imgWidth
        } else {
          this.translateX = -this.nowImgIndex * this.imgWidth
        }
      }
      window.console.log('end', this.nowImgIndex, this.images.length)
    }
  }
}
</script>

<style lang="scss" scope>
#carousel {
  width: 100%;
  overflow: hidden;
  .carousel-box {
    transform: translate(0, 375px);
    transition: transform 1s;
  }
  .carousel-item {
    float: left;
  }
}
</style>
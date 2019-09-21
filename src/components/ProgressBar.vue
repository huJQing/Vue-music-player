<template>
  <div class="Progress-Bar" ref="progressBar" @click="progressClick">
    <div class="progress-inner-bar">
      <div class="now-progress-bar" ref="nowProgressBar"></div>
      <div
        class="progress-btn"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['percentage'],
  data() {
    return {
      touch: {}
    }
  },
  watch: {
    percentage(e) {
      if (e == 0) {
        this.$refs.progressBtn.style.left = '0';
        this.$refs.nowProgressBar.style.width = '0';
      }
      const width = this.$refs.progressBar.getBoundingClientRect().width - 14
      const offsetWidth = width * e
      this.$refs.progressBtn.style.left = Math.max(0, Math.ceil(offsetWidth)) + 'px';
      this.$refs.nowProgressBar.style.width = Math.max(0, Math.ceil(offsetWidth)) + 'px';
    }
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      // rect.left 元素距离左边的距离
      // e.pageX 点击距离左边的距离
      const offsetWidth = Math.max(0, Math.ceil(e.pageX - rect.left - 7))
      this.offset(offsetWidth)

      const width = this.$refs.progressBar.getBoundingClientRect().width - 14
      const percentage = offsetWidth / width
      this.$emit('percentChangeEnd', percentage)
    },
    progressTouchStart(e) {
      this.touch.flag = true;
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.nowProgressBar.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.flag) return
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(Math.min(this.$refs.progressBar.clientWidth - 7, Math.max(0, this.touch.left + deltaX)))
      this.offset(offsetWidth)
    },
    progressTouchEnd() {
      this.touch.flag = false;
      const width = this.$refs.progressBar.clientWidth - 7
      const percentage = this.$refs.nowProgressBar.clientWidth / width
      this.$emit('percentChangeEnd', percentage)
    },
    offset(offsetWidth) {
      // window.console.log(offsetWidth)
      this.$refs.progressBtn.style.left = offsetWidth - 7 + 'px';
      this.$refs.nowProgressBar.style.width = offsetWidth + 'px';
      const width = this.$refs.progressBar.getBoundingClientRect().width - 7
      const percentage = offsetWidth / width
      this.$emit('percentChange', percentage)
    }
  }
}
</script>

<style lang="scss" scoped>
.Progress-Bar {
  height: 30px;
  .progress-inner-bar {
    height: 5px;
    position: relative;
    top: 13px;
    background: rgba(56, 56, 56, 0.2);
    border-radius: 3px;
  }
  .now-progress-bar {
    width: 0;
    height: 5px;
    background: #64d09c;
  }
  .progress-btn {
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: -5px;
  }
}
</style>
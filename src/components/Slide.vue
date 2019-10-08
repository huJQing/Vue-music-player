<template>
  <div id="Slide">
    <div class="slideBox">
      <ul>
        <li
          v-for="item of list"
          :key="item[itemKey]"
          @click="changeActive(item)"
          :class="{active: activeItem == item[itemKey]}"
        >{{itemKey ? item[itemKey] : item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  data() {
    return {
      activeItem: ''
    }
  },
  //传入的list必须是一个数组对象，每个对象需有一个code值
  //itemKey指明对象中哪个键在界面中显示
  props: ['list', 'itemKey'],
  methods: {
    changeActive(e) {
      this.activeItem = e[this.itemKey]
      //将点击的item传递给父组件
      this.$emit('selectItem', e)
    }
  },
  mounted() {
    this.activeItem = this.list[0][this.itemKey]
  }
}
</script>

<style lang="scss" scoped>
#Slide {
  .slideBox {
    width: 100%;
    overflow: scroll;
    height: 34px;
    font-weight: 200;
    ul {
      /* flex布局使子元素横向排列 */
      display: flex;
      /* 浮动使其脱离文档流 子元素的宽度就不会受flex的影响*/
      float: left;
      height: 100%;
      li {
        width: 46px;
        height: 24px;
        list-style: none;
        background-color: #f3f3f3;
        color: #000;
        text-align: center;
        line-height: 24px;
        margin: 5px 5px;
        border-radius: 15px;
      }
      .active {
        @include activeButton-min;
      }
    }
  }

  /* 隐藏滚动条 */
  .slideBox::-webkit-scrollbar {
    display: none;
  }
}
</style>
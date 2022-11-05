<template>
  <div class="spec-preview">
    <!-- 遮罩板底下的大图 -->
    <img :src="images.imgUrl" />
    <!--  -->
    <div class="event" @mousemove="changeMove"></div>
    <!-- 右侧的大图 -->
    <div class="big">
      <img :src="images.imgUrl" ref="big" />
    </div>
    <!--移动的遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imageList"],
  data(){
      return {
        currentIndex:0
      }
  },
  computed: {
    images() {
      //detail父组件，给子组件zoom，传递的数据imageList可能是空数组，空数组的第零项可能是undefined
      //undefined.imgUrl报错了，保证父组件给的数据（数组）第零项至少是一个对象
      //如果是
      return this.imageList[this.currentIndex] || {};
    },
  },
  methods: {
    //鼠标移动事件
    changeMove(event) {
      //获取遮罩层
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //计算出移动的时候遮罩层l、t
      let l = event.offsetX - mask.offsetWidth / 2;
      let t = event.offsetY - mask.offsetHeight / 2;
      //约束left|top数值
      if (l <= 0) l = 0;
      if (l >= mask.offsetWidth) l = mask.offsetWidth;
      if (t <= 0) t = 0;
      if (t >= mask.offsetHeight) t = mask.offsetHeight;
      //动态修改遮罩层的l、t
      mask.style.left = l + "px";
      mask.style.top = t + "px";
      //修改大图的left|top
      big.style.left = -2 * l + "px";
      big.style.top = -2 * t + "px";
    },
  },
  mounted(){
    //接受兄弟组件传递过来的索引值
    this.$bus.$on('send',(index)=>{
       //当前的this，zoom组件实例，通过点语法给组件实例添加新的属性
       //下面这种写法:
       //相当于动态给组件实例添加属性，并非响应式数据。【响应式属性:数据发生变化，视图立马更新】
       //响应式属性，应该现在data当中进行定义【Object.defineProperty:setter、getter监听数据变化、渲染视图】
       // this.currentIndex= index; 不行的，因为没有在data当中声明过，并非响应式属性，数据变了，但是视图不会变
       //可以的写法：通过组件实例的$set方法实现给组件动态添加新的响应式属性
       //向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
       //$set:后面后台管理系统项目当中会使用
        this.currentIndex = index;
        
    })
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
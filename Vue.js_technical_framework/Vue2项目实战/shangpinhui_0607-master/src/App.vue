<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方:展示的地方 -->
    <router-view></router-view>
    <!-- 显示:首页、搜索显示  隐藏：登录、注册 -->
    <!--v-show="$route.path=='/home'||$route.path=='/search'"-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  //根组件执行执行一次，因此mounted执行一次
  mounted(){
    //在根组件渲染出来的时候，向服务器派发action，通过Vuex向服务器发请求，获取三级联动的数据
    //将来给TypeNav（vuex）提供数据
    //写在这里的好处:1,请求只会发一次   2：在typeNav使用数据之前（数据在Vuex中已经存在，且只是向服务器发起一次请求）
    this.$store.dispatch('getCategory');
  }
};
</script>
<style scoped>
</style>

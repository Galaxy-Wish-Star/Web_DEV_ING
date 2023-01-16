<template>
  <div id="app">
    <!-- 顶部直通车  -->
    <TopBar></TopBar>
    <!-- 头部 -->
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default{
  components:{
    TopBar,Header,Footer
  }
}
</script>

<style lang="less" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


</style>

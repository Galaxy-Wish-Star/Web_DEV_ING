<template>
  <div class="home">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
</template>

<script>

// import HelloWorld from '@/components/HelloWorld.vue'
import {JingpinAPI} from "@/request/api.js"
export default {
  name: 'Home',
  components: {

  },
  async created(){
      // 没有封装的时候, 有哪些缺陷:
      // 1 添加的请求头写哪里?
      // 2 不便于接口管理
      // 3 容易出现回调地狱
      // await 123
      /*
       await new Promise((resolve,reject)=>{
         // 异步 

       })
      
      */
      // await Promise对象--异步
      let res = await JingpinAPI();


      
  }
}
</script>
<style lang="less" scoped>
header{
  background-color: pink;
}
</style>

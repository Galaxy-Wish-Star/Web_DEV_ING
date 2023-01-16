<template>
  <div class="header wrap">
      <h1>
        <img src="../assets/img/indexLogo.6f8ac4f0.png" alt="">
      </h1>
      <div class="nav">
        <ul>                                                  
          <li>首页</li>
          <li>全部商品</li>
          <li>个人中心</li>
          <li>我的订单</li>
          <li>专属福利</li>
        </ul>
      </div>
      <div class="search">
        <input type="text">
        <span><img  width="15" height="15" src="../assets/img/search.png" alt=""></span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

 
    }
  }
}
</script>
 
<style lang = "less" scoped>
  .header{
    height: 118px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav ul{
      width: 500px;
      display: flex;
      justify-content: space-between;
    }
    .search{
       display: flex;
      input{
        width: 214px;
        height: 38px;
        border: 1px solid #DEDEDE;
        border-radius: 20px 0px 0px 20px;
        text-indent: 12px;
      }
      span{
        width: 50px;
        height: 40px;
        background: #0A328E;
        border-radius: 0px 20px 20px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
</style>
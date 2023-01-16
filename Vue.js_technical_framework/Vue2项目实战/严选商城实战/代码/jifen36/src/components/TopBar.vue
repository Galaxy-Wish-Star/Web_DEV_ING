<template>
  <div class="top-bar">
    <div class="wrap top-bar-wrap">
      <div class="l">欢迎来到叩丁狼积分商城</div>
      <div class="r">
                            
        <ul>
          <li>
            <img class="avatar" width="26" src="../assets/img/userImg.f8bbec5e.png" alt="">
            用户名：游客
          </li>
          <li>我的鸡腿：-- </li>
          <li>获取鸡腿</li>
          <li>叩丁狼官网</li>
          <li class="login-btn">登录</li>
        </ul>

      </div>
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
  .top-bar{
    height: 40px;
    background: #242B39;
    color: #FFFEFE;
    line-height: 40px;
    .top-bar-wrap{
      /* background-color: pink; */
      height: 40px;
      display: flex;
      justify-content: space-between;
      /*字体样式 */
      font-size: 14px;
      font-family: SourceHanSansSC;
      font-weight: 300;
      color: #FFFEFE;
      .r{
        ul{
          display: flex;
          li{
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-left: 20px;
            .avatar{
              border-radius: 50%;
              margin-right: 6px;
            }

            &.login-btn{
              width: 124px;
              height: 40px;
              background: #0A328E;
              justify-content: center;
            }
          }
        }
      }
    }

  }

  
</style>
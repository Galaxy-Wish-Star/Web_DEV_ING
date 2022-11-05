<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户登录了，显示用户信息与退出登录 ||用户没有登录，显示的是登录与注册-->
          <p v-if="!userInfo.name">
            <span>请</span>
            <!-- 声明式导航务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
             <a>{{userInfo.name}}</a>
             <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "",
  data() {
    return {
      //收集表单数据---关键字的
      keyword: "",
    };
  },
  methods: {
    //搜索按钮的回调函数,点击的时候，home跳转到search
    goSearch() {
      //当年点击搜索按钮的时候，携带的是params参数，params参数可传递|不传递--->?
      //如果可传递|不传递，万一传递的是空字符串，会出现路径问题，
      //判断：点击搜索按钮之前，稍微判断一下是否有query参数，如果有query参数，携带给search
      //if判断你可以写，也可以不书写，判断没有任何意义【空对象隐式转换为布尔值真】
      if (this.$route.query) {
        //本身点击搜索按钮，当年只是携带params，如果路径当中存在query参数，是需要把query参数页携带给search
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        if (this.$route.path != "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    },
    //退出登录
    logout(){
       //退出登录的请求
       this.$store.dispatch('userLogout');
    }
  },
  mounted() {
    //监听自定义事件
    this.$bus.$on("changeKeyword", () => {
      //关键字置空
      this.keyword = "";
    });
  },
  computed:{
    ...mapState({
       userInfo:state=>state.user.userInfo
    })
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>

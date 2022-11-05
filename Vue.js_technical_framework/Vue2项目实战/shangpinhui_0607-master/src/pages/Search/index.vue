<template>
  <div>
    <!-- 三级联动:全局组件 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑的地方:带叉子的按钮-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑可能有也可能没有 -->
            <!-- 产品名字的按钮 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="clearName">×</i></li>
            <!-- 用户搜索关键字的按钮 -->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="clearKeyword">×</i></li>
            <!-- 品牌的面包屑:字符串才有split方法-->
            <li class="with-x" v-show="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="clearTradeMark">×</i></li>
            <!-- 展示平台属性的面包屑：平台属性存储于数组里面，可能有多个平台属性，一次需要遍历 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{prop.split(":")[1]}}<i @click="clearProp(index)">×</i></li>
          </ul>
        </div>
        <!--selector:属于search组件的一个子组件-->
        <SearchSelector @getTradeMarkInfo="getTradeMarkInfo" @getAttrInfo="getAttrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 拥有类名active：会将背景颜色变为红色 -->
                <li :class="{active:isComprehensive}" @click="changeOrder('1')">
                  <a>综合<span v-show="isComprehensive" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                </li>
                <li :class="{active:isPrice}" @click="changeOrder('2')">
                  <a>价格<span v-show="isPrice" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器的地方 
          total:分页器需要一共展示多少条数据  
          pageSize:每一页展示几条数据  
          pageNo:当前第几页
          continues:连续页码数5 7 9 112
          -->
          <Pagination :total="total" :pageSize="searchParams.pageSize" :pageNo="searchParams.pageNo" :continues="5" @currentPage="currentPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import SearchSelector from "./SearchSelector/SearchSelector";
//辅助函数
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    //响应式数据
    return {
      //收集需要带给服务器参数，参数可变化的，响应式的
      //携带给服务器参数
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //产品的名字
        keyword: "", //关键字
        props: [], //平台属性的选择参数
        trademark: "", //品牌参数
        //上面这七个参数：有用户选择决定的，因此初始值为空的
        //下面这三个：都有初始值
        order: "1:desc", //携带给服务器参数order--->初始值"1:desc"[综合降序]
        pageNo:1,
        // pageNo:parseInt(localStorage.getItem('pageNo'))||1, //获取第几页的数据，默认即为第一个的数据
        pageSize:3, //每一页需要展示多少条数据

      },
    };
  },
  components: {
    SearchSelector,
  },
   //生命周期函数
   beforeMount(){
     //在发请求之前，把携带给服务器参数整理好，携带服务器
     //当路由跳转的时候，把home传递过来的query参数与params参数赋值给searchParams对象
     //Object.assin()合并对象
     Object.assign(this.searchParams,this.$route.query,this.$route.params);
   },
  //组件挂载完毕发起一次请求
  mounted() {
    this.getSearchList();
  },
  methods: {
    //获取搜索产品的数据
    getSearchList() {
      //派发action通知服务器发请求
      //目前而言：组件通知服务器发请求，获取数据，携带一个空对象
      //当然将来这个空对象进行替换，替换我响应数据（收集用户选择调价带给服务器）
      //第二个参数：作为getSearchList这个action的第二个形参
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //清除产品的名字
    clearName(){
      //把数据清空
      this.searchParams.categoryName = '';
      //修改URL:当前search模块跳转到search，只不过不在携带query参数，
      //路由发生变化了,watch在监听路由的变化，路由发生变化，会再次发请求的
      //清除路由当中的query参数，如果存在params参数应该带着，不应该删除
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params});
      }
    }
    ,
    //清除关键字
    clearKeyword(){
      //清除关键字的数据
      this.searchParams.keyword = '';
      //路由跳转自己跳自己
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query});
      }
      //通知兄弟组件，把关键字清除----全局事件总线$bus
      //通知
      this.$bus.$emit("changeKeyword");
    },
    //获取自定义事件（子组件给父组件）品牌信息
    getTradeMarkInfo(trademark){
       //整理参数:参数格式切记参考文档
       this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
       //在发请求
       this.getSearchList();
    },
    //清除品牌面包屑
    clearTradeMark(){
      //携带给服务器参数：清除  
      this.searchParams.trademark = '';
      this.getSearchList();
    },
    //获取自定义事件（字组件给父组件）平台属性信息
    getAttrInfo(attr,attrValue){
        //整理参数:['属性ID:属性值:属性名'],携带给服务器参数【看文档】
        //对于前端工程师而言。收集数据属于基本功
        let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
        //添加到searchParams.props数组里面携带给服务器
        //需要进行判断：判断数组当中是否已包含这个属性值，如果有不需要添加，没有在添加 
        //发请求(属性值相同的情况下不在发请求，属性不同在发请求)
        /*
          if( this.searchParams.props.indexOf(prop)==-1){
             this.searchParams.props.push(prop);
              this.getSearchList();
          }
        */
       this.searchParams.props.indexOf(prop)==-1&&this.searchParams.props.push(prop)&&this.getSearchList()
    },
    //排序的回调
    changeOrder(flag){
      //flag形参：用户点击综合或者价格标记
      //order默认初始值:综合降序  1:desc
      let orginFlag = this.searchParams.order.split(':')[0];
      let originSort = this.searchParams.order.split(":")[1];
      //准备一个新的排序方式---【页面效果永远不会变的】
      let newOrder = '';
      //判断:用户点击的是带有背景颜色按钮
      if(flag==orginFlag){
         newOrder = `${orginFlag}:${originSort=='desc'?'asc':'desc'}`
      }else{
        //点击的是不带颜色按钮
        newOrder = `${flag}:desc`
      }
      //携带给服务器参数
      this.searchParams.order = newOrder;
      //再次发请求
      this.getSearchList();
    },
    //删除平台属性的方法
    clearProp(index){
       this.searchParams.props.splice(index,1);
       this.getSearchList();
    },
    //分页器的自定义事件，将用户点击的第几页数据传递给父组件
    currentPage(pageNo){
       //修改给服务器携带的参数
       this.searchParams.pageNo = pageNo;
       //本次存储持久化
      //  localStorage.setItem('pageNo',pageNo);
       //再次发请求
       this.getSearchList();
    }
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //计算属性：是不是综合
    isComprehensive(){
        return this.searchParams.order.indexOf('1')!=-1;
    },
    //是不是价格
    isPrice(){
      return this.searchParams.order.indexOf('2')!=-1;
    },
    //是不是降序
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1;
    },
    //是不是升序
    isAsc(){
       return this.searchParams.order.indexOf('asc')!=-1;
    },
    ...mapState({
       total:state=>state.search.searchList.total
    })
  },
  //监听路由的变化
  watch: {
      //组件实例身上是有$route这个属性的【包含：路由信息】
      //只要路由发生变化，立即在向服务器发请求
      $route(){
         //清除上一次发请求的id
         this.searchParams.category1Id = undefined;
         this.searchParams.category2Id =undefined;
         this.searchParams.category3Id = undefined;
         //先收集最新的搜索条件（再次整理参数），在想服务器发请求
         Object.assign(this.searchParams,this.$route.query,this.$route.params);
         //再次发请求
         this.getSearchList();
      }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
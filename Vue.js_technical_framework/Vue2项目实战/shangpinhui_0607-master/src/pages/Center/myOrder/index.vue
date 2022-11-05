<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- 展示交易地方-->
        <table class="order-item" v-for="(trade,index) in myOrderList.records" :key="trade.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">{{trade.createTime}}　订单编号：{{trade.outTradeNo}}
                  <span class="pull-right delete"><img src="../images/delete.png" /></span>
                  </span>
              </th>
            </tr>
          </thead>
          <tbody>
             <!-- 展示每一笔交易有多少个产品 -->
            <tr v-for="(shopcart,index) in trade.orderDetailList" :key="index">
              <td width="60%">
                <div class="typographic">
                  <img :src="shopcart.imgUrl"  style="width:100px;height:100px;"/>
                  <a href="#" class="block-text">{{shopcart.skuName}}</a>
                  <span>x{{shopcart.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!-- 合并单元格 -->
              <td :rowspan="trade.orderDetailList.length" v-if="index==0" width="8%" class="center">{{trade.consignee}}</td>
              <td :rowspan="trade.orderDetailList.length" v-if="index==0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{trade.totalAmount}}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="trade.orderDetailList.length" v-if="index==0" width="8%" class="center">
                <a href="#" class="btn">{{trade.orderStatusName}}</a>
              </td>
              <td :rowspan="trade.orderDetailList.length" v-if="index==0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
         <!-- 分页器组件  四个属性【props】 一个方法【自定义事件】-->
         <Pagination :pageNo="page" :pageSize="limit" :total="myOrderList.total" :continues="5" @currentPage="getPageNo"/>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      //代表当前第几页
      page: 1,
      //代表每一个展示多少条数据
      limit: 3,
      //我的订单的数据
      myOrderList:{}
    };
  },
  //组件挂载完毕->获取一次我的订单列表的数据【第一页】
  mounted() {
    //获取我的订单数据
    this.getData();
  },
  methods: {
    //获取我的订单的函数
    async getData() {
      //解构出参数
      const { page, limit } = this;
      //发请求获取我的订单的数据
      //当前这个函数发请求的时候，需要参数，第一个参数：当前第几页、第二个参数：每一页多少条数据展示
      let result  = await this.$API.reqMyList(page,limit);
       if(result.code==200){
         //存储数据--->存储在组件身上
         this.myOrderList = result.data;
       }
    },
    //获取分页器第几页的回调--->自定义事件
    getPageNo(pageNo){
        //修改参数
        this.page = pageNo;
        //在获取我的订单的数据
        this.getData();
    }
  },
};
</script>

<style scoped>
</style>

<template>
  <div class="pay-main">
    <!-- 测试使用element-ui里面的组件 -->
    <el-button type="primary">主按钮</el-button>
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              payInfo.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入二维码依赖包
import qrcode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      //支付信息
      payInfo: {},
      timer:null,
      //保存用户支付状态
      code:'',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取支付信息
    async getData() {
      //获取支付信息的时候，需要携带ID，因为服务器需要知道获取那笔交易的信息
      let result = await this.$API.reqOrderPay(this.$route.query.orderId);
      if (result.code == 200) {
        this.payInfo = result.data;
      }
    },
    //测试elementUI按需引入通知组件的回调
    open() {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0,
      });
    },
    //立即支付按钮的回调
    async pay() {
      //准备二维码
      //qrcdoe.toDataUrl需要传递一个字符串，这个函数执行，返回的是一个Promise
      let imgUrl = await qrcode.toDataURL(this.payInfo.codeUrl);
      //第一个参数:字符串【标签形式的字符串转换为真是DOM节点】
      //第二参数：弹框的标题
      //第三个参数：弹框配置对象
      this.$alert(`<img src=${imgUrl}>`,'请微信支付', {
        //可以把字符串形式的字符，变为真是DOM节点
        dangerouslyUseHTMLString: true,
        //布局居中
        center: true,
        //关闭右上角按钮
        showClose: false,
        //显示取消按钮
        showCancelButton: true,
        //取消按钮的文本内容设置
        cancelButtonText: "支付遇到问题",
        //确定按钮的文本内容设置
        confirmButtonText: "我已支付成功",
        //关闭弹框之前会出发的回调
        beforeClose:(action, instance, done)=>{
            //action:区分是取消按钮、还是确定按钮
            //done：方法，可以关闭弹框
            if(action=='cancel'){
              //取消按钮：支付遇到问题的按钮-----【不能进行路由跳转】
              alert('请你练习超级管理员，解决支付问题');
              //隐藏弹框
              done();
              //清除定时器
              clearInterval(this.timer);
            }else{
              //确定按钮:查询支付状态的时候，发请求如果code等等200，一定花钱了
              // if(this.code==200){
              //    //才支付
                 clearInterval(this.timer);
                 //关闭弹框
                 done();
              //    //路由跳转
              //    this.$router.push('/paysuccess');
              // }else{
              //   //没花钱
              //   alert('请花钱，充值至尊会员，休想不花钱过去');
              //   clearInterval(this.timer);
              //   done();
              // }
               this.$router.push('/paysuccess');
            }
        }
      });
      //当点击立即支付按钮以后，会弹出一个二维，用户支付成功，进行路由跳转，跳转到下一路由
      //如果支付失败，停留在当前路由，你怎么能知道用户的支付情况那？
      //向服务器发请求，获取用户支付情况？需要与用到定时器，频繁向服务器问，用户支付情况
      this.timer = setInterval(async ()=>{
           let result  = await this.$API.reqOrderStatus(this.payInfo.orderId);
           //成功
           if(result.code==200){
              this.code = result.code;
              //清除定时器
              clearInterval(this.timer);
              //关闭弹框
              this.$msgbox.close();
              //路由跳转
              this.$router.push('/paysuccess');
           }else{
              // console.log(result.message);
           }
           //失败
      },2000);
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
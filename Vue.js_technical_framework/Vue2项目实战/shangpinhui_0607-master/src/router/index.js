//引入Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter);

//备份VueRouter.prototype原有的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
     //函数对象的apply与call的区别?
     //相同点:都可以改变函数的上下文一次，而且函数会立即执行一次
     //不同：函数执行的时候，传递参数不同，apply需要的是数组，call传递参数的时候用逗号隔开
     //原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter类的实例
     //第一种情况：外部在使用push的时候传递成功与失败的回调
     if (resolve && reject) {
          originPush.call(this, location, resolve, reject);
     } else {
          //第二种情况：外部在使用push方法的时候没有传递成功与失败的回调函数
          originPush.call(this, location, () => { }, () => { });
     }
}
//重写VueRouter.prototype.replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
     (resolve && reject) ? originReplace.call(this, location, resolve, reject) : originReplace.call(this, location, () => { }, () => { });
}
import routes from './routes'
//对外默认暴露一个VueRouter的实例
//在路由配置的时候，对外暴露一个Router类的一个实例
const router = new VueRouter({
     //配置路由
     routes,
     //滚动行为的设置
     scrollBehavior(to, from, savedPosition) {
          //设置Y轴的起点【y属性值没有负数】
          //当然滚动行为也可以设置x轴的
          return { y: 0 }
     }

});

//全局守卫使用:全局守卫它router【VueRouter类的一个实例】的一个方法
//全局守卫【前置守卫:在路由跳转之前会执行一次】
router.beforeEach(async (to, from, next) => {
     //to:要去哪里【路由信息】
     //from:从哪里来【路由信息】
     //next:是一个函数，放行函数
     //1:next()执行不传递参数【放行：该去哪里去哪里】 2:next(path):放行，放行到准确的某一个路由当中   
     //获取仓库中的token,因为如果用户登录了，仓库中一定是有token，用户没有登录，没有token
     let token = store.state.user.token;
     //获取用户信息，通过用户信息有没有进行判断，进行方式
     let name = store.state.user.userInfo.name;
     //用户已经输入用户名+密码登录成---【token】
     if (token) {
          //用户登陆了，且想去登录页的分支
          if (to.path == "/login") {
               next("/home");
               //用户登录了，且想去的不是login的分支  
          } else {
               //代表用户登录了（且去的不是login），而且还有用户信息
               if (name) {
                    //next代表该去哪里就去哪里 
                    next();
               } else {
                    //代表用户登录了，且没有用户信息
                    try {
                         //代表用户登录了，但是没有用户信息，发请求让仓库存储用户信息，在进行路由跳转 
                         await store.dispatch('getUserInfo');
                         //该去哪里去哪里
                         next();
                    } catch (error) {
                         //token过期失效了:清除本地的token（过期的）
                         await store.dispatch('userLogout');
                         //清除本地数据之后，让用户回到登录页，重新登录、获取新的token
                         next('/login')
                    }
               }
          }

     } else {
          //未登录的判断
          //如果用户未登录：去交易页面trade、去支付页面pay、支付成功页面paysuccess、个人中心 center/myorder  center/grouporder
          //用户未登录应该去登录页
          //获取用户未登录想去的路由的路径
          let toPath = to.path;
          //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
          if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
               //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
               //跳转到登录页
               next('/login?redirect='+toPath);
          } else {
               //去的并非上面这些路由,放行
               next();
          }

     }


});




export default router;

//仓库--vuex
import Vue from 'vue';
import Vuex from 'vuex';
//使用插件
Vue.use(Vuex);
//引入相关模块的小仓库
import home from './home';
import search from './search';
import detail from './detail'
import shopcart from './shopcart'
import user from './user';
//对外暴露Store类的一个实例
export default new Vuex.Store({
   //模块:务必注册，各个小仓库切记别不注册，不注册就和没写没区别了
   modules:{
       home,
       search,
       detail,
       shopcart,
       user
   }
});

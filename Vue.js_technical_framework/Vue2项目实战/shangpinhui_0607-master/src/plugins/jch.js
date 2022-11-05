//Vue自定义插件
//自定义插件对外暴露的是一个插件对象
let jch = {};

//使用这个插件的时候，会出发install方法
jch.install = function(Vue){
  //添加全局组件
 //Vue.component();
 //Vue.directive();
//  Vue.prototype.$bus = new Vue;
}

//对外暴露
export default jch;
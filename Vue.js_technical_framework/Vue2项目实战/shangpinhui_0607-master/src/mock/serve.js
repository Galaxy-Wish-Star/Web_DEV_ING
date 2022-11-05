//通过mockjs模块实现模拟数据
//对外暴露的是一个对象
import Mock from 'mockjs';
//模拟的数据需要引入进来
//对于一些模块：图片、json文件默认对外暴露【虽然你没有书写但是它已经暴露了】
import banner from './banner.json';
import floor from './floor.json';

//通过Mock对象模拟出虚拟数据
//Mock依赖包对外暴露的是一个Mock对象，这个对象提供的一个mock方法可以模拟数据
//参数:第一个参数  模块数据将来axios请求的地址   第二个参数:获取到的数据
//注意:项目当中发请求的接口
//第一种:真实服务器接口 http://39.98.123.211/api/list/xx 
//第二种:mock出来数据接口xxx/mock/banner
//路径当中出现/api 真实接口    /mock 模拟数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});



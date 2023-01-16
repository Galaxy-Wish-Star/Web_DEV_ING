// 对axios对象进行封装
import axios from "axios"


// 创建axios实例
const instance = axios.create({
  baseURL:"http://kumanxuan1.f3322.net:8881/cms",
  timeout:5000
})

// 封装请求拦截器
instance.interceptors.request.use(config=>{
    // 什么时候执行这个函数??   在请求发出去之前执行
    // config是什么??   是一个对象,保存了关于本次请求的信息
    // 这个函数用来做什么?   可以用来做一些请求前的准备(比如: 添加请求头)
    // console.log("请求拦截器中的代码",config);

    return config
},err=>{
    return Promise.reject(err)
})

// 封装响应拦截器
instance.interceptors.response.use(res=>{
    // 这个函数什么时候执行??   后端返回数据,并且在组件内部接收之前执行
    // res 是axios封装的关于本次响应对象
    // res.data 就是后端给我们的数据
    // 这个函数用来做什么?? 对服务器响应回来的数据进行统一处理
    // console.log("响应拦截器中的res", res.data);
    return res.data  // 这里的数据 return 到组件内部请求的回调函数中的res
},err=>{
    return Promise.reject(err)
})

export default instance
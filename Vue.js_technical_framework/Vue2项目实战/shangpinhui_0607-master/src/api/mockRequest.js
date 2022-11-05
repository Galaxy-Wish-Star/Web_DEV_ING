//axios进行二次封装
import axios from 'axios';
//进度条
import nprogress from 'nprogress';
//因为进度条样式咱们没有引入
import "nprogress/nprogress.css"
//创建axios实例[创建出来的实例即为axios，只不过可以配置一些东西]
let instance = axios.create({
    //可以给请求路径中添加一些参数 
    baseURL: "/mock",
    //设置请求时间（5S）
    timeout: 5000
});

//请求拦截器:在发请求之前可以检测到，可以干一些事情
instance.interceptors.request.use((config) => {
    //config配置对象，这里面有请求头
    //config，请求拦截器的一个配置对象
    //检测到程序发请求，请求拦截器可以检测到，进度条开始动
    nprogress.start();
    return config;
});

//响应拦截器：服务器的数据已经返回了，可以干一些事情
instance.interceptors.response.use((res) => {
    //简化服务器返回的数据格式
    //服务器数据返回进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    //终止promise链
    return Promise.reject(error);
});


//对外暴露二次封装的axios
export default instance;
//搭建第一个的后端程序
// 1、导入http模块
const http=require('http');
// 2、定义服务程序的端口号
const port=8080;
// 3、创建服务器对象
const server=http.createServer((request,response)=>{
        //这里的代码每收到一次请求就会执行一次
        //request请求对象 response响应对象
        response.write('nihao')
        response.end('hello nodejs http')//表示响应工作结束，这个方法后面不要再写响应的一些的操作
        
})
// 4、调用服务器的监听方法，让服务器监听浏览器的请求
server.listen(port,(error)=>{
    //用来表示监听有没有出错
    console.log(error);//如果没有报错，undefined
    console.log('服务器已经运行成功了');
})
/*
一个端口号只能被一个服务器使用，如果端口号被占用就换一个
end永远放在响应的最后面，多次调用时没有效果的
*/
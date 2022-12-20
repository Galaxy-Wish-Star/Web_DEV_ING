const express = require('express');
const handleDB = require('./db/handleDB');
const app = express();
app.get('/get_data', (req, res) => {
    //自执行函数
    (async function () {
      let result= await handleDB(res,'students','find','数据库查询出错','id=4');//handleDB()数据库返回的数据
      let result01= await handleDB(res,'students1','update','数据库修改出错','id=4',{name:'黎明',cls_id:2});//handleDB()数据库返回的数据
        //...
    console.log('修改成功');
    res.send(result);
    })();


})
app.listen(3001, () => {
    console.log('express 启动成功');
})

/*
登录：
1、获取用户名和密码，获取post参数，先查询用户名有没有被注册（回调函数），如果注册了
2、校验用户名和密码是否和数据库的内容匹配(回调函数)
回调函数嵌套回调函数（地狱回调）
使用一个更好的方法去书写代码，异步操作的终极方案(async+await)

try/catch捕获异常，保障程序不会崩掉
*/
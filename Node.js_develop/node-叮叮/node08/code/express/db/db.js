//首先安装mysql
//引入
const mysql=require('mysql');
//数据库的连接基本配置
var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test'
})

//对数据库进行增删改查的操作的基础
function query(sql,callback){
    //getConnection连接 ，pool连接池
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            //错误，还有一个是记录，也就是查询到的记录
            callback(err,rows)
            connection.release()
        })
    })
}
exports.query=query;
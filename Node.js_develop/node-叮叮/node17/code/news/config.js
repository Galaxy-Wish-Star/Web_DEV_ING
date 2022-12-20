const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const passportRouter = require('./routes/passport');
const detailRouter = require('./routes/detail');
const profileRouter = require('./routes/profile');
const common = require('./utils/common');
const keys = require('./keys');
//使用函数进行封装
// let appConfig = (app) => {
//     //cookie的注册
//     app.use(cookieParser());
//     //session的注册
//     app.use(cookieSession({
//         name: 'my_session',
//         keys: ['$%^shfjashgjadnsf#$%^%^*&^&#@sadfsdfas'],
//         maxAge: 1000 * 60 * 60 * 24 * 2 //设置过期时间为2天
//     }))

//     //获取post请求参数的配置
//     app.use(bodyParser.urlencoded({
//         extended: false
//     }));
//     app.use(bodyParser.json());
//     //设置静态资源的使用
//     app.use(express.static(path.join(__dirname, 'public')));
//     // 模板引擎的使用
//     app.engine('html', require('express-art-template'));
//     app.set('view options', {
//         debug: process.env.NODE_ENV !== 'development'
//     });
//     app.set('views', path.join(__dirname, 'views'));
//     app.set('view engine', 'html');
// }

//使用面向对象
class AppConfig {
    constructor(app) {
        this.app = app;
        //cookie的注册
        this.app.use(cookieParser());
        //session的注册
        this.app.use(cookieSession({
            name: 'my_session',
            keys: [keys.session_keys],
            maxAge: 1000 * 60 * 60 * 24 * 2 //设置过期时间为2天
        }))
        //获取post请求参数的配置
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());
        //设置静态资源的使用
        this.app.use(express.static(path.join(__dirname, 'public')));
        // 模板引擎的使用
        this.app.engine('html', require('express-art-template'));
        this.app.set('view options', {
            debug: process.env.NODE_ENV !== 'development'
        });
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'html');
        //设置路由
        this.app.use(common.csrfProtect, indexRouter);
        this.app.use(common.csrfProtect, passportRouter);
        this.app.use(common.csrfProtect, detailRouter);
        this.app.use(common.csrfProtect, profileRouter);
        this.app.use((req, res) => {
           common.abort404(req,res)
        })
    }
}
module.exports = AppConfig;
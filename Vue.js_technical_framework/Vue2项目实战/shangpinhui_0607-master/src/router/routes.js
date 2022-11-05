export default [
    {
        path: '/home',
        //component右侧数值：放置的是一个箭头函数，当这个home路由被访问的时候，才会执行；
        //当用户访问当前Home的时候，我才加载Home路由组件，不访问，不加载当前Home路由组件
        component: () => import('@/pages/Home'),
        //路由元信息---控制footer显示与隐藏
        meta: { show: true },
    },
    {
        //代表params参数可有可无，务必要加上?
        path: '/search/:keyword?',
        //不管你访问不访问search，都加载search路由组件
        component: () => import('@/pages/Search'),
        meta: { show: true },
        //命名路由
        name: 'search',
        //路由也可以传递props数据，拥有三种写法
        //如果 props 被设置为 true，params参数将会被设置为组件属性
        // props:true,
        // props:{a:1,b:2}
        props: (route) => ({ keyWord: route.params.keyWord, k: route.query.k })

    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    }, {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    // 重定向
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: { show: true },
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true },
        name: "addcartsuccess"
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    //交易页面的路由：书写在这里的守卫，路由独享守卫【只负责档期这一个路由】
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            //to：去哪个路由
            //from：从哪个路由而来
            //next：放行函数
            //代表的用户从购物车跳转到交易页面，才放行
            if (from.path == "/shopcart") {
                next();
            } else {
                //用户并非从购物车而来  
                //next(false): 中断当前的导航。
                //如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //进入支付页面，必须从交易页面而来
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }

    }
    ,
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            //我的订单二级路由
            {
                path: "myorder",
                component: () => import('@/pages/Center/myOrder'),
            }
            ,
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            }
            ,
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    }
]
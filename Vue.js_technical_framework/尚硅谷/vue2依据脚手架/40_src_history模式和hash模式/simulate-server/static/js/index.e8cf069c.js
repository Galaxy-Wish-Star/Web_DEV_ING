(function(t){function e(e){for(var r,a,s=e[0],c=e[1],l=e[2],f=0,p=[];f<s.length;f++)a=s[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={index:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("Banner")],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-2 col-xs-offset-2"},[n("div",{staticClass:"list-group"},[n("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:{name:"regard"}}},[t._v("About")]),n("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:"/home"}},[t._v("Home")])],1)]),n("div",{staticClass:"col-xs-6"},[n("div",{staticClass:"panel"},[n("div",{staticClass:"panel-body"},[n("router-view")],1)])])])])},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-xs-offset-2 col-xs-8"},[t._m(0),n("button",{on:{click:t.forward}},[t._v("前进")]),n("button",{on:{click:t.back}},[t._v("后退")]),n("button",{on:{click:t.test}},[t._v("测试一下go")])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-header"},[n("h2",[t._v("Vue Router Demo")])])}],c={name:"Banner",methods:{forward:function(){this.$router.forward()},back:function(){this.$router.back()},test:function(){this.$router.go(-2)}}},l=c,u=(n("8e77"),n("2877")),f=Object(u["a"])(l,a,s,!1,null,"5290f57e",null),p=f.exports,v={name:"App",components:{Banner:p}},d=v,m=Object(u["a"])(d,o,i,!1,null,"84b5dcc6",null),h=m.exports,_=n("8c4f"),b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",[t._v("我是About的内容")])},g=[],w={name:"About",mounted:function(){console.log("The route of About",this.$route)},beforeRouteEnter:function(t,e,n){console.log("App---beforeRouteEnter"),console.log(e,t);var r=t.meta.isAuth;r?"wust1"===localStorage.getItem("school")?n():alert("无权限"):n()},beforeRouteLeave:function(t,e,n){console.log("App---beforeRouteLeave"),console.log(e,t),n()}},y=w,x=Object(u["a"])(y,b,g,!1,null,"18f822bd",null),k=x.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("我是Home的内容")]),n("div",[n("ul",{staticClass:"nav nav-tabs"},[n("li",[n("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:"/home/news"}},[t._v("News")])],1),n("li",[n("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:"/home/message"}},[t._v("Message")])],1)]),n("keep-alive",{attrs:{include:"News"}},[n("router-view")],1)],1)])},$=[],j={name:"Home"},C=j,E=Object(u["a"])(C,O,$,!1,null,"98242c4a",null),A=E.exports,S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",{style:{opacity:t.opacity}},[t._v("欢迎学习vue")]),t._m(0),t._m(1),t._m(2)])},M=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[t._v("news001 "),n("input",{attrs:{type:"text"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[t._v("news002 "),n("input",{attrs:{type:"text"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[t._v("news003 "),n("input",{attrs:{type:"text"}})])}],P={name:"News",data:function(){return{opacity:1}},activated:function(){var t=this;console.log("News组件被激活"),this.timer=setInterval((function(){console.log("@"),t.opacity-=.01,t.opacity<=0&&(t.opacity=1)}),16)},deactivated:function(){console.log("News组件失活了"),clearInterval(this.timer)}},N=P,R=Object(u["a"])(N,S,M,!1,null,"1c7c059d",null),q=R.exports,L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",t._l(t.messageList,(function(e){return n("li",{key:e.id},[n("router-link",{attrs:{to:{name:"particulars",query:{id:e.id,title:e.title}}}},[t._v(" "+t._s(e.title)+" ")]),t._v("   "),n("button",{on:{click:function(n){return t.pushShow(e)}}},[t._v("push查看")]),n("button",{on:{click:function(n){return t.replaceShow(e)}}},[t._v("replace查看")])],1)})),0),n("hr"),n("router-view")],1)},T=[],B=(n("ac1f"),n("5319"),{name:"Message",data:function(){return{messageList:[{id:"001",title:"消息001"},{id:"002",title:"消息002"},{id:"003",title:"消息003"}]}},methods:{pushShow:function(t){this.$router.push({name:"particulars",query:{id:t.id,title:t.title}})},replaceShow:function(t){this.$router.replace({name:"particulars",query:{id:t.id,title:t.title}})}},beforeDestroy:function(){console.log("Message组件将要被销毁")}}),D=B,H=(n("7815"),Object(u["a"])(D,L,T,!1,null,"271ed70f",null)),I=H.exports,J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("消息编号:"+t._s(t.id))]),n("li",[t._v("消息标题:"+t._s(t.title))])])},V=[],z={name:"Detail",props:["id","title"]},F=z,G=Object(u["a"])(F,J,V,!1,null,"55d1e08c",null),K=G.exports,Q=new _["a"]({mode:"history",routes:[{name:"regard",path:"/about",component:k,meta:{isAuth:!0,title:"关于"}},{name:"homepage",path:"/home",component:A,meta:{title:"主页"},children:[{name:"ns",path:"news",component:q,meta:{isAuth:!0,title:"新闻"}},{name:"msg",path:"message",component:I,children:[{name:"particulars",path:"detail",component:K,props:function(t){var e=t.query,n=e.id,r=e.title;return{id:n,title:r}}}],meta:{isAuth:!0,title:"消息"}}]}]});Q.afterEach((function(t,e){var n=t.meta.title;document.title=n||"vue-advance"}));var U=Q;r["a"].config.productionTip=!1,r["a"].use(_["a"]),new r["a"]({el:"#app",render:function(t){return t(h)},router:U})},7815:function(t,e,n){"use strict";n("cb12")},"8e77":function(t,e,n){"use strict";n("b9cc")},b9cc:function(t,e,n){},cb12:function(t,e,n){}});
//# sourceMappingURL=index.e8cf069c.js.map
// 统一管理项目中所有的请求路径 api
import request from "./request"

// 首页精品推荐请求
// export const JingpinAPI = function(){
//   return request.get("/products/recommend")
// } 
export const JingpinAPI = () => request.get("/products/recommend");



// xxx请求


//  xx请求
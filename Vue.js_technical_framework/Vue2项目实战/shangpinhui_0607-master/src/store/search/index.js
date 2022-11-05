//引入接口函数
import { reqSearchList } from '@/api';

//state：仓库数据的来源
const state = {
    //存储搜索模块的数据
    searchList: {}
};
//mutations:唯一可以改变state数据地方
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
//actions:可以处理dispatch派发action地方，这里可以书写你的业务逻辑：for、if、异步语句等等
const actions = {
    //获取搜索页面的数据
    async getSearchList({ commit }, data) {
        //注意:获取搜索页面的数据（请求接口），至少携带一个空对象才能获取数据
        let result = await reqSearchList(data);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
};
//getters:计算属性（基础课程的时候）
//getters:作用,getters是为了简化数据而生（为了组件获取数据方便而生）
const getters = {
     //搜索模块【商品展示的数据】
     //state：它是当前小仓库（search）的state数据，没有home仓库中的state
     //只是当前仓库的state
     goodsList(state){
         return state.searchList.goodsList;
     },
     //品牌数据
     tradeMarkList(state){
       return state.searchList.trademarkList;
     },
     //平台属性
     attrsList(){
         return state.searchList.attrsList;
     }
};

export default {
    state,
    mutations,
    actions,
    getters
}
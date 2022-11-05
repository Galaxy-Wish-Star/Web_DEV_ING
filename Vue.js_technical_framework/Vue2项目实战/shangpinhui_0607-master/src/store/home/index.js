//home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api';
//四大核心属性
//state：仓库数据的来源
const state = {
    //商品分类的数据,这里初始化数据不能瞎写。看请求返回的结果
    categoryList: [],
    //bannerList：存储首页的轮播图的数据
    bannerList: [],
    //floor：存储Floor（楼层组件的）数据
    floorList:[]
};
//mutations:唯一可以改变state数据地方
const mutations = {
    GETCATEGORY(state, category) {
        //修改state
        state.categoryList = category;
    }
    ,
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST: (state, floorList) => {
        state.floorList = floorList;
    }
};
//actions:可以处理dispatch派发action地方，这里可以书写你的业务逻辑：for、if、异步语句等等
const actions = {
    //获取商品分类的数据
    async getCategory({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            //提交mutation
            commit("GETCATEGORY", result.data);
        }
    },
    //获取首页banner的数据【轮播图】
    async getBannerList({ commit }) {
        //服务器返回banner数据--->存储于vuex当中
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取Floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data);
        }
    }

};
//getters：计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
import { reqDetailList,reqAddOrUpdateShopCart } from '@/api';
const state = {
     //仓库中的detailList有几种状态:
     //第一种状态：起始数据是一个空对象
     //第二种状态：派发action，向服务器发请求，服务器把数据返回给你【真实的数据】，将空对象替换
     detailList:{}
};
const mutations = {
    GETDETAILLIST: (state, detailList) => {
         state.detailList = detailList;
    }
}
const actions = {
    //获取详情的数据
    async getDetailList({ commit }, skuId) {
        let result = await reqDetailList(skuId);
        if (result.code == 200) {
            commit("GETDETAILLIST", result.data);
        }
    }
    ,
    //加入购物车产品||或者更新某一个产品的个数接口
    async addShopCart({commit},{skuId,skuNum}){
        let result  = await reqAddOrUpdateShopCart(skuId,skuNum);
        //加入购物车成功
        if(result.code==200){
            //代表当前函数addShopCart返回的promise状态是成功
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
        //一个函数执行，默认返回的是undefined，代表promise成功，
        //函数执行默认返回的是undefined，永远是成功，什么时候undefined不起作用了
    }
};
//getters:计算属性。在项目当中为简化数据而生
const getters = {
    //面包屑的数据
    //state:计算属性getters里面的state，是当前仓库中state，并非大仓库中数据【home、search】
    categoryView(state){
       //计算属性注意:
       //情况1:detailList是一个空对象，空对象打点categoryView等于undefined，你把undefined给组件
       //情况2:当服务器的数据返回，detailList属性的属性值发生变化，重新计算（detailList）存储即为服务器的数据，
       //给组件给的也是服务器的数据
       return state.detailList.categoryView||{}
    },
    //产品的属性的数据简化
    spuSaleAttrList(state){
       return state.detailList.spuSaleAttrList; 
    },
    //产品详情的数据的简化
    skuInfo(state){
      return state.detailList.skuInfo||{};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}
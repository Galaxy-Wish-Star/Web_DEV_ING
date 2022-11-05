import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken,getToken,clearToken} from '@/utils/token'
//登录与注册模块仓库
const state = {
    code: '',
    token:getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    SETTOKEN(state, token) {
        state.token = token;
    },
    //存储用户信息
    GETUSERINGO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //退出登录情况全部用户信息
    USERLOGOUT(state){
       state.token = '';
       state.userInfo = {};
       //本地存储数据【token】
       clearToken();
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqCode(phone);
        //前端工程师：没有能力把验证码发到用户手机上的功能
        //务必、一定是是后台人员实现的
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faiile'));
        }
    },
    //用户注册
    async userRegister({ commit }, { phone, code, password }) {
        let result = await reqRegister(phone, code, password);
        if (result.code == 200) {
            return 'ok';
        } else {
            //捕获到错误信息
            return Promise.reject(result.message);
        }
    },
    //登录业务
    async userLogin({ commit }, { phone, password }) {
        //当前的这个action，向服务器发起登录请求
        let result = await reqLogin(phone, password);
        //切记:当用户登录成功以后，服务器会返回相应数据信息，数据信息当中包含token
        //登录成功一定是有token，登录没有成功【没有token】
        //用户登录成功，一般只是返回token，很少返回用户名
        //将来需要在发请求（获取用户名字的）携带token给服务器【用户信息】
        if (result.code == 200) {
            //如果仓库,已经存储token,用户一定是登陆了
            commit("SETTOKEN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            //登录失败
            return Promise.reject(result.message);
        }

    },
    //获取用户信息:只要出发这个action，就可以获取用户信息
    async getUserInfo({ commit }) {
        //为什么用户已经登录：但是获取不到用户信息，因为获取用户信息需要携带token
        //这样服务器才知道你是谁，才会返回相应的用户额信息
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINGO", result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({commit}) {
        //发请求通知服务器销毁token
        let result = await reqLogout();
        if(result.code==200){
            commit("USERLOGOUT");
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}

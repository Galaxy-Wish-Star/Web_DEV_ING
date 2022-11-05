//引入uuid生成临时身份【1:身份只能有一个 2：持久化存储】
import { v4 as uuidv4 } from 'uuid';
//数据持久化存储----本地存储
export const userTemp = () => {
    //先从本地存储获取用户临时身份
    let userInfo = localStorage.getItem('USERINFO');
    //如果没有用户身份
    if (!userInfo) {
        //没有用户临时身份，创建一个
        userInfo = uuidv4();
        //存储到本地存储当中:用户身份只需要存储一次，而且不能变
        localStorage.setItem('USERINFO', userInfo);
    }
    return userInfo;
};
/**
 * 根据接口文档对请求进一步封装，这样在调用的时候只需要传入参数即可
 */
import ajax from './ajax.js'
// 登陆
export  const reLogin = (username,password)=>{
    return ajax('/login',{username,password},'POST')
}
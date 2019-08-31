/**
 * 根据接口文档对请求进一步封装，这样在调用的时候只需要传入参数即可
 */
import ajax from './ajax.js'
// import jsonp from './fetch-jsonp.js'
import fetchJsonp from 'fetch-jsonp'

// 登陆
export  const reLogin = (username,password)=>{
    return ajax('/login',{username,password},'POST')
}
// 请求天气
export const weather = (city)=>{
    return new Promise((req,res)=>{
        const  url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=jsonp&ak=3p49MVra6urFRGOT9s8UBWr2`
        fetchJsonp(url).then(res=>res.json()).then(data=>{
            console.log(data)
            res(data)
        }).catch(err=>{
            console.log('JSONP()',err)
        })
    })
    
    
}

/**
 * 封装一个ajax，用来发送ajax请求
 * 对请求失败进行了统一的处理
 */
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
        let promise 
        if(type==='GET'){
            promise= axios.get(url,{
                params:data
            })
          }else{
              // axios方法返回值是一个promise
              promise=axios.post(url,data)
          }   
          promise.then(response=>{
             resolve(response.data) // 数据
          }).catch(err=>{
            message.error(err.message)
          })
    })
    
}
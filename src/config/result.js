import {message} from 'antd'

export default function resultHandle (result,succMsg,errMsg){
    if(result.status===0){
        message.success(succMsg)
        return result.data
    }else{
        message.error(errMsg)
    }
}
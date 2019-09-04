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

// 获取一级分类
export const category = (parentId)=>{
    return ajax('/manage/category/list',{parentId},'GET')
}
// 添加一级分类
export const addCategory = (parentId,categoryName)=>{
    return ajax('/manage/category/add',{parentId,categoryName},'POST')
}

//更新分类数据
export const updateEditCategory = (categoryId,categoryName)=>{
    return ajax('/manage/category/update',{categoryId,categoryName},'POST')
}
// 获取商品列表数据
 export const getGoodsList = (pageNum,pageSize)=>{
    return ajax('/manage/product/list',{pageNum,pageSize},'GET')
 }

 //获取搜索产品分页列表数据 搜索分为按照描述搜或者按着分类搜索
 export const getSearchList =({pageNum ,pageSize,productName,productDesc})=>{
    return ajax('/manage/product/search',{
        pageNum,
        pageSize,
        // 把一个变量的值当做属性，需要在这个变量的外边套上一个[]
        [productName]:productDesc // productName的值为两个productName/productDesc
    },'GET')
 }

//  根据分类ID获取分类
export const getCategoryById=(categoryId)=>{
    return ajax('/manage/category/info',{categoryId},'GET')
}

// 对商品进行上架/下架处理
export const updateStatus=(productId,status)=>{
    return ajax('/manage/product/updateStatus',{productId,status},'POST')
}

// 删除图片
export const deletePicture=(name)=>{
    return ajax('/manage/img/delete',{name},'POST')
}
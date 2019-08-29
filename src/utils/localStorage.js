import store from 'store'
export default {
    getUser(){
        // 读取本地的数据
        try{
            // var user =  JSON.parse(localStorage.getItem('user')||'{}')
            return store.get('user')||{}
             
          }catch(err){
            console.log(err.message,'您的浏览器可能没有开启缓存')
          }
    },
    saveUser(data){
        try{
            store.set('user', data)
            // localStorage.setItem('user',JSON.stringify(data))
          }catch(err){
            console.log(err.message,'您的浏览器可能没有开启缓存')
          }
    },
    removeUser(){
        try{
            // localStorage.removeItem('user')
            store.remove('user')
        }catch(err){
            console.log(err.message,'您的浏览器可能没有开启缓存')
        }
    }
}
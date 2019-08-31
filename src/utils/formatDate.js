export const formatDate=(date)=>{
    const year  = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours()
    const minutes = date.getMinutes()
    let second = date.getSeconds()
    if(second<10){
        second =`0${second}`
    }
   
    return `${year}年-${month}月-${day}日-${hour}时:${minutes}分:${second}秒`
}
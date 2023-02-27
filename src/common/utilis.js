//防抖/节流操作
export function debounce(func,delay=50){
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {

      func.apply(this,args)
    },delay)
  }
}
//正则表达式 字符串匹配
//时间格式化
export function formatDate(date,fmt) {
  //1.获取年份 y+的意思是：匹配1个到多个y (y+)的意思是：y+匹配到的内容可能通过分组来取到，这里是通过第一个分组取到。从后面的代码中可以看出，RegExp.$1就是取到的y+匹配到的内容
  // substr()方法返回一个字符串中从指定位置开始到指定字符数的字符
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
  };
  for (let k in o)

    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;

};

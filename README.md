# **Head-lines（头条新闻）**

# 一、概述

headlines仿照今日头条项目，整体采用flex布局方式。

前端技术：基于vue2框架，vuex与vuex-router。JS（ES6）、CSS 和 H5。发送请求使用封装后的axios。

后端技术：采用nodeJS中express模块开发搭建的服务，项目所需接口均来自这里。

数据库：MySQL。

# 二、全局配置

对vue-router上的push进行重新写如下：

```js
// 获取vue-router原型上的push()
const originalPush = VurRouter.prototype.push
// 修改原型上的push()
VueRouter.prototype.push = function push(location){
    return originalPush.call(this,location).catch(e=>e)
}
```

对axios进行二次封装，主要代码如下：

```js
//请求拦截器
axios.interceptors.request.use(config=>{
    //在请求之前，对需要的接口，添加token认证
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization=token)
    return config
},error=>Promise.reject(error)})
//响应拦截器
axios.interceptors.response.use(response=>Promise.resolve(response),error=>{
    if(error.response){//对各种失败状态操作}
    else{//请求失败进行操作}
    return Promise.reject(error)
})
export default axios
```



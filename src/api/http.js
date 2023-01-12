import qs from 'querystringify'
import axios from 'axios'
// 根据不同环境，使用不同接口
switch (process.env.NODE_ENV) {
    case 'development':
        axios.defaults.baseURL = 'http://localhost:5500'
        break;
    case 'test':
        axios.defaults.baseURL = 'http://localhost:2000'
        break;
    case 'production':
        axios.defaults.baseURL = 'http://bingwuhu.3vzhuji.cc'
        break;
}
// 配置默认设置
axios.defaults.timeout = 3000
axios.defaults.withCredentials = true
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)
// 配置请求拦截器

axios.interceptors.request.use(config => {
    // 添加Token认证
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
}, error => Promise.reject(error))
// 配置响应拦截器
axios.interceptors.response.use(response => Promise.resolve(response), error => {
    const { request, response } = error
    if (response) { //请求成功，服务器响应数据，但状态码非2xx
        switch (response.status) {
            case 401:
                // 需要token认证
                console.log('need token')
                break
            case 403:
                // token认证过期
                console.log('token exprised')
                break
            case 404:
                console.log('Not Found')
                break;
        }
    } else if (request) {   //请求成功，但未响应数据

    } else {    //请求失败
        console.log('Error', error.message)
        if (!window.navigator.onLine) {
            // 断网：可以跳转到断网页面
            return
        } else Promise.reject(error)
    }
})
export default axios
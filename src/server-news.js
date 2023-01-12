const express = require('express')
const cors = require('cors')
const session = require('express-session')
const { expressjwt } = require('express-jwt')
const router = require('./router-news')
const app = express()

const secretkey = '~@bing^wuhu@~'
// app.use(cors())
// 全局中间件 解决跨域
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Methods', '8')
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept,Content-Length,X-Request-With')
	res.header('Access-Control-Allow-Credentials', 'true')
	if (req.method === 'OPTIONS') res.sendStatus(200).end()
	else next()
})
// 配置session全局中间件
// app.use(session({
// 	secret:secretkey,
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {
// 		maxAge: 1000 * 60 * 3,//有效时间
// 		secure: false //https 开启
// 	}
// }))

配置expressJWT全局中间件: 还原加密的Token
app.use(expressjwt({
	secret: secretkey,
	algorithms: ['HS256']
}).unless({ path: /^\/news\/api\// })) // 以 /news/api/ 开头无需token认证

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/news', router)

app.listen(5500, err => {
	if (err) return err
	console.log('http://localhost:5500');
})
module.exports.secret = secretkey
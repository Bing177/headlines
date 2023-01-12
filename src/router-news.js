const express = require('express')
const jwt = require('jsonwebtoken')
const { showTableInfo, returnhotsearch, insertUserInfo } = require('./headlines-mysql')
const router = express.Router()
const secretkey = require('./server-news')
//获取头像
router.get('/api/user/avatar', (req, res) => {
    res.send('https://s1.ax1x.com/2023/01/03/pSioJ6H.png').end()
})
//登录
router.post('/api/user', (req, res) => {
    const { nickname, phone, avatar } = req.body
    insertUserInfo(nickname, phone, avatar).catch(e => res.send(e))
    let token = jwt.sign({ nickname, phone }, secretkey.secret, { expiresIn: '1h' })
    res.send({
        status: 200,
        msg: 'login success',
        token: 'Bearer ' + token
    }).end()

})
// 获取用户信息
router.get('/get/user', (req, res) => {
    res.send({
        status: 200,
        msg: '已登录',
        info: req.auth
    })
})
//退出
router.get('/api/quit', (req, res) => {
    req.session.destroy()
    res.send({ status: 0, msg: '退出登录' }).end()
})
//获取用户获赞、粉丝和关注信息
router.get('/api/user/charm', async (req, res) => {
    try {
        const data = await showTableInfo('user')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//导航栏
router.get('/api/navs', async (req, res) => {
    try {
        const data = await showTableInfo('navigatorbar')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//头条热搜
// （1）通过客户端参数来限制每次返回多少条新闻
/* router.post('/hotsearch', async (req, res) => {
    try {
        let currentPage = parseInt(req.body.page)//当前页
        const data = await showTableInfo('hotsearch')
        let total = data.length //获取热搜表中所有数据长度
        let pageSize = parseInt(req.body.pageSize)//一次返回多少条数据
        let size = Math.ceil(total / pageSize)
        let t = currentPage % size
        let newLists = []
        if (t * pageSize + pageSize - 1 <= total)
            newLists = data.slice(t * pageSize, t * pageSize + pageSize)
        else
            newLists = data.slice(t * pageSize, total)
        res.send(newLists)
    } catch (error) {
        res.send(error)
    }
}) */
// （2）通过mysql进行分页来限制每次返回的数据
router.post('/api/hotsearch', async (req, res) => {
    try {
        const data = await returnhotsearch('hotsearch', req.body.page, req.body.pageSize)
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//关注
router.post('/api/attention', async (req, res) => {
    try {
        const data = await showTableInfo('attention')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//推荐
router.post('/api/recommend', async (req, res) => {
    try {
        const data = await showTableInfo('recommend')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//科技
router.post('/api/technology', async (req, res) => {
    try {
        const data = await showTableInfo('technology')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
// 热点
router.post('/api/hot', async (req, res) => {
    try {
        const data = await showTableInfo('hot')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//国际
router.post('/api/international', async (req, res) => {
    try {
        const data = await showTableInfo('international')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//娱乐
router.post('/api/recreation', async (req, res) => {
    try {
        const data = await showTableInfo('recreation')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//美食
router.post('/api/cate', async (req, res) => {
    try {
        const data = await showTableInfo('cate')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})
//游戏
router.post('/api/game', async (req, res) => {
    try {
        const data = await showTableInfo('game')
        res.send(data).end()
    } catch (error) {
        res.send(error).end()
    }
})

//验证码
router.get('/api/login/getcode', (req, res) => {
    const lowercaseArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const uppercaseArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const numberArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let flg;
    let code = ''
    let codeLength = req.query.codeLength
    for (let i = 0; i < codeLength; i++) {
        flg = Math.floor(Math.random() * 3)
        if (flg === 0) {
            code += lowercaseArray[Math.floor(Math.random() * 26)]
        }
        else if (flg === 1) {
            code += uppercaseArray[Math.floor(Math.random() * 26)]
        }
        else {
            code += numberArray[Math.floor(Math.random() * 10)]
        }
    }
    res.send(code).end()
})

module.exports = router
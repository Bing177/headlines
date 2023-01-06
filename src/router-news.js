const express = require('express')
const { showTableInfo, returnhotsearch, insertUserInfo } = require('./headlines-mysql')
const router = express.Router()

//获取头像
router.get('/user/avatar', (req, res) => {
    res.send('https://s1.ax1x.com/2023/01/03/pSioJ6H.png')
})
//获取用户，用于登录后将信息插入数据库中
router.post('/user', async (req, res) => {
    const { nickname, phone, avatar } = req.body
    try {
        const result = await insertUserInfo(nickname, phone, avatar)
        res.send(result)
    } catch (error) {
        res.send(error)
    }

})
//获取用户获赞、粉丝和关注信息
router.get('/user/charm', async (req, res) => {
    try {
        const data = await showTableInfo('user')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//导航栏
router.get('/navs', async (req, res) => {
    try {
        const data = await showTableInfo('navigatorbar')
        res.send(data)
    } catch (error) {
        res.send(error)
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
router.post('/hotsearch', async (req, res) => {
    try {
        const data = await returnhotsearch('hotsearch', req.body.page, req.body.pageSize)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//关注
router.post('/attention', async (req, res) => {
    try {
        const data = await showTableInfo('attention')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//推荐
router.post('/recommend', async (req, res) => {
    try {
        const data = await showTableInfo('recommend')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//科技
router.post('/technology', async (req, res) => {
    try {
        const data = await showTableInfo('technology')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
// 热点
router.post('/hot', async (req, res) => {
    try {
        const data = await showTableInfo('hot')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//国际
router.post('/international', async (req, res) => {
    try {
        const data = await showTableInfo('international')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//娱乐
router.post('/recreation', async (req, res) => {
    try {
        const data = await showTableInfo('recreation')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//美食
router.post('/cate', async (req, res) => {
    try {
        const data = await showTableInfo('cate')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//游戏
router.post('/game', async (req, res) => {
    try {
        const data = await showTableInfo('game')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

//验证码
router.get('/login/getcode', (req, res) => {
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
    res.send(code)
})

module.exports = router
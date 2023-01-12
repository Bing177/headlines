const { createConnection } = require('mysql')
const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'headlines'
})
//连接测试
db.query('select 1', (err, res) => {
    if (err) console.log(err)
    console.log('数据库headlines--连接成功')
})
// 获取数据库中表的信息
async function showTableInfo(tableName) {
    const sql = `select * from ${tableName}`
    let data = await new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
    /* 将data中img转数组 */
    // 1.创建一个临时数组，存储img
    const imgs = data.map(item => {
        if (item.img) return item.img.split(',')
    })
    // 2.截取imgs不为空的字段并返回原数组
    let idx = imgs.findIndex(v => { if (v) return v })
    imgs.splice(0, idx)
    // 3.通过reduce()处理data
    data.reduce((preV, curV, curIdx) => {
        if (curV.img) curV.img = imgs[curIdx - idx]
    }, idx)
    return data
}
//返回热搜数据
async function returnhotsearch(tableName, index, maxnum) {
    const total = await new Promise((resolve, reject) => {
        db.query(`select * from ${tableName}`, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
    let t = Math.ceil(total.length / maxnum)
    let r = index % t
    index = r * maxnum
    const sql = `select * from ${tableName} limit ${index}, ${maxnum}`
    let data = await new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
    return data
}

//插入/更新用户信息
async function insertUserInfo(nickname, phone, avatar) {
    //判断user表中是否已有用户
    let userNum = await new Promise((resolve, reject) => {
        db.query('select * from user', (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
    //没有，则添加
    if (!userNum.length) {
        let sql = `insert into user values(null,'${nickname}',${phone},'${avatar}',default,default,default)`
        let data = await new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
        return data
    }
    //有，则更新
    else {
        let sql = `update user set nickname='${nickname}',phone=${phone},avatar='${avatar}'`
        let data = await new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
        return data
    }

}

// 统一暴露
module.exports = {
    showTableInfo,
    returnhotsearch,
    insertUserInfo
}
const express = require('express')
const qs = require('querystring')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/news/navs', (req, res) => {
	const navs = [
		{
			id: 'n01',
			title: '关注',
			number: 'first',
			path: '/attent',
			content: 'attent'
		},
		{
			id: 'n02',
			title: '推荐',
			number: 'second',
			path: '/recommend',
			content: 'recommend'
		},
		{
			id: 'n03',
			title: '热门',
			number: 'third',
			path: '/hot',
			content: 'hot'
		},
		{
			id: 'n04',
			title: '娱乐',
			number: 'fourth',
			path: '/recreate',
			content: 'recreate'
		},
		{
			id: 'n05',
			title: '军事',
			number: 'fifth',
			path: '/military',
			content: 'military'
		},
		{
			id: 'n06',
			title: '教育',
			number: 'sisth',
			path: '/educate',
			content: 'educate'
		},
		{
			id: 'n07',
			title: '体育',
			number: 'seventh',
			path: '/sport',
			content: 'sport'
		},
	]
	res.send(navs)
})
app.all('/news/hot_search', (req, res) => {
	const lists = [
		{ id: 'h01', title: '抗原检测为什么往往在发烧后才阳性，' },
		{ id: 'h02', title: '新华制药：生产车间正加班生产药品' },
		{ id: 'h03', title: '北方疫情持续时间预计长于南方' },
		{ id: 'h04', title: '因凡蒂诺：世俱杯改制后有32队参赛' },
		{ id: 'h05', title: '120每天呼入3万次 有老人没能等到' },
		{ id: 'h06', title: '郑州疫情还未到高峰期' },
		{ id: 'h07', title: '武磊：阿根廷全队在为梅西圆梦' },
		{ id: 'h08', title: '“阳”了以后家里东西怎么办' },
		{ id: 'h09', title: '感染新冠后发烧捂被子出汗可取吗' },
		{ id: 'h10', title: '留英博士1年内4次感染新冠' },
		{ id: 'h11', title: '六个字看中国经济2022' },
		{ id: 'h12', title: '专家：有医院发生群体感染和医疗挤兑' },
		{ id: 'h13', title: '钟南山：“阳过”之后谁会“再阳”' },
		{ id: 'h14', title: '一天 24小时 中国和世界怎样连接' },
		{ id: 'h15', title: '法国又有两大主力倒下 5人感染病毒' },
		{ id: 'h16', title: '中央经济工作会议在北京举行' },
		{ id: 'h17', title: '男子烧死妻子被儿子举报 一审获死刑' },
		{ id: 'h18', title: '坠落浙江火流星为46亿年天外陨石' },
		{ id: 'h19', title: '骗子诈骗1250万买彩票中1450万' },
		{ id: 'h20', title: '男子39.4度体温计刚放脖子就上升' },
		{ id: 'h21', title: '明年经济工作怎么干 四个关键词定调' },
		{ id: 'h22', title: '专家支招新冠感染后如何科学饮食' },
		{ id: 'h23', title: '业内：医护减员超6成 回升需1个月' },
		{ id: 'h24', title: '直面疫情不恐慌 科学应对稳心态' },

	]
	let currentPage = parseInt(req.query.page);
	let total = lists.length;
	let pageSize = parseInt(req.query.pageSize);
	let size = Math.ceil(total / pageSize) // 可以分多少页 算出 3 页
	let t = currentPage % size // 0 1 2
	let newLists = []
	if (t * pageSize + pageSize - 1 <= total)
		newLists = lists.slice(t * pageSize, t * pageSize + pageSize)
	else
		newLists = lists.slice(t * pageSize, total)
	res.send(newLists)
})
app.post('/news/recommend', (req, res) => {
	const recommendList = [
		{ id: 'r01', title: '关键是提振信心', operation: '置顶', publisher: '人民日报', type: '', comment: '4327条评论', timeout: '3小时前', img_url: [], flg: false },
		{ id: 'r02', title: '中央经济工作会议精神引起热烈反响', operation: '置顶', publisher: '央视网', type: '', comment: '43462条评论', timeout: '3小时前', img_url: [], flg: false },
		{ id: 'r03', title: '赢得时间，就是赢的生命', operation: '置顶', publisher: '新华社', comment: '6523条评论', timeout: '21小时前', img_url: [], flg: false },
		{ id: 'r04', title: '新时代征程，新伟业', operation: '', publisher: '', type: '热点专题', comment: '8条评论', timeout: '11月21日', img_url: [], flg: false },
		{ id: 'r05', title: '健康中国 | 疫情期间，怎么吃更科学？', operation: '', publisher: '', type: '热点专题', comment: '', timeout: '19小时前', img_url: [], flg: false },
		{ id: 'r06', title: '世界杯决赛终极预测来了！阿根廷，还是法国？', operation: '', publisher: '台海网', type: '热点专题', comment: '', timeout: '8小时前', img_url: ['https://s1.ax1x.com/2022/12/18/zqi9e0.jpg'], flg: true },
		{ id: 'r07', title: '公安提醒：所有做核酸检测没出结果的人！注意！最新混检阳性诈骗！', operation: '', publisher: '七台河检察', type: '', comment: '893条评论', timeout: '4天前', img_url: ['https://s1.ax1x.com/2022/12/18/zqimO1.jpg', 'https://s1.ax1x.com/2022/12/18/zqiKw6.jpg', 'https://s1.ax1x.com/2022/12/18/zqiMTK.jpg', 'https://s1.ax1x.com/2022/12/18/zqi1YD.jpg'], flg: true },
		{ id: 'r08', title: '丈夫出租屋发现大量计生用品，随代替她成为了别人口中的“老板娘”？', operation: '', publisher: '寻情记官方号', type: '', comment: '1979条评论', timeout: '11月26日', img_url: ['https://s1.ax1x.com/2022/12/18/zqiW7V.jpg', 'https://s1.ax1x.com/2022/12/18/zqi4tU.jpg', 'https://s1.ax1x.com/2022/12/18/zqi5hF.jpg', 'https://s1.ax1x.com/2022/12/18/zqiop4.jpg'], flg: true },
		{ id: 'r09', title: '北京感染人数激增，这一次是专家太乐观，还是开发的有些“早”', operation: '', publisher: '布衣小农人', type: '', comment: '', timeout: '4小时前', img_url: [], flg: false },
		{ id: 'r10', title: '“6战5胜”！法国总统现身世界杯决赛，一图回顾法国队晋级之路', operation: '置顶', publisher: '九派新闻', type: '', comment: '', timeout: '4小时前', img_url: ['https://s1.ax1x.com/2022/12/18/zqixhD.jpg'], flg: true },
		{ id: 'r11', title: '预计1个月内到达感染峰值，张文宏作出重大告知，千万别不听劝', operation: '', publisher: '李越峰lyf', type: '', comment: '1016条评论', timeout: '5天前', img_url: ['https://s1.ax1x.com/2022/12/18/zqFm9g.jpg', 'https://s1.ax1x.com/2022/12/18/zqFKjs.jpg', 'https://s1.ax1x.com/2022/12/18/zqFQun.jpg', 'https://s1.ax1x.com/2022/12/18/zqFlBq.jpg'], flg: true },
		{ id: 'r12', title: '一票难求！英国小哥体验中国最高级火车', operation: '', publisher: '司徒建国秀', type: '', comment: '2796条评论', timeout: '11月4日', img_url: ['https://s1.ax1x.com/2022/12/18/zqFN34.jpg'], flg: true },
		{ id: 'r13', title: '搞笑经典小品戒杠', operation: '置顶', publisher: '精彩壹刻星', type: '', comment: '4条评论', timeout: '11小时前', img_url: ['https://www.toutiao.com/video/7178286549870576185/'], flg: true },
	]
	res.send(recommendList)
})
app.listen(5500, err => {
	if (err) return err
	console.log('http://localhost:5500');
})

 # 创建数据库 headlines
 create database headlines;

 # 使用数据库headlines
 use headlines;

 # 创建表navigatorbar
 create table navigatorbar(
    id int primary key auto_increment comment '导航栏id',
    title varchar(10) comment '标题'
 )comment '导航栏表';
 # 插入信息
 insert into 
    navigatorbar 
 values
    (null,'关注'),
    (null,'推荐'),
    (null,'科技'),
    (null,'热点'),
    (null,'国际'),
    (null,'娱乐'),
    (null,'美食'),
    (null,'游戏');

# 创建表hotsearch
create table hotsearch(
    id int primary key auto_increment,
    title varchar(1000),
    hot tinyint(1) default 0,
    latest tinyint(1) default 0
)comment '热搜表';
# 插入信息
insert into 
    hotsearch
values
    (null,'习近平的新年寄望',1,0),
    (null,'研究：XBB.1.5毒株致病性或未增强',1,0),
    (null,'老人去世比往年多很多？专家释疑',1,0),
    (null,'年度前瞻 中国将带来新发展机遇',default,default),
    (null,'秦刚与美国务卿布林肯通话“告别”',1,0),
    (null,'应对新冠要囤蒙脱石散？专家释疑',1,0),
    (null,'最艰难时光还要熬多久？卫健委回应',1,0),
    (null,'专家：此轮高峰后病毒会逐渐传不动',default,default),
    (null,'中国将面临多波感染高峰？专家回应',default,default),
    (null,'金正恩：将加大核武器保有量',default,default),
    (null,'专家谈为何做足准备仍感觉猝不及防',default,default),
    (null,'第三、四套人民币设计者侯一民逝世',default,default),
    (null,'专家：此轮高峰后病毒会逐渐传不动',default,default),
    (null,'2023年第一轮油价调整将开启',default,default),
    (null,'日方炒作首次发现中国无侦-7无人机',default,default),
    (null,'网红嘎羊少女自曝结婚生女遭家暴',default,default),
    (null,'中国将面临多波感染高峰？专家回应',1,default),
    (null,'河北一景区辟谣“6名阳康游客死亡”',default,default),
    (null,'金正恩称超大型火箭炮射程覆盖全韩',default,default),
    (null,'靳东新剧《纵有疾风起》首播口碑',default,default),
    (null,'专家谈为何做足准备仍感觉猝不及防',default,default),
    (null,'“改革先锋”胡福明逝世 享年87岁',default,default),
    (null,'感染高峰已过 村医称很少有人上门',default,default),
    (null,'俄乌再次交换被俘军人',default,1),
    (null,'乌克兰称俄军战术发生变化',default,1),
    (null,'靳东新剧《纵有疾风起》首播口碑',default,default),
    (null,'靳东在《纵有疾风起》的状态如何',default,default),
    (null,'北京就诊高峰下的急诊不眠夜',default,default),
    (null,'新能源补贴结束 各家新车调价汇总',default,1),
    (null,'梅西跨年穿的GUCCI衬衫已售罄',0,0);

# 创建关注表
create table attention(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000) default null,
    flg tinyint(1) default 0,
    constraint fk_attention_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '关注表';


# 创建推荐表
create table recommend(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_recommend_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '推荐表';
insert into
recommend
values
(null,2,'时政专题片丨非凡的领航2022',1,null,0,null,0,null,null,0),
(null,2,'全面贯彻党的二十大精神的科学指引',1,null,0,null,0,null,null,0),
(null,2,'江苏：推动新项目落地生根',1,null,0,null,0,null,null,0),
(null,2,'经济总量第一大省广东勇挑大梁观察',0,null,0,null,0,null,null,0),
(null,2,'健康中国丨应对新冠病毒，囤药不如囤“好身体”',0,null,0,null,0,null,null,0),
(null,2,'山东钢铁获“2022上市公司董办优秀实践”奖',0,'大众日报',0,'5条评论',0,'6天前',null,0),
(null,2,'小偷入户盗窃被女子放鞭炮吓死，家属索赔50万，法院判决大快人心',0,'青海普法',default,'2325条评论',default,'2022年12月07日','https://www.helloimg.com/images/2023/01/02/oC0UmY.jpg',1),
(null,2,'2023年一开始，两个难得的好消息',0,'牛弹琴',0,'1944条评论',0,'6小时前','https://www.helloimg.com/images/2023/01/02/oC0kYX.jpg,https://www.helloimg.com/images/2023/01/02/oC0VXg.jpg,https://www.helloimg.com/images/2023/01/02/oC0Y2M.jpg,https://www.helloimg.com/images/2023/01/02/oC0fKP.jpg',1),
(null,2,'农村宅基地管理新政：“三不批、四禁止，两不得”',0,'宝鸡政法',0,'791条评论',0,'2022年12月07日','https://www.helloimg.com/images/2023/01/02/oC0jo6.jpg',1),
(null,2,'“阳了”以后，这七天我经历了什么……',0,'郑州科协',0,'496条评论',0,'2022年12月17日','https://www.helloimg.com/images/2023/01/02/oC0uin.jpg,https://www.helloimg.com/images/2023/01/02/oC0yzR.jpg,https://www.helloimg.com/images/2023/01/02/oCNB5z.jpg,https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/795dc2f0786f44828f5059b44c48a2a1~tplv-tt-cs0:1000:5997.jpg?_iz=31826&from=feed&x-expires=1673940990&x-signature=VrIqQma7GkuHig9DgiM7dHvMGk8%3D',1),
(null,2,'今年首轮冷空气来袭 最低气温跌至4.8℃ 最新广东天气预报',0,'闽南网',0,null,0,'40分钟前','https://www.helloimg.com/images/2023/01/02/oCNRY0.jpg',1),
(null,2,'很多人疑惑：防疫三年，为什么说放开就放开？',0,'小芸说谈',0,'35条评论',0,'6天前','https://www.helloimg.com/images/2023/01/02/oCNF2h.jpg,https://www.helloimg.com/images/2023/01/02/oCNPKc.jpg,https://www.helloimg.com/images/2023/01/02/oCN1Fq.jpg,https://www.helloimg.com/images/2023/01/02/oCN3ir.jpg',1);

# 创建表technology
create table technology(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_technology_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '科技表';
insert into
technology
values
(null,3,'新冠病毒已经找到多种动物宿主',0,'爱京泽',0,'5条评论',0,'12小时前',null,0),
(null,3,'“大数据扫黄”要来了？符合以下特征要注意，你可能“涉黄”了！',0,'知产张',0,'1条评论',0,'7小时前',null,0),
(null,3,'老鼠变得越来越少了，为什么呢？老鼠“隐退”原因是什么？',1,'快乐的小透明',0,'405条评论',0,'2022年12月15日',null,0),
(null,3,'变异病毒“X B B1.5”入侵，专家亡我之心不死，引发新一轮抢药潮',1,'夜魔猎人',0,'1251条评论',0,'12小时前','https://s1.ax1x.com/2022/12/26/zxDYh4.jpg',1),
(null,3,'布洛芬贵的和便宜的，到底有啥区别？',0,'肃州融媒',0,'58条评论',0,'2022年12月22日','https://s1.ax1x.com/2023/01/02/pSPdh1e.jpg',1),
(null,3,'微信一定要关闭的6个设置',0,'卢松松',0,'107条评论',0,'2022年10月21日','https://s1.ax1x.com/2023/01/02/pSPd5Xd.jpg',1),
(null,3,'马斯克的脸，被一个中国人打肿了！',0,'功夫财经',0,'112条评论',0,'3天前','https://s1.ax1x.com/2023/01/02/pSPdonA.jpg',1);

# 创建热点表
create table hot(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_hot_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '热点表';
insert into 
hot
values
(null,4,'时政微周刊丨总书记的一周',1,null,0,null,0,null,null,0),
(null,4,'习近平“新年金句”暖心提气',1,null,0,null,0,null,null,0),
(null,4,'2023·贺词里的中国力量',1,null,0,null,0,null,null,0),
(null,4,'因为低估奥密克戎的影响，上海专家道歉了，承认预测失误',0,'坚持一下吧9',0,'125条评论',0,'6小时前',null,0),
(null,4,'专家：三种人不容易感染新冠，你是其中的“天选之子”吗？',0,'内科讲师王大夫',0,'14条评论',0,'5小时前',null,0),
(null,4,'澳洲热烈欢迎中国旅客！卫生部长解释入境新规：必须保护澳人健康',0,'澳洲财经见闻',0,'119条评论',0,'10小时前','https://s1.ax1x.com/2023/01/02/pSPw97q.jpg',1),
(null,4,'“阳康”后的四忌与四宜，早了解早受益',0,'职言心语',0,'8条评论',0,'8小时前','https://s1.ax1x.com/2023/01/02/pSPwnBR.jpg',1);

# 创建国际表
create table international(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_international_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '国际表';
insert into 
international
values
(null,5,'36年前，一艘苏联核潜艇在百慕大附近沉没，携带的核弹头离奇消失了……',0,'上观新闻',0,'78条评论',0,'2022年10月14日',null,0),
(null,5,'人民币快成为硬通货了吗？俄美两国民间对人民币态度对比',0,'复兴花园',0,'224条评论',0,'2022年12月01日',null,0),
(null,5,'中国叫俄罗斯“战斗民族”，俄罗斯是怎么叫我们的？',0,'人间史名人录',0,'285条评论',0,'2022年10月25日',null,0),
(null,5,'本·拉登：美国苦寻10年才将其击毙，拉登之死为何疑点重重？',0,'束浩读史',0,'91条评论',0,'2022年10月17日',null,0),
(null,5,'这几天似乎心系中美关系的人越来越多，喊打喊杀的声音此起彼伏。这些人就真的这么想打仗？那倒不如把这些人的名字都记在一个小本本上，等到那一天就首先派这些人上。不过话又说回来，对于这个问题我来说说自己的看法。我个人认为美国和中国开打根本用不到武器。一个经济战就能让国内乱套，这并不是我乱说，正是因为我爱国，所以才想让别人知道，打仗是不可能让你拎起枪就能赢得的战争。',0,'雷哥频道',1,'3324条评论',1,'5小时前','https://s1.ax1x.com/2023/01/02/pSP0Prd.jpg',1),
(null,5,'美国政客急了：这是中国毒害美国的“精神鸦片”',0,'环球时报',0,'1631条评论',0,'7小时前','https://s1.ax1x.com/2023/01/02/pSP0kVI.jpg',1);

# 创建娱乐表
create table recreation(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_recreation_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '娱乐表';
insert into
recreation
values
(null,6,'宁静情史：从小就是美人胚子，混娱乐圈却没有导演敢潜规则',0,'万小刀',0,'6048条评论',0,'2022年11月08日','https://s1.ax1x.com/2022/12/25/zvvGv9.jpg,https://s1.ax1x.com/2022/12/25/zvvf58.jpg,https://s1.ax1x.com/2022/12/25/zvvI2Q.jpg,https://s1.ax1x.com/2022/12/25/zvv7Ks.jpg',1),
(null,6,'《阿凡达2》》上映第三周实现逆跌 北美全年票房74亿美元 同比上涨6成',0,'1905电影网',0,'125条评论',0,'12小时前','https://s1.ax1x.com/2022/12/25/zvvbbq.jpg',1),
(null,6,'赌神：高进玩得最大的一把，十五亿美金直接梭哈，龙五直接看懵了',0,'乐视爱豆剧集园',0,'32条评论',0,'2022年12月18日','https://s1.ax1x.com/2022/12/25/zvvX5T.jpg,https://s1.ax1x.com/2022/12/25/zvvvPU.jpg,https://s1.ax1x.com/2022/12/25/zvvz24.jpg,https://s1.ax1x.com/2022/12/25/zvx9M9.jpg',1),
(null,6,'华少采访张家辉，一句话让张家辉翻脸，怒斥：你要清楚自己的身份！',0,'谈资影视',1,'3974条评论',1,'1年前','https://s1.ax1x.com/2022/12/25/zvxtzQ.jpg,https://s1.ax1x.com/2022/12/25/zvxoFK.jpg,https://s1.ax1x.com/2022/12/25/zvx7WD.jpg,https://s1.ax1x.com/2022/12/25/zvxOOA.jpg',1),
(null,6,'关注电影节！王宝强亮相电影节闭幕式红毯 现场气氛瞬间沸腾出席红毯仪式。当天,王宝强一身深色西装沉稳有型,一亮相便引起众人欢呼,现场一下子沸腾了。他在接受媒体采访时说:“马上新的一年,提前祝大加新年快乐。',0,'北青网',1,'45条评论',1,'9天前','https://s1.ax1x.com/2022/12/25/zxCSBj.jpg,https://s1.ax1x.com/2022/12/25/zxCkCV.jpg',1),
(null,6,'现实版珠光宝气：这一家子假名媛，全嫁进了真豪门？',0,'不二茶茶',0,'292条评论',0,'前天16:22','https://s1.ax1x.com/2022/12/25/zxCnb9.jpg',1),
(null,6,'潘长江:被央视警告仍死不悔改，继续欺骗观众，真的是没救了?',0,'搜狐网',0,null,0,'5天前','https://s1.ax1x.com/2022/12/25/zxCBPP.jpg',1);

# 创建美食表
create table cate(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(10),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_cate_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '美食表';
insert into
cate
values
(null,7,'24款家常营养汤——秋冬暖胃又补钙！',0,'小梦聊美食',0,'38条评论',0,'2022年12月09日','https://s1.ax1x.com/2023/01/02/pSP6DdH.jpg',1),
(null,7,'水果这样熟着吃，养脾胃、止咳、降火……冬天正合适',0,'光明网',0,'48条评论',0,'前天08:34','https://s1.ax1x.com/2023/01/02/pSP66JI.jpg,https://s1.ax1x.com/2023/01/02/pSP62SP.jpg,https://s1.ax1x.com/2023/01/02/pSP6RQf.jpg,https://s1.ax1x.com/2023/01/02/pSP6Wy8.jpg',1),
(null,7,'一个人2小时，轻松搞定5菜1汤上桌就光盘，老公孩子夸我厨艺棒',0,'小慧今天说美食',0,'62条评论',0,'2022年12月09日','https://s1.ax1x.com/2023/01/02/pSP65wQ.jpg',1),
(null,7,'1根黄瓜，1节腊肠，简单一做，我家一周吃5次，孩子每次都吃光光',0,'美食强上墙',0,'882条评论',0,'2022年04月02日','https://s1.ax1x.com/2023/01/02/pSP6TFs.jpg',1),
(null,7,'秋天要多吃山药，加一块南瓜，自带甜味，出锅比蛋糕好吃，真解馋',0,'柚子爱吃',0,'254条评论',0,'2022年10月22日','https://s1.ax1x.com/2023/01/02/pSP6HWq.jpg',1),
(null,7,'豆腐乳，到底是“人间美味”还是“健康杀手”？研究结果已公布',0,'翟儒钧医生',0,'7条评论',0,'2022年12月04日','https://s1.ax1x.com/2023/01/02/pSP6qS0.jpg',1),
(null,7,'蒸馒头时，“开水蒸”和“冷水上锅”区别很大，学会再蒸不吃亏',0,'第一名厨',0,'126条评论',0,'2022年10月15日','https://s1.ax1x.com/2023/01/02/pSP6XOU.jpg,https://s1.ax1x.com/2023/01/02/pSP6zTJ.jpg,https://s1.ax1x.com/2023/01/02/pSPc9YR.jpg,https://s1.ax1x.com/2023/01/02/pSPcCf1.jpg',1);

# 创建游戏表
create table game(
    id int primary key auto_increment,
    nav_id int not null,
    title varchar(1000) not null unique,
    operate tinyint(1) default 0,
    publish varchar(15),
    share tinyint(1) default 0,
    comment varchar(255),
    praise int default 0,
    time varchar(11),
    img varchar(1000),
    flg tinyint(1) default 0,
    constraint fk_game_nav_id foreign key(nav_id) references navigatorbar(id)
)comment '游戏表';
insert into
game
values
(null,8,'源梦皮肤设计大赛|蒙犽皮肤创意鉴赏第二期，多款人气作品来袭！',0,'慕泽楠',0,null,0,'9小时前','https://s1.ax1x.com/2023/01/02/pSPcFl6.jpg',1),
(null,8,'【蛋仔派对】羊村寻宝蛋仔盲盒自选怎么抽取，来看这里？',0,'蛋仔攻略站',0,null,0,'昨天09:13','https://s1.ax1x.com/2023/01/02/pSPcAOO.jpg',1),
(null,8,'部落冲突：回顾2022年的时光，2023年不见不散',0,'北辰远COC',0,null,0,'前天19:00','https://www.helloimg.com/images/2023/01/02/oCN0CR.jpg,https://www.helloimg.com/images/2023/01/02/oCNNtz.jpg,https://www.helloimg.com/images/2023/01/02/oCNQwA.jpg,https://www.helloimg.com/images/2023/01/02/oCNph5.jpg',1),
(null,8,'突击手蜜獾：挑战新版水城20杀吃鸡，M200飞天狙，空中暗杀！',0,'突击手蜜獾',0,'394条评论',0,'2022年12月04日','https://www.helloimg.com/images/2023/01/02/oCN7q0.jpg',1),
(null,8,'查尔斯过来挨打，试试死神火炮！太爽了',0,'炮芯大怪',0,'506条评论',0,'3天前','https://www.helloimg.com/images/2023/01/02/oCNDWm.jpg',1),
(null,8,'百玩不厌且配置低的八款单机游戏',0,'快乐冲浪613',0,'185条评论',0,'2022年11月18日','https://www.helloimg.com/images/2023/01/02/oCNIUh.jpg,https://www.helloimg.com/images/2023/01/02/oCN8Pc.jpg,https://www.helloimg.com/images/2023/01/02/oCNKHq.jpg,https://www.helloimg.com/images/2023/01/02/oCNU7r.jpg',1),
(null,8,'植物大战僵尸：开局三个罐子？我发现了其中的内鬼【游戏自定义】',0,'猪哥游戏解说',0,'128条评论',0,'前天13:34','https://www.helloimg.com/images/2023/01/02/oCNkCT.jpg',1),
(null,8,'吕布：你别让我劈到你！',0,'吕布：你别让我劈到你！',0,'733条评论',0,'2022年12月29日','https://www.helloimg.com/images/2023/01/02/oCNr41.jpg',1);

 # 创建user表
 create table user(
    id int primary key auto_increment,
    nickname varchar(255) comment '昵称',
    phone varchar(11) comment '电话',
    avatar varchar(255) comment '头像',
    praise int unsigned default 0 comment '获赞',
    fan int unsigned default 0 comment '粉丝',
    attention int unsigned default 0 comment '关注'
 )comment '用户表';
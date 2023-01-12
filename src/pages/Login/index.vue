<template>
  <div class="box">
    <!-- 遮罩层 -->
    <div class="mask" ></div>
    <!-- 登录页面 -->
    <div class="login">
        <!-- 登录容器 -->
        <div class="container">
            <!-- 顶部区域 -->
            <div class="top">登录后内容更精彩
                <el-button 
                @click="quit" 
                type="info"
                plain 
                icon="el-icon-close" 
                size="mini" 
                circle
                >
                </el-button>
            </div>
            <!-- 中部登录内容 -->
            <div class="content">
                <!-- 左侧内容 -->
                <div class="left">
                    <span>手机登录</span>
                    <el-input
                    placeholder="请输入手机号"
                    v-model.trim.number="phone"
                    :clearable="true"
                    :maxlength="11"
                    show-word-limit
                    >
                        <template slot="prepend">+86</template>
                    </el-input>
                    <el-input
                    placeholder="验证码"
                    v-model.trim="code"
                    :maxlength="6"
                    >
                        <template slot="suffix">
                            <el-button @click="getCode" class="getCode" type="text">获取验证码</el-button>
                        </template>
                    </el-input>
                    <el-alert v-if="showError" :title="showErrorContent[index]" type="info"></el-alert>
                    <el-checkbox v-model="isAgree">登录即同意
                        <router-link style="color:#1B4187;" to="/abc">《用户协议》</router-link>
                        <router-link style="color:#1B4187;" to="/abc">《隐私政策》</router-link>
                    </el-checkbox>
                    <el-button @click="login" type="danger" :disabled="!isAgree">登录</el-button>
                </div>
                <!-- 右侧内容 -->
                <div class="right">
                    <span>扫码登陆</span>
                    <div class="code">
                    </div>
                </div>
            </div>
            <!-- 底部区域 -->
            <div class="footer">
                <span>其他登录方式</span>
                <el-button 
                @click="wechatLogin" 
                icon="el-icon-chat-dot-round" 
                size="medium" 
                circle 
                title="微信登录"
                ></el-button>
                <router-link to="/abc" title="qq登录"><img src="../../assets/QQ.png"/></router-link>
                <router-link to="/abc" title="支付宝登录"><img src="../../assets/pay.png"/></router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { mapState } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            nickname:'',
            phone: '',
            portrait: '',
            code: '',
            showError: false,
            isAgree: false,
            index:undefined,
            showErrorContent:['手机号不能为空','请输入正确的手机号','验证码输入有误','请勾选用户协议和隐私政策']
        }
    },
    computed: {
        ...mapState('sendcode',['verificationcode']),
        ...mapState('nav',['avatar'])
    },
    methods: {
        //退出
        quit() {
            this.$bus.$emit('logout', false)//与App组件通信
            this.$router.push({
                name:'tuijian'
            })
        },
        //随机生成13为数字，用于创建用户登录时的用户名
        getUsername() {
            return ('用户' + Math.random().toString().slice(3,15)) //随机获得13为数字字符串
        },
        //手机登录注册
        async login() {
            // axios.defaults.withCredentials = true // 配合session使用
            this.$axios.defaults.baseURL = 'http://localhost:5500'
            // 判断手机号是否输入为空
            if (this.phone) {
                const phoneStr = this.phone.toString()
                const phoneArray = phoneStr.split('')
                // 判断手机号是否一数字“1”开头，且长度为11
                if (phoneStr.length === 11 && phoneArray.indexOf('1') === 0) {
                    // 判断验证码是否输入正确
                    if (this.code === this.verificationcode) {
                        //#region  1.登录成功后，将信息通过session-cookie存储
                        // localStorage.setItem('phone', this.phone)
                        // this.nickname = this.getUsername()
                        // localStorage.setItem('nickname', this.nickname)
                        // this.$store.dispatch('nav/getAvatar').then(v => {
                        //     this.portrait = this.avatar
                        //     this.$axios.post('http://localhost:5500/news/api/user',
                        //     { nickname: this.nickname, phone: this.phone, avatar: this.portrait })
                        //     .catch(e=>{console.log(e.message)})
                        // }) 
                        //#endregion
                        
                        /* 2.登录成功后，将信息进行Token加密 */
                        try {
                            // 1.获取用户默认头像
                            this.portrait = await this.$store.dispatch('nav/getAvatar')
                            const res = await this.$axios.post('/news/api/user', {
                                nickname: this.getUsername(),
                                phone: this.phone,
                                avatar: this.portrait
                            })
                            // 将获取到的对象里的token存储到本地存储中
                            localStorage.setItem('token',res.data.token)
                        } catch (error) {
                            console.log(error)
                        } finally {
                            // 登陆后的操作
                            this.$bus.$emit('logout', false)//与App组件通信
                            this.$router.push({
                                name:'tuijian'
                            })
                        }
                    } else {
                        this.index = 2
                        this.showError = true
                        clearTimeout(this.codetimer)
                        this.codetimer = setTimeout(()=>{this.showError=false},3000)
                    }
                } else {
                    this.index = 1
                    this.showError = true
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.showError = false
                    },3000)
                }
            } else {
                this.index = 0
                this.showError = true
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.showError = false
                },3000)
            }
        },
        //微信登录
        wechatLogin() {
            if (!this.isAgree) {
                this.index = 3
                this.showError = true
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.showError = false
                },3000)
            } else {
                alert('去往微信登陆')
                this.quit()
            }
        },
        // 获取验证码
        getCode() {
            // 判断手机号是否输入为空
            if (this.phone) {
                const phoneStr = this.phone.toString()
                const phoneArray = phoneStr.split('')
                // 判断手机号是否以“1”开头，且长度为11
                if (phoneStr.length === 11 && phoneArray.indexOf('1') === 0) {
                    this.$store.dispatch('sendcode/getCode', 6)
                    clearTimeout(this.codetimer)
                    this.codetimer = setTimeout(() => {
                        MessageBox.alert(this.verificationcode, '验证码', {
                            confirmButtonText: '确定',
                            cb: action => {
                                MessageBox.$message({
                                    type: 'info',
                                    message:`action:${action}`
                                })
                            }
                        }) 
                    },100)
                } else {
                    this.index = 1
                    this.showError = true
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.showError = false
                    },3000)
                }
            } else {
                this.index = 0
                this.showError = true
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.showError = false
                },3000)
            }
        },
        
    },
    activated() {
    },
    deactivated() {
        
    }
}
</script>

<style lang="less" scoped>
.box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 180%;
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        background-color: #000;
        opacity: .7;
        z-index: 99;
    }
    
    .login{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10%;
        width: 650px;
        height: 415px;
        border-radius: 12px;
        overflow: hidden;
        z-index: 999;
        .container{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background-color: #e8e8e8;
            .top,.footer{
                flex: 1;
            }
            .top{
                border-bottom: 1px solid #dfdfdf;
                font-size: 20px;
                line-height: 60px;
                text-indent: 30px;
                .el-button{
                    margin-left: 400px;
                }
            }
            .content{
                flex:5;
                display: flex;
                flex-direction: row;
                .left{
                    display: flex;
                    flex-direction: column;
                    width: 354px;
                    justify-content: space-around;
                    border-right: 1px solid #d8d8d8;
                    span{
                        font-size: 20px;
                        padding: 5px;
                        padding-left: 10%;
                        text-indent: 3px;;
                    }
                    .el-input{
                        width:80%;
                        margin-left: 10%;
                        .getCode{
                            margin-left:18px; 
                            color:#4E4E4E;
                            :hover{
                                color: #939292;
                            }
                        }
                    }
                    .el-alert{
                        position: absolute;
                        background-color: transparent !important;
                        left: 5%;
                        top:56%;
                        color:#FA0206;
                    }
                    .el-checkbox{
                        margin-left: 10%;
                    }
                    .el-button{
                        width:80%;
                        margin-left: 10%;
                    }
                }
                .right{
                    display: flex;
                    flex-direction: column;
                    width:290px;
                    justify-content: space-around;
                    span{
                        text-align: center;
                        font-size: 18px;
                        line-height: 83px;
                    }
                    .code{
                        width: 150px;
                        height: 150px;
                        margin-left: 24%;
                        margin-top: -15%;
                        background: url(../../assets/code.png) center no-repeat;
                    }
                }
            }
            .footer{
                display: flex;
                flex-direction: row;
                border-top: 1px solid #dfdfdf;
                justify-content:flex-start;
                align-items: center;
                span{
                    margin-left: 5%;
                    font-size: 15px;
                }
                .el-button,
                a{
                   margin-left: 2%;
                }
                a{
                    img{
                        width:30px;height:30px;
                    }
                }
            }
        }
       
    }
}

</style>
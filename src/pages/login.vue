<template>
	<div class="content" id="login">	
		<div class="bg-car"></div>
		<ul class="h-title c1e f26">
			<router-link to='/' tag='li' class="tleft ml32">先去逛逛</router-link>
			<router-link to='/regist' tag='li' class="tright mr32">注册</router-link>
		</ul>
		<!--  -->
		<div class="title">
			<h1 class="f48 " v-if="Tinput">登录</h1>
			<h1 class="f48" v-else>验证码登录</h1>
			<h4 class="f24 mt10">Sign In</h4>
		</div>
		<form class="form-login">
			<div class="form-input">
				<label class="form-label f24 " >手机号码</label>
				<input class="f26 c1e"
				v-model="phoneNum" type="tel" placeholder="请输入11位手机号" />
			</div>
			<div class="form-input m32" v-if="Tinput">
				<label class="form-label f24">登录密码</label>
				<input class="f26 c1e"  type="password" v-model="psd" placeholder="请输入密码"/>
				<router-link class="form-link f24" to="/forget">忘记密码</router-link>
			</div>
			<div class="form-input m32" v-else>
				<label class="form-label f24">验证码</label>
				<input class="f26 c1e" type="tel" v-model="yzc" placeholder="请输入验证码"/>
				<span class="form-link f24" @click="getAuthCode">{{verificationValue}}</span>
			</div>
			<div class="login-way tleft" v-if="Tinput">
				<img class="icon-phone" src="../../static/img/icon-phone.png" />
				<span @click="yzmBtn" class="yzm f24">验证码登录</span>
			</div>
			<div class="login-way tleft" v-else>
				<img class="icon-key" src="../../static/img/icon-key.png" />
				<span @click="yzmBtn" class="yzm f24">密码登录</span>
			</div>
			<input type="button" class="btn-login" @click="sendLogin()" value="立即登录" />
			<div class="text-link f24 caaa mt26">点击立即登录按钮则表示您已阅读且同意<router-link class="cffb" to="/shopText">《商城协议》</router-link>
			</div>
		</form>
		<!-- 三方 -->
		<!-- <div class="other">
			<h2 class="f24 caaa mt44">第三方登录</h2>
			<div class="icon-wx">
				<img src="../../static/img/icon-weixin.png" />
			</div>
		</div> -->
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
	</div>
	
	
</template>

<script >
	import login from '../server/login.js';
	import message from '../components/message.vue';
	import common from '../plugins/common.js';
	export default {
		components:{
			message
		},
		data() {
			return {
				sendVal: '',
				msgContent: '',
				Tinput: true,//true密码，false验证码
				verificationValue: "获取验证码",
				sendCodeStatus:false,//防止二次点击
				CodeState: true,
				psd:'',
				yzc:'',
				phoneNum:"",
				
			};
		},
		methods: {
			yzmBtn() {
				this.Tinput = !this.Tinput;
				if(this.Tinput){
					this.yzc = "";
				}else{
					this.psd = "";
				}
			},
			// 立即登录
			sendLogin(){
				let that = this;
				let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
				let params = {};
				let state;
				if(that.Tinput){
					state = 0
				}else{
					state = 1;
				}
				if (!phoneReg.test(that.phoneNum)) {
					that._setMsgBox("请输入正确的手机号码");
					return false;
				}
				//密码
				if (state == 0){
					if (that.psd.length < 5 || that.psd.length > 18) {
					  that._setMsgBox('请输入6～18位字母和数字')
					  return false
					}
					params = {
					  userPhone: that.phoneNum,
					  pwd: that.psd,
					  logInWay:0,
					  type:state,
					  source:'web',
					}
				}
				//验证码
				if (state == 1) {
					if (
					  that.yzc == '' ||
					  that.yzc == undefined ||
					  that.yzc == null
					) {
					  that._setMsgBox('请输手机入验证码')
					  return false
					}
					params = {
					  userPhone: that.phoneNum,
					  pwd: that.yzc,
					  logInWay:0,
					  type:state,
					  source:'web'
					}
				  }
				  login.postLogin(params).then(res => {
					let code = res.code
					console.log(res)					
					if (code == 0) {
					let token = res.data.userToken
					let userid = res.data.userId
					  that.$router.push('/');
					  common._setCookie('code_token', token,1000)
					  common._setCookie('userid', userid,1000)
					  this.$store.commit('login',res.data)
					} else {
					  that._setMsgBox(res.message);
					}
				  })
			},
			/*--获取验证码----*/
			getAuthCode() {
				let that = this;
				let timer = null;
				let sencods = 60;//验证码间隔时长
				that.CodeState = false;//按钮状态
				let params = {
					phone: that.phoneNum,
					validateType: '3',
					source:'web'
				 }
				if (that.CodeState) {
					return false
				}
				let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
				  if (!phoneReg.test(that.phoneNum)) {
					that._setMsgBox('请输入正确的手机号码')
					return false
				}
				login.getCode(params).then(res => {
					let code = res.code;
					console.log(res)
					if (code == 0) {
					  timer = setInterval(function() {
						if (sencods <= 0) {
						  clearInterval(timer)
						  timer = null
						  that.verificationValue = '重新发送'
						  that.CodeState = false
						} else {
						  that.CodeState = true
						  that.verificationValue = sencods + '秒后重发'
						  sencods--
						}
					  }, 1000)
					} else {
					  that._setMsgBox(res.message)
					}
				});
			}, 
			goback(){
				this.$router.go(-1)
			},/*--返回--*/
			// 弹窗
			_setMsgBox(content = '', timer = 2000, callback) {
			  let that = this
			  that.sendVal = true
			  that.msgContent = content
			  setTimeout( () => {
				that.sendVal = false
				if (callback) {
				  callback()
				}
			  }, timer)
			},
		},
		
	}
	
</script>
<style   lang="scss" scoped="scoped">
	@import '../../static/css/style.css';
	#login{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		font-family: 'pf-Medium';
		background-color: transparent;
	.active{
		background:red;
	}
	.classno{
		background:#eee
	}
	.caaa {
		color: #aaa;
	}
	.bg-car {
		position: absolute;
		width: 2.94rem;
		height: 3.25rem;
		top: -0.325rem;
		left: -0.25rem;
		background: url(../../static/img/bg-car.png) no-repeat;
		background-size: 100%;
		z-index: 0;
	}

	.h-title {
		background-color: transparent;
		position: absolute;
		left: 0;
		width: 100%;
		display: flex;		
		margin-top: 0.45rem;
		z-index: 2;
	}

	.h-title li {
		flex: 1;
		line-height: 0.45rem !important;
	}

	.title {
		text-align: center;
		margin-top: 1.7rem;
		color: #1e1e1e;
		font-family: 'pf-Bold'
	}

	.form-login {
		height: auto;
		margin: 1.46rem 0.55rem 0;
	}

	.form-input {
		position: relative;
		width: 100%;
		height: 0.8rem;
		border-radius: 0.4rem;
		border: 1px solid #babac2;
	}

	.form-label {
		position: absolute;
		color: #aaa;
		left: 0.5rem;
		top: -0.12rem;
		font-family: 'pf-Regular';
		background: #fff;
		padding: 0 0.1rem;
	}

	.form-input input {
		position: absolute;
		left: 0.5rem;
		top: 0.26rem;
		width: 60%;
		padding: 0 0.1rem;
	}

	.form-link {
		position: absolute;
		right: 0.5rem;
		top: 0.3rem;
		color: #aaa;
		background: #fff;
	}

	.login-way {
		height: 0.24rem;
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.icon-phone {
		width: 0.2rem;
		height: 0.24rem;
		margin: 0 0.08rem 0 0.6rem;
	}

	.icon-key {
		width: 0.22rem;
		height: 0.24rem;
		margin: 0 0.08rem 0 0.6rem;
	}

	.yzm {
		flex: 2;
	}

	.btn-login {
		width: 100%;
		color: #fff;
		font-size: 0.3rem;
		height: 0.8rem;
		margin-top: 0.64rem;
		background-image: linear-gradient(187deg, #feca3a 0%, #feb336 100%), linear-gradient(#ffba30, #ffba30);
		background-blend-mode: normal, normal;
		box-shadow: 0 0.09rem 0.17rem 0.01rem rgba(254, 166, 19, 0.2);
		border-radius: 0.4rem;
	}

	.other {
		width: 3rem;
		margin: 1.6rem auto 0;
		border-top: 1px solid #e6e6e6;
	}

	.icon-wx {
		width: 1.6rem;
		height: 0.64rem;
		border: 1px solid #babac2;
		border-radius: 0.32rem;
		display: flex;
		margin-top: .32rem;
		align-items: center
	}
	.text-link{
		font-family: 'pf-Regular';
	}
	.icon-wx img {
		width: .42rem;
		height: .34rem;
	}
}
</style>

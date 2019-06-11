<template>
	<div class="content" id="settledlogin">	
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="toIndex"/>
			商家登录
		</div>
		<div class="bg-car"></div>

		<!--  -->
		<div class="title">
			<h1 class="f48 ">登录</h1>
			<h4 class="f24 mt10">Sign In</h4>
		</div>
		<form class="form-login">
			<div class="form-input">
				<label class="form-label f24 " >手机号码</label>
				<input class="f26 c1e"
				v-model="phoneNum" type="tel" placeholder="请输入11位手机号" />
			</div>
			<div class="form-input m32">
				<label class="form-label f24">登录密码</label>
				<input class="f26 c1e"  type="password" v-model="psd" placeholder="请输入密码"/>
			</div>
			<input type="button" class="btn-login" @click="sendLogin()" value="立即登录" />
		</form>
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
	</div>
</template>

<script >
	import settled from '../../server/settled.js';
	import message from '../../components/message.vue';
	import common from '../../plugins/common.js';
	export default {
		components:{
			message
		},
		data() {
			return {
				sendVal: '',
				msgContent: '',
				verificationValue: "获取验证码",
				sendCodeStatus:false,//防止二次点击
				CodeState: true,
				psd:'',
				yzc:'',
				phoneNum:""
			};
		},
		mounted(){
			this.loginState();
		},
		methods: {
			toIndex(){
				this.$router.go(-1)
			},
			// 获取登录状态
			loginState(){
				if(common._getCookes('shop_token') || common._getCookes('shopid')){
					let that = this;
					that.phoneNum = common._getCookes('shopphone');
					that.psd = common._getCookes('shoppwd');
					let params = {
						merchantPhone: that.phoneNum,
						password: that.psd,
						source:0,
					}
					settled.settlLogin(params).then(res => {
						
							let code = res.code
							console.log(res)					
							if (code == 0) {
							let token = res.data.userToken
							let userid = res.data.userId
							  that.$router.push({
								  path:'/merchantIndex',
								  query:{
									  balance:res.data.balance,
									  openId:res.data.openId,
									  merchantId:res.data.merchantId,
									  merhcnatToken:res.data.merhcnatToken
									}
								});
							  
							} else {
							  that._setMsgBox(res.message);
							}
					})
				}
				
				
				
			},
			// 立即登录
			sendLogin(){
				let that = this;
				let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
				let params = {};
				if (!phoneReg.test(that.phoneNum)) {
					that._setMsgBox("请输入正确的手机号码");
					return false;
				}
				//密码
				if (that.psd.length < 5 || that.psd.length > 18) {
					that._setMsgBox('请输入6～18位字母和数字')
					return false
				}
				params = {
					merchantPhone: that.phoneNum,
					password: that.psd,
					source:0,
				}
				settled.settlLogin(params).then(res => {
					let code = res.code
					console.log(res)					
					if (code == 0) {
					let token = res.data.userToken
					let userid = res.data.userId
					  that.$router.push({
						  path:'/merchantIndex',
						  query:{
							  balance:res.data.balance,
							  openId:res.data.openId,
							  merchantId:res.data.merchantId,
							  merhcnatToken:res.data.merhcnatToken
							}
						});
					  common._setCookie('shop_token', token)
					  common._setCookie('shopid', userid)
					  common._setCookie('shopphone', that.phoneNum)
					  common._setCookie('shoppwd', that.psd)
					}else if(res.message == "审核中" || code ==1006){
						// 居然判断message为了保险起见我再加个code
						this.$router.push({
							path:"/settledInfo",
							query:{
								state:1,
								data:res.data
							}
						})
					}else if(res.message == "审核失败,请重新填写" || code ==1012){
						// 判断message为了保险起见再加个code
						this.$router.push({
							path:"/check",
						})
					}
					 else {
					  that._setMsgBox(res.message);
					}
				})
			},
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
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	#settledlogin{
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
		background: url(../../../static/img/bg-car.png) no-repeat;
		background-size: 100%;
		z-index: 0;
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

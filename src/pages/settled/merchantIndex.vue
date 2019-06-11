<template>
	<div class="merchantIndex">
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="toIndex"/>
			商家账户
		</div>
		<div class="merchant-main">
			<div class="money-pack">
				<h4 class="f34 cle">商家钱包</h4>
				<h5 class="f24">账户余额</h5>
				<p class="c1e">{{money}}<small class="f24">元</small></p>
				<input @click="cashMoney" class="sub-btn f24" type="button" value="提现" />
				<!-- 两个圆圈背景 -->
				<div class="cricle cricle-right"></div>
				<div class="cricle cricle-bottom"></div>
			</div>
			<ul class="list-ul">
				<li @click="toTrade">
					<label class="f28">交易明细</label>
					<img class="icon-right" src="../../../static/img/icon-r-return.png" />
				</li>
				<!-- <li>
					<label class="f28">提现规则</label>
					<img class="icon-right" src="../../../static/img/icon-r-return.png" />
				</li> -->
			</ul>
		</div>
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
	</div>
</template>

<script>
	import message from '../../components/message.vue';
	export default{
		components:{
			message
		},
		data(){
			return{
				sendVal: '',
				msgContent: '',
				openId:"",
				money:0,
				source:0,
				
			}
		},
		mounted(){
			this.openId = this.$route.query.openId;
			this.money = this.$route.query.balance;
			this.merhcnatToken = this.$route.query.merhcnatToken
			this.merchantId = this.$route.query.merchantId
		},
		methods: {
			toIndex() {
				this.$router.push('/')
			},
			toTrade(){
				this.$router.push({
					path:"/tradeDetail",
					query:{
						openId : this.$route.query.openId,
						money : this.$route.query.balance,
						merhcnatToken : this.$route.query.merhcnatToken,
						merchantId : this.$route.query.merchantId
					}
				})
			},
			cashMoney(){
				if(this.source ==2){
					this.$router.push({
						path:"/applyMoney",
						query:{
							openId : this.$route.query.openId,
							money : this.$route.query.balance,
							merhcnatToken : this.$route.query.merhcnatToken,
							merchantId : this.$route.query.merchantId
						}
					})
				}else{
					this._setMsgBox("提现须前往微信公众号操作！")
				}
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

<style lang="scss" scoped="scoped">
		@import '../../../static/css/style.css';
		@import '../../../static/css/header.css';
	.merchantIndex{
		
		.merchant-main{
			margin-top: .88rem;
			.money-pack{
				padding: 0 .3rem;
				height: 4rem;
				width: 100%;
				text-align: left;
				overflow: hidden;
				position: relative;
				border-bottom: .16rem solid #f2f2f2;
				// 两个圆圈
				.cricle{
					position: absolute;
					width: 3.08rem;
					height: 3.08rem;
					border-radius: 50%;
				}
				.cricle-right{
					right: -1.54rem;
					bottom: 0;
					background: #e6e6fe;
					z-index: 2
				}
				.cricle-bottom{
					bottom: -50%;
					right: 0;
					background: #f2f5fa;
					z-index: 1
				}
				h4{
					margin:.4rem 0 .6rem 0; 
					font-family: 'pf-Bold';
				}
				h5{
					color: #bbc2cc;
				}
				p{
					font-size: .6rem;
					line-height: .6rem;
					font-family: 'pf-Bold';
					margin: .3rem 0  .4rem 0;
				}
				.sub-btn{
					width: 1.20rem;
					height: .4rem;
					margin: 0;
					display: block;
					background-color: #e9f6ef;
					border-radius: .04rem;
					border: none;
					font-family: 'pf-Regular';
					color: #00cf61;
				}
			}
			// 列表
			.list-ul{
				padding:0 .3rem;
				 li{
					 border-bottom: 1px solid #ececec;
					 height: 1rem;
					 display: flex;
					 align-items: center;
				 }
				label{
					font-family: 'pf-Regular';
					color: #666;
					margin: 0;
				}
				.icon-right{
					margin-right: 0;
					margin-top: .25rem;
					width: .1rem;
					height: .18rem;
				}
			}
		}
	}
</style>

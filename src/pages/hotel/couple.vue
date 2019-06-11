<template>
	<div class="hotel-couple">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">优惠券</label>
		</div>
		<!-- 优惠券 -->
		<div class="couple-main">
			<!-- 优惠券 -->
				<div class="couple-card">
					<!--  -->
					<div class="card-type" v-for="(item,index) in list"
					:key="index">
						<img class="couple-img" src="../../../static/img/bg-couple-card.png" />
						<div class="couple-txt">
							<div class="couple-l">
								<div class="flex" >
									<div class="f72 ffHeavy">
									{{item.amount}} 
										<span class="f24"  v-if="item.type == 0">元</span>
										<span class="f24"  v-if="item.type == 1">折</span>
									</div>
									<label class="cards-kind"><span>{{item.couponType}}</span></label>
								</div>
								<div class="m-limit">满{{item.conditionAmount}}可用</div>
								<div class="couple-time">
									•<label>{{item.startTime}} - {{item.endTime}}</label>•
								</div>
							</div>
							<div class="couple-r">
								<a class="go-couple-btn" href="javascript:;" @click ="getcouple(item.id,item.isReceive)" v-if="item.isReceive==0">立即抢</a>
								<a class="go-couple-btn" href="javascript:;"
								 @click ="getcouple(item.id,item.isReceive)" v-if="item.isReceive==1">已领取</a>
								<div>剩{{item.number}}张</div>
							</div>
						</div>
					</div>
		
				</div>
		
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
	import shop from '../../server/shop.js';
	import common from '../../plugins/common.js';
	import message from '../../components/message.vue';

	export default{
		components:{
			message
		},
		data(){
			return{
				list:"",
				params:{
					// 优惠券列表
					type:1,
					merhcantId:'',
					userId:'',
					userToken:'',
					fromNum:1,
					pageSize:10,
				},
				coupons:{
					// 领取优惠券
					couponId:'',
					source:0,
					userId:'',
					userToken:''
				},
				sendVal: '',
				msgContent: '',
			}
		},
		mounted(){
			this.params.merhcantId = this.$route.query.id;
			if(this.$route.query.state){
				this.params.type = this.$route.query.state;
			}
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined
			this.coupons.userToken = common._getCookes('code_token') || undefined
			this.coupons.userId = common._getCookes('userid') || undefined
			this.getList()
		},
		methods: {
			cancel(){
				// 返回上一页
				this.$router.go(-1);
			},
			// 优惠券列表
			getList() {
				shop.couple(this.params).then(res =>{
					if(res.code == 0){
						this.list = res.data
					}else{
						console.log(res.message)
					}
					console.log(res)
				})
			},
			// 领取券
			getcouple(val,is){
				this.coupons.couponId = val;
				if(is==0){
					shop.getCoupons(this.coupons).then(res =>{
						if(res.code == 0){
							this._setMsgBox(res.message)
						}else{
							console.log(res.message)
						}
					})
					this.list = []
					this.getList();
				}else{
					this._setMsgBox("亲，您已领取过了~")
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
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";
	
	.hotel-couple{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		
		.header label{
			display: inline-block;
			flex: 1;
		}
		/*优惠券*/
		.couple-main{
			margin-top: .88rem;
			padding-top: .32rem;
			border-top: .16rem solid #f2f2f2;
		}
		.bg-couple {
			width: 1.68rem;
			height: 2.2rem;
			margin-top: 1.98rem;
		}
		
		.mt70 {
			margin-top: .7rem;
		}
		
		.m56 {
			margin: 0.56rem 0;
		}
		
		.couple-card {
			height: auto;
			margin: 0 .3rem;
			overflow: hidden;
		}
		
		.card-type {
			width: 100%;
			position: relative;
			height: 2.3rem;
			overflow: hidden;
			margin-bottom: .36rem;
		}
		
		.couple-img {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 5;
		}
		
		.couple-txt {
			margin: .4rem .48rem 0rem .38rem;
			display: flex;
			position: relative;
			z-index: 6;
			justify-content: space-between;
			font-size: .24rem;
		}
		
		.couple-l {
			text-align: left;
			margin: 0;
			width: 4.45rem;
			color: #b47d6f;
		}
		
		.f72 {
			font-size: .72rem;
			line-height: .54rem;
			color: #ff344e;
			margin: 0;
		}
		
		.f24 {
			font-size: .24rem;
			margin-left: .1rem;
		}
		
		.flex {
			display: flex;
			align-items: center;
		}
		
		.cards-kind {
			display: inline-block;
			width: 1.06rem;
			height: .40rem;
			margin-left: .56rem;
			line-height: .4rem;
			color: #fefefe;
			text-align: center;
			transform: skew(-10deg);
			background-color: #e49982;
			border-radius: 2px;
		}
		
		.cards-kind span {
			display: inline-block;
			transform: skew(10deg)
		}
		
		.m-limit {
			margin: .16rem 0 .3rem 0;
			line-height: .24rem;
			font-weight: bold;
		}
		
		.couple-time label {
			display: inline-block;
			margin: 0 .06rem;
		}
		
		.couple-r {
			width: 1.40rem;
			color: #e49982;
			font-size: .22rem;		
			text-align: center;
		}
		
		.go-couple-btn {
			margin: .36rem 0 0;
			display: inline-block;
			font-size: .26rem;
			color: #fff;
			width: 1.40rem;
			height: .48rem;    
			line-height: .48rem;
			text-decoration: none;
			background-color: #f96b70;
			border-radius: .24rem;
		}
		
		.couple-r div {
			margin-top: .12rem;
		}
	}
</style>

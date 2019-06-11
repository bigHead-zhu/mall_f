<template>
	<div class="hotel-detail-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="toIndex"/>
			<label class="header-title">订单详情</label>
		</div>
		<!-- 入住状态 -->
		<div class="check-in-state">
			<div class="check-txt">
				<p>当前状态：{{orderData.statusType}}</p>
				<p class="mt20">序列号：{{orderData.id}}</p>
			</div>
			<img class="checkbg-person" src="../../assets/hotel/checkbg-person.png" />
		</div>
		<!-- 入驻信息 -->
		<div class="check-infomation f28 c1e">
			<div class="check-name">
				<label>{{orderData.userName}}</label>
				<span class="check-num">{{orderData.userPhone}}</span>
			</div>
		</div>
		<!-- 订单头 -->
		<div class="order-hotel" >
			<div class="hotel-title f28 c1e">
				<img class="icon-ordershop" src="../../assets/hotel/icon-shop.png"/>{{orderData.merchantName}} <img class="icon-right" src="../../../static/img/icon-r-return.png"/>
			</div>
			
		<!-- 订单酒店 -->
			<div v-if="classifiId==4">
				<div class="hotel-alls" v-for="(item,index) in orderData.orderDetails" :key="index">
					<img class='hotel-img' v-lazy="item.goodsImg" />
					<div class="hotel-descript">
						<div class="hotel-descript-title f26 c1e">{{item.goodsName}}</div>
						<div class="hotel-type f26">
							房型：{{item.specName}}
						</div>
						<div class="price">
							<label class="price-money">¥{{item.actualAmount}}</label>
							<label class="price-num f24">x1</label>
						</div>
					</div>
				</div>
				
				<div class="order-time f26 c1e">
					<div class="time-title">
						<img src="../../assets/hotel/order-time.png" />
						入住时间
					</div>
					<div class="time">{{orderData.beginTime}}~{{orderData.endTime}}</div>
				</div>
			</div>
			<!-- 餐饮 -->
			<div v-for="(item,index) in orderData.orderDetails" :key="index"  v-if="classifiId==3">
				<div class="food-des" v-for="(item,index) in orderData.orderDetails" :key="index">
					<div class="title f32 c1e">{{item.goodsName}}</div>
					<div class="food-time f28">{{orderData.beginTime}}至{{orderData.endTime}}可用</div>
					<div class="cursor">
						<!--<label class="food-title">{{orderData.merchantName}}</label> -->
						<label class="money"><small class="f24">¥</small>{{orderData.actualAmount}}</label>
					</div>
				</div>
				<div class="food-num c1e f26">
					<div class="tl">购买数量</div>
					<div class="tr">{{item.number}}张</div>
				</div>
			</div>
			<!-- 电影 -->
			<div v-for="(item,index) in orderData.orderDetails" :key="index"  v-if="classifiId==2">
				<div class="film-des" >
					<div class="title f32 c1e">{{item.goodsName}}</div>
					<div class="film-time f28">{{orderData.beginTime}}至{{orderData.endTime}}可用</div>
					<div class="cursor">
						<label class="film-title">{{orderData.merchantName}}</label>
						<label class="money"><small class="f24">¥</small>{{orderData.actualAmount}}</label>
					</div>
				</div>
				<div class="food-num c1e f26">
					<div class="tl">购买数量</div>
					<div class="tr">{{item.number}}张</div>
				</div>
			</div>
			<!-- 旅游 -->
			<div v-for="(item,index) in orderData.orderDetails" :key="index"  v-if="classifiId==1">
				<div class="hotel-alls">
					<img class='hotel-img'  v-lazy="item.goodsImg"  />
					<div class="hotel-descript">
						<div class="hotel-descript-title f26 c1e">{{item.goodsName}}</div>
						<div class="hotel-type f26">
							生效日期：{{orderData.beginTime}}~{{orderData.endTime}}
						</div>
						<div class="price">
							<label class="price-money">¥{{item.actualAmount}}</label>
							<label class="price-num f24">x{{item.number}}</label>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		
		<!-- 报销凭证  订单结算-->
		<ul class="expense-couple">
			<li class="expense b1">
				<img class="icon-expense" src="../../assets/hotel/icon-redict.png" />
				报销凭证：该服务请提前联系商家确认
			</li>
			<li class="couple mt20">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">商品总价</label></div>
					<div class="tr" >¥ {{orderData.actualAmount}}</div>
				</div>
			</li>
			<li class="couple">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">收益钱包</label></div>
					<div class="tr" >-¥ {{orderData.profitAmount}}</div>
				</div>
			</li>
			<li class="couple b1">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">折扣券</label></div>
					<div class="tr" >-¥ {{orderData.discountAmount}}</div>
				</div>
			</li>
			<li class="couple allNum">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">订单实付</label></div>
					<div class="tr" >-¥ {{orderData.totalAmount}}</div>
				</div>
			</li>
		</ul>
		<!-- 订单信息 -->
		<ul class="order-info">
			<li class="c1e h80">
				<img class="icon-order" src="../../assets/hotel/icon-order.png" />
				订单信息
			</li>
			<li class="order-detail">
				<div class="">订单编号: <input class="code-num" id="copyid" type="text" v-model="orderData.id" readonly="readonly" /></div>
				<input  class="copy-btn" type="button" value="复制"  @click="Copy()"/>
			</li>
			<li v-for="(item,index) in orderData.logistics" :key="index">
				<div class="">{{item.logisticsDesc}}：<span>{{item.date}}</span></div>
			</li>
		</ul>
	</div>
</template>

<script>
	import order from '../../server/order.js'
	import common from '../../plugins/common.js';
	
	export default{
		data(){
			return{
				// 订单详情
				orderParams:{
					source:0,
					userId:'',
					userToken:'',
					orderId:'',
				},
				orderData:'',
				classifiId:'',
			}
		},
		mounted(){
			this.orderParams.userId = common._getCookes('userid') || undefined
			this.orderParams.userToken = common._getCookes('code_token') || undefined
			this.orderParams.orderId = this.$route.query.Id;
			this.classifiId = this.$route.query.classifiId
			this.orderDetail();
		},
		methods:{
			// 
			toIndex(){
				this.$router.push("/")
			},
			Copy(){
			  let url = document.querySelector('#copyid');
			  url.select(); // 选择对象
			  document.execCommand("Copy");
			},
			/**
			 * 加载订单详情
			 */
			orderDetail(){
				order.orderCategoryDetail(this.orderParams).then(res=>{
					if(res.code==0){
						this.orderData = res.data;
					}else{
						console.log(res.message)
					}
				})
			},
		}
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";
	
	.hotel-detail-main{
		width: 100%;
		height: 100vh;
		background: #eee;
		overflow:auto;
		
		.header label{
			display: inline-block;
			flex: 1;
		}
		/*入住状态*/
		.check-in-state{
			width: 100%;
			margin-top: 1.04rem;
			height: 2rem;
			display: flex;
			background-image:url('../../assets/hotel/checkbg.png');
			background-size: 100% 100%;
		}
		.check-txt{
			text-align: left;
			color: #fff;
			flex: 2;
			font-size: .3rem;
			line-height: .3rem;
			margin: .6rem 0 0 .3rem;
		}
		.checkbg-person{
			width: 1.5rem;
			height: 1.8rem;
			margin: .1rem .3rem 0 0; 
		}
		.mt20{
			margin-top: .2rem!important;
		}
		.check-infomation{
			// height: 1.8rem;
			overflow: hidden;
			background: #fff;
			text-align: left;
		}
		.check-name{
			margin: .34rem .52rem 0 .3rem;
			padding-bottom: .2rem;
		}
		.check-address{
			margin: .2rem .52rem 0 .3rem;
			line-height: .34rem;
		}
		.check-num{
			color: #aaa;
		}
		/*订单酒店*/
		.order-hotel{
			margin-top: .16rem;
			padding: .3rem .3rem 0 .3rem;
			text-align: left;
			background: #fff;
		}
		.icon-right{
			width: .1rem;
			height: .18rem;
			vertical-align: middle;
			margin-left: .18rem;
		}
		.hotel-alls{
			display: flex;
			margin-top: .3rem;
			padding-bottom: .3rem;
			border-bottom: .01rem solid #f2f2f2;
		}
		.hotel-img{
			width: 2rem;
			height: 2rem;
			margin: 0;
		}
		.hotel-descript{
			margin: .16rem 0 0 .2rem;
			flex: 1;
		}
		.hotel-descript-title{
			line-height: .34rem;
		}
		.hotel-type{
			color: #aaa;
			margin: .2rem 0 .3rem 0;
		}
		.price-money,.price-num{
			display: inline-block;
			width: 49%;
		}
		.price-money{
			font-size: .3rem;
			color: #b50000;
			text-align: left;
		}
		.price-num{
			color: #aaa;
			text-align: right;
		}
		.order-time{
			width: 100%;
			display: flex;
			height: .85rem;
			align-items: center;
		}
		.time-title img,.check-info img{
			width: .26rem;
			height: .26rem;
			margin-right: .1rem;
			vertical-align: middle;
		}
		.time{
			flex: 2;
			text-align: right;
		}
		/*报销凭证 订单结算*/
		.expense-couple{
			margin: .16rem 0;
			background: #fff;
		}
		.expense-couple li,.order-info li{
			margin: 0 .3rem;
			color: #aaa;
		}
		.icon-expense{
			width: .3rem;
			height: .3rem;
			margin: 0 .2rem 0 0;
		}
		.expense-couple li{
			text-align: left;
			align-items: center;
		}
		.expense{
			font-size: .26rem;
			display: flex;
			height: .88rem;
		}
		.b1{
			border-bottom:0.01rem solid #f2f2f2;
		}
		.couple .copule-tot{
			display: flex;
			width: 100%;
		}
		.couple .copule-tot div{
			flex: 1;
			margin: .1rem 0;
			font-size: .26rem;
		}
		.allNum{
			color:#1e1e1e!important;
			line-height: .84rem;
		}
		/*订单信息*/
		.order-info{
			background: #fff;
			font-size: .26rem;			
			text-align: left;
		}
		.h80{
			height: .8rem;
			line-height: .8rem!important;
		}
		.order-info .order-detail{
			position: relative;
		}
		.order-info li{
			line-height: .44rem;
		}
		.icon-order{
			width: .3rem;
			height: .3rem;
			vertical-align: middle;
		}
		.copy-btn{
			position: absolute;
			padding: .04rem .1rem;
			border-radius: .15rem;
			line-height: .24rem;
			font-size: .22rem;
			right: 0;
			top: 0.04rem;
			background: transparent;
			border: solid .01rem #ffba30;
			color: #ffba30;
		}
		.code-num{
			color: #aaa;
		}
		.icon-ordershop{
			width: .3rem;
			height: .3rem;
			margin-right: .14rem;
			vertical-align: middle;
		}
		// 电影和其他
		.food-des{
			height: 2.28rem;
			margin-top: .35rem;
			overflow: hidden;
			background-image: url('../../assets/food/food.png');
			background-size: 100% 100%;
			.title{
				margin: .44rem 0 0 .6rem;
			}
			.food-time{
				margin: .14rem 0 0 .6rem;
				color: #9c9c9c;
			}
			.cursor{
				margin: .14rem 0 0 .6rem;
				color: #f90;
				height: .4rem;
				display: flex;
				align-items: center;
			}
			.money{
				font-size: .5rem;
				margin-right: .8rem;
				font-weight: bold;
			}
			.money small{
				font-weight: normal;
			}
			.food-title{
				color: #9c9c9c;
				margin-left: 0;
				font-size: .26rem;
			}
			.buy-btn{
				display: inline-block;
				width: 1.2rem;
				height: .36rem;
				background: #f90;
				color: #fff;
				font-size: .28rem;
				border-radius: .18rem;
				text-align: center;
				line-height: .36rem;
				margin-right:0.44rem;;
			}
		}
		.film-des{
			height: 2.28rem;
			margin-top: .35rem;
			overflow: hidden;
			background-image: url('../../assets/film/film-couple.png');
			background-size: 100% 100%;
			.title{
				margin: .44rem 0 0 .6rem;
			}
			.film-time{
				margin: .14rem 0 0 .6rem;
				color: #9c9c9c;
			}
			.cursor{
				margin: .14rem 0 0 .6rem;
				color: #f90;
				height: .4rem;
				display: flex;
				align-items: center;
			}
			.money{
				font-size: .5rem;
				margin-right: .38rem;
				font-weight: bold;
			}
			.money small{
				font-weight: normal;
			}
			.film-title{
				color: #9c9c9c;
				margin-left: 0;
				font-size: .26rem;
			}
			.buy-btn{
				display: inline-block;
				width: 1.2rem;
				height: .36rem;
				background: #f90;
				color: #fff;
				font-size: .28rem;
				border-radius: .18rem;
				text-align: center;
				line-height: .36rem;
				margin-right:0.44rem;;
			}
		}
		.food-num{
			display: flex;
			height: .86rem;
			overflow: hidden;
			align-items: center;
			border-top: #f2f2f2 solid 0.01rem;
			margin: .18rem 0rem 0;
			.tl{
				margin-left: 0;
			}
			.tr{
				margin-right: 0;
			}
		}
}
</style> 

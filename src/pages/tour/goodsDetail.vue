<template>
	<div class="hotel-goods">
		<div class="header">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
				<div class="header-title">商品详情</div>
				<img class="icon-search" src="../../../static/img/icon-share-goods.png"/>
		</div>
		<!--商品轮播  -->
		<div class="goods-banner">
			<swiper :options='goodsSwiper' class="goods-wrapper">
				<swiper-slide v-for="(item,index) in shopData.img" :key="index"><img  v-lazy="item"/></swiper-slide>
			</swiper>
			<img class="button-prev" src="../../../static/img/icon-pre.png" />
			<img class="button-next" src="../../../static/img/icon-next.png" />
		</div>
		<!-- 商品名 -->
		<div class="goods-all">
			<div class="goods-name">
				<div class="money-all ">
					<label class="total-money"><span>¥</span>{{shopData.retailAmount}}</label>
				</div>
				<div class="goods-title">{{shopData.goodsName}}</div>
				<div class="goods-other">
					<div class="tl">销量:{{shopData.sale}}</div>
					<div class="tr">{{shopData.goodsLocation}}</div>
				</div>
			</div>
			<!--  -->
			<div class="vip">
				<img class="icon-vip" src="../../../static/img/icon-vip.png" />
				成为会员，享受更多优惠！
			</div>
			<div class="goods-pro">
				<div class="couple">
					<div class="tl">优惠<label class="icon-couple">商家券</label></div>
					<div class="tr" v-show="hasCoupons">领券<img class="icon-return" src="../../../static/img/icon-r-return.png" @click="goCouple(shopData.merchantId)"/></div>
					<div class="tr" v-show="!hasCoupons">暂无优惠券</div>
				</div>
				<div class="couple">
					<div class="tl">生效时间</div>
					<div class="tr flex2">{{shopData.startTimes}}~{{shopData.endTimes}}</div>
				</div>
			</div>
			<!-- 商品评价 -->
			<div  id="comment" class="goods-coment goodsTitle">
				<div class="goods-coment-title">
					<div class="tl">商品评价</div>
					<div class="tr" @click="tocomment(shopData.id)"  v-if="commentsShow">查看全部<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
				</div>
				<div class="comont-deta" >
					<div  v-for="(item,index) in shopData.goodsCommend" :key="index" v-if ="commentsShow">
						<div class="user" >
							<img class="user-img" v-lazy="item.headIcon" />
							<div class="user-name">{{item.nickName}}</div>
						</div>
						<div class="user-comonet" >
							{{item.content}}
						</div>
					</div>
					
					<label class="notxt" v-if="!commentsShow">该宝贝暂时无人评论~</label>
				</div>
			</div>
			<!-- 商品详情 -->
			<div id="goodsCDetail" class="goods-c-detail">
				<div class="goods-c-detail-title goodsTitle">
					<img class="bg-line-left" src="../../../static/img/bg-line-left.png" />
					<label class="bg-title">商品详情</label>
					<img class="bg-line-right" src="../../../static/img/bg-line.png" />
				</div>
				<div class="goods-imgs-all">
					<img v-for="(item,index) in shopData.goodsDetailss" :key="index" v-lazy="item" />
				</div>
			</div>
		
		</div>
		
		
		<!-- 购物导航-->
		<div class="car-foot">
			<div class="car-icon" @click="toshop(shopData.merchantId)"><img class="goods-home" src="../../../static/img/goods-home.png" /></div>
			<div class="car-icon"><a :href="'tel:'+shopData.serviceIphone"><img class="call-phone" src="../../../static/img/call-phone.png" /></a></div>
			<div class="join-car">¥<label>{{shopData.retailAmount}}</label></div>
			<div class="buy" @click="toOrder()">立即购买</div>
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
	import tour from '../../server/tour.js';
	import common from '../../plugins/common.js';
	import message from '../../components/message.vue';
	
		export default {
			components:{
				message
			},
			data() {
				return {
					sendVal: '',
					msgContent: '',
					goodsSwiper: {
						loop: true,
						autoplay: true
					},
					navigation: {
						nextEl: '.button-next',
						prevEl: '.button-prev',
					},					
					commentCode: ['全部', '有图', '好评', '中评', '差评'],
					commentIndex: 0,
					commentMask:false,
					params:{
						goodsId:"",
					},
					shopData:"",//详情数据
					commentsShow:false,//商品评
					hasCoupons:true,//优惠券
				}
			},
			mounted(){
				this.params.goodsId = this.$route.query.id;
				
				this.detail()
			},				
			methods: {
				// 领券
				goCouple(id){
					this.$router.push({
						path:'/couple',
						query:{
							id:id
						}
					})
				},
				// 评论列表
				tocomment(id){
					this.$router.push({
						path:'/goodsComment',
						query:{
							goodsId:id
						}
					})
				},
				SelectGoods(){
					this.maskState = true;
					if (this.maskState) {
					  document.body.style.overflow = 'hidden'
					} else {
					  document.body.style.overflow = 'initial'
					}
				},
				close(){
					this.maskState =false;
					document.body.style.overflow = 'initial'
				},
				okBtn(){
					this.close();
				},
				cancel(){
					this.$router.push({
						path:'/tourShop',
						query:{
							id:this.shopData.merchantId
						}
					})
				},
				// 企业店铺				
				toshop(id){
					this.$router.push({
						path:'/tourShop',
						query:{
							id:id
						}
					})
				},
				// 立即购买
				toOrder(){
					this.$router.push({
						path:'/hotelOrder',
						query:{
							id:this.$route.query.id,
							starTime:this.$route.query.startTime,
							endTime:this.$route.query.endTime,
							merchantId:this.shopData.merchantId,
							specId:this.shopData.goodsSpecVo[0].id,
							kind:1
						}
					})
				},				
				
				// 详情
				detail(){
					tour.detail(this.params).then(res =>{
						console.log(res)
						let code = res.code;
						if(code == 0){
							if(res.data.coupons>0){
								this.hasCoupons = true;
							}else{
								this.hasCoupons = false;
							}
							this.shopData = res.data;
							
						}else{
							console.log(res.message);
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

<style lang="scss">
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";

.hotel-goods{
	width: 100%;
	height: 100vh;
	overflow: auto;
	.header {
		box-shadow: 2px 1px 0 #eee;
	}
	.icon-search {
		display: inline-block;
		width: .3rem;
		height: .3rem;
		margin-right: .3rem;
	}
	.goods-banner {
		width: 100%;
		height: 5.62rem;
		margin-top: .9rem;
		background: #1e1e1e;
		position: relative;
		.goods-wrapper {
			width: 100%;
			height: 100%;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.button-prev,
	.button-next {
		width: .33rem;
		position: absolute;
		height: .26rem;
		top: 50%;
		margin-top: -.13rem;
		z-index: 15;
	}
	
	.button-prev {
		left: .3rem;
	}
	
	.button-next {
		right: .3rem
	}
	.count {
		color: #7f7f7f;
		font-size: .2rem;
		background: #fff;
		border-radius: .02rem;
		position: absolute;
		bottom: .3rem;
		right: .3rem;
		z-index: 15;
		padding: 0.05rem .1rem;
	}
	.goods-all {
		width: 100%;
		margin-bottom: .98rem;
		overflow: hidden;
	}
	
	.goods-name {
		margin-top: .4rem;
		padding: 0 .3rem;
		height: 2.35rem;
		border-bottom: .16rem solid #f1f1f1;
	}
	
	.money-all {
		text-align: left;
		line-height: .4rem;
	}
	
	.total-money {
		color: #b50000;
		line-height: .4rem;
		font-size: .4rem;
	}
	
	.total-money span {
		font-size: .24rem;
		line-height: .24rem
	}
	
	.gray-line {
		text-decoration: line-through;
		color: #aaa;
		font-size: .22rem;
		line-height: .22rem;
	}
	
	.goods-title {
		font-size: .3rem;
		line-height: .34rem;
		max-height: .68rem;
		text-align: left;
		color: #1e1e1e;
		margin-top: .23rem;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.goods-other {
		display: flex;
		color: #aaa;
		font-size: .26rem;
		margin-top: .3rem;
	}
	
	.goods-other div {
		flex: 1
	}
	
	.tl {
		text-align: left !important
	}
	
	.tr {
		text-align: right !important
	}
	//会员
	.vip{
		width: 100%;
		height: .88rem;
		line-height: .88rem;
		text-align: left;
		color: #ffba30;
		font-size: .24rem;
		background: #fff9e9;
	}
	.icon-vip{
		width: .34rem;
		height: .3rem;
		margin:.24rem .24rem 0 .44rem;
	}
	// 优惠券
	.goods-pro {
		color: #aaa;
		font-size: .26rem;
		padding: 0 .3rem;
		line-height: .24rem;
		border-bottom: .16rem solid #f2f2f2;
	}
	
	.icon-return {
		width: .1rem;
		height: .18rem;
		margin-left: .1rem;
	}
	.goods-pro .couple,
	.goods-pro .select {
		display: flex;
		margin: .3rem 0;
	}
	.couple div,
	.select div {
		flex: 1;
	}
	.select-text {
		margin-left: .41rem;
		color: #1e1e1e;
	}
	.icon-couple {
		display: inline-block;
		width: .92rem;
		height: .32rem;
		font-size: .24rem;
		line-height: .32rem;
		text-align: center;
		color: #b50000;
		margin-left: .41rem;
		background-image: url('../../../static/img/icon-couple.png');
		background-repeat: no-repeat;
		background-size: .92rem .32rem;
	}
	// 商品评价
	.goods-coment {
		padding: 0 .3rem;
		margin-top: .32rem;
		border-bottom: .16rem solid #f1f1f1;
	}
	
	.goods-coment-title {
		display: flex;
	}
	
	.goods-coment-title .tl {
		font-size: .28rem;
		color: #1e1e1e;
		flex: 1;
	}
	.goods-coment-title .tr {
		font-size: .26rem;
		color: #aaa;
		flex: 1;
	}
	.comont-deta {
		padding-bottom: .46rem;
	}
	.user {
		margin-top: .33rem;
		display: flex;
		align-items: center;
		text-align: left;
	}
	
	.user-img {
		width: .48rem;
		height: .48rem;
		border-radius: 50%;
	}
	.user-name {
		font-size: .26rem;
		color: #7f7f7f;
		flex: 3;
		margin-left: .15rem;
	}
	.user-comonet {
		font-size: .26rem;
		color: #1e1e1e;
		text-align: left;
		margin-top: .16rem;
	}
	// 商品详情
	.goods-c-detail {
		padding: 0 .3rem;
	}
	.goods-c-detail-title {
		text-align: center;
		font-size: .26rem;
		height: .8rem;
		line-height: .8rem;
		border-bottom: 1px solid #e6e6e6;
	}
	.bg-line-left,
	.bg-line-right {
		display: inline-block;
		width: .4rem;
		height: .16rem;
		vertical-align: middle;
	}
	.goods-imgs-all {
		width: 100%;
		margin-top: .44rem;
	}
	.goods-imgs-all img {
		width: 100%;
	}
	.flex2{
		flex: 2!important;
		vertical-align: middle;
		color: #1e1e1e!important;
	}
	/*购物导航*/
	.car-foot {
		position: fixed;
		height: .98rem;
		width: 100%;
		background: #fff;
		left: 0;			
		line-height: .98rem;
		bottom: 0;
		display: flex;
		font-size: .3rem;
		box-shadow: 1px -7px 6px 0px rgba(238, 238, 238, 0.4);
		border: solid 1px #eeeeee;
		align-items: center;
		align-content: center;
		justify-content: center;
		z-index: 89;
	}
	
	.car-icon {
		width: 1.06rem;
		height: 100%;
		display: inline-block;			
		border-right: .01rem solid #e6e6e6;
	}
	.car-icon img{
		display: inline-block;
		vertical-align: middle;
	}
	.goods-home {
		width: .38rem;
		height: .35rem;
	}
	.call-phone {
		width: .33rem;
		height: .33rem;
	}
	.join-car {
		width: 3.18rem;
		color: #b50000;
		text-align: right;		
		font-size: .24rem;
	}
	.join-car label{
		display: inline-block;
		margin-right: .34rem;
		font-size: .4rem;
	}
	.buy {
		width: 2.26rem;
		height: 100%;
		color: #fff;
		background-image: linear-gradient(98deg, #feca3a 0%, #feb336 100%), linear-gradient(#c8c8c8, #c8c8c8);
		background-blend-mode: normal, normal;
		box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
	}
}
</style>

<template>
	<div class="hotel-shop-detail-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">{{shoplist.merchantName}}</label>
			<img class="icon-search" src="../../../static/img/icon-share-goods.png"/>
		</div>
		<!-- 相册banner -->
		<div class="com-swiper-box">
			<swiper :options="swiperOptionGood" class="banner-box">
				<swiper-slide v-for="(item,index) in shoplist.showImgs" :key="index">
					<img v-lazy="item" />
				</swiper-slide>
			</swiper>
		</div>
		<!-- 相册end -->
		<!-- 酒店详细 -->
		<div class="hotel-details">
			<div class="h-details-title">
				<label class="label-title cle f34">{{shoplist.merchantName}}</label>
				<div class="bg-score">综合评分：{{shoplist.score}}</div>
			</div>
			<div class="hotel-label">
				<label class="label-code" v-for="(item,index) in shoplist.labels" :key="index">{{item.laberName}}</label>
			</div>
			<div class="address">
				<div class="addr-title ">
					<img class="icon-address" src="../../assets/hotel/icon-address.png"  />
					<label class="f26 c1e">地址：</label>
				</div>
				<div class="address-txt">
					{{shoplist.merchantAddress}}
				</div>
			</div>
			<div class="address">
				<div class="addr-title ">
					<img class="icon-phone" src="../../assets/hotel/icon-phone.png"  />
					<label class="f26 c1e">联系电话：</label>
				</div>
				<div class="address-txt">
					<a :href="'tel:'+shoplist.merchantPhone">{{shoplist.merchantPhone}}</a>
				</div>
			</div>
			<!-- 优惠券 -->
			<div class="couple" v-show="showcoupons" @click="goCouple(shoplist.id)">
				优惠券
			</div>
		</div>
		<!-- 全部宝贝 -->
		<div class="hotel-list">
			<div class="hotel-list-title c1e">全部宝贝</div>
			<div class="list-detail" v-for="(item,index) in shoplist.goodsList" :key="index" @click="toDetail(item.id)">
				<img class="list-img" v-lazy="item.goodsImgs" />
				<div class="bline">
					<div class="list-dtxt">
						<div class="hotel-title c1e">{{item.goodsName}}</div>
						<div class="hotel-tips">{{item.goodsDetails}}</div>
						<div class="price">
							<small>¥</small>{{item.amount}}
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<!-- 店铺评论 -->
		<div class="comment-des">
			<!--  -->
			<div class="com-title c1e">精选评论</div>
			<div class="user-comonet" v-for="(item,index) in shoplist.goodsCommend" :key="index">
				<div class="user">
					<img class="user-img" v-lazy="item.headIcon" />
					<div class="user-text">{{item.nickName}}</div>
					<!-- <div class="user-card">{{item.userLevel}}</div> -->
				</div>
				<div class="user-comment-des">
					<div class="user-comment-des-text">
						{{item.content}}
					</div>
					<div class="user-comment-des-img">
						<img v-for="(item,index) in item.img" :key="index" v-lazy = "item"/>
					</div>
					<div class="goods-type">
						<div class="tl">{{item.specName}}</div>
						<div class="tr">{{item.time}}</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import tour from '../../server/tour.js';

	export default{
		data(){
			return {
				swiperOptionGood: {
					loop: true,
					slidesPerView: 'auto',
					spaceBetween: '1%',
					centeredSlides: false,
				},	
				params:{
					merchantId:''
				},
				shoplist:"",//店铺数据
				showcoupons:true,//优惠券展示
			}
		},
		mounted(){
			this.params.merchantId = this.$route.query.id;
			this.shop()
		},
		methods:{
			cancel(){
				this.$router.push({
					path:'/tour',
					query:{
						categoryId:4
					}
				})
			},
			// 优惠券
			goCouple(id){
				this.$router.push({
					path:'/couple',
					query:{
						id:id
					}
				})
			},
			// 店铺数据
			shop(){
				tour.shop(this.params).then(res =>{
					let code = res.code;
					if(code == 0){
						this.shoplist = res.data;
						if(res.data.coupons > 0){
							this.showcoupons = true
						}else{
							this.showcoupons = false
						}
					}else{
						console.log(res.message)
					}
				})
			},
			// 宝贝详情
			toDetail(id){
				this.$router.push({
				path:'/tourShopDetail',
				query:{
					id:id
				}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";
	.hotel-shop-detail-main{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		
		.header label{
			display: inline-block;
			width: 2.58rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.icon-search{
			width: .3rem;
			height: .3rem;
			display: inline-block;
			margin-right: .3rem;
		}
		/* 相册 start */
		.com-swiper-box {
			// height: 3.2rem;
			position: relative;
			-webkit-justify-content: center;
			display: flex;
			justify-content: center;
			-webkit-align-items: center;
			align-items: center;
			margin-top: .88rem;
			border-top: .16rem solid #f2f2f2;
		
			.banner-box {
				margin: .3rem 0 .3rem .3rem;
				.swiper-slide {
					width: 6.4rem;
					height: 3.2rem;
					transform: scale(0.9);
				}
				.swiper-slide img{
					width: 100%;
					height: 100%;
					border-radius: .04rem;
				}
				.swiper-slide-active {
					transform: scale(1)
				}
			}
			
		}
		
		/* 相册 end */
		/* 酒店详细*/
		.hotel-details{
			margin: 0 .3rem;
			position: relative;
			padding-bottom: .34rem;
			.h-details-title{
				display: flex;
				text-align: left;
				align-items: flex-start;
			}
			.label-title{
				display: inline-block;
				height: .34rem;
				max-width: 5rem;
				margin: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.bg-score{
				width: 1.8rem;
				height: .32rem;
				line-height: .34rem;
				font-size: .22rem;
				border-radius: 4px 20px 4px 20px;
				text-align:center;
				color:#fff;
				margin: 0 .1rem 0 .3rem;
				background: #ffba30;
			}
			.hotel-label{
				margin: .18rem 0 0;
				padding-bottom:.3rem;
				color: #7f7f7f;
				font-size: .22rem;
				 border-bottom: .01rem solid #f2f2f2;
				text-align: left;
			}
			
			.address{
				display: flex;
				text-align: left;
				justify-content: left;
				align-content: left;
				margin-top: .3rem;
			}
			.addr-title{
				min-width: 1.25rem;
				height: .3rem;
				display: flex;
				text-align: left;
				margin: 0;
			}
			.addr-title label{
				display: inline-block;
				margin: 0 0 0 .14rem;
				line-height: .3rem;
				vertical-align: middle;
			}
			.icon-address{
				width: .3rem;			
				height: .3rem;
			}
			.icon-address,.icon-phone{
				display: inline-block;
				margin: 0;			
				vertical-align: middle;
			}
			.icon-phone{
				width: .26rem;
				height: .26rem;
			}
			.address-txt{
				color: #7f7f7f;
				font-size: .26rem;
				margin: 0;
			}
			.couple{
				width: 1rem;
				height: .4rem;
				line-height: .4rem;
				position: absolute;
				color: #fff;
				font-size: .24rem;
				right: -.4rem;
				bottom: .44rem;
				background-image: linear-gradient(93deg,#ff99a7 0%,#fe7f9a 100%),linear-gradient(#f2f2f2, #f2f2f2);
				border-radius: .20rem 0 0 .2rem ;
			}
		}
		
		/*全部宝贝*/
		.hotel-list{
			border-top: .16rem solid #f2f2f2;
			text-align: left;
			.hotel-list-title{
				font-size: .3rem;
				margin: .3rem 0 .3rem .3rem;
			}
			.list-detail{
				display: flex;
				margin-top: .34rem;
			}
			.list-img{
				width: 2rem;
				height: 2rem;
				margin:0 0 0 .3rem;
			}
			.bline{
				border-bottom: 0.01rem solid #f2f2f2;
				margin: 0;
			}
			.list-dtxt{
				margin: 0 .3rem 0 .2rem;
				text-align: left;
			}
			.hotel-title{
				margin: .2rem 0 .15rem 0;
				width: 4.6rem;
				height: .36rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: .3rem;			
			}
			.hotel-tips{
				margin: .18rem 0 0;
				width: 4.3rem;
				height: .26rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;
				font-size: .22rem;
				color: #7f7f7f;
				text-align: left;
			}
			
			.price{
				font-size: .36rem;
				margin: .24rem 0 .4rem 0;
				color: #b50000;
			}
			.price small{
				font-size: .2rem;
			}
		}
		// 评论
			.comment-des{
				.com-title{
					font-size: .3rem;
					margin: .3rem 0 .3rem .3rem;
					text-align: left;
				}
			
			.user-comonet{
				padding: 0 .3rem;
				margin: .24rem 0 .34rem 0;
			}
			.user{
				display: flex;
				align-items: center;
			}
			.user-img{
				display: inline-block;
				width: .48rem;
				height: .48rem;
				margin: 0;
				border-radius: 50%;
			}
			.user-text{
				font-size: .28rem;
				color: #1e1e1e;
				margin:0 0 0 .15rem;
			}
			.user-card{
				font-size: .18rem;
				padding: .06rem 0.16rem;
				color: #cfba89;
				background-image: linear-gradient(90deg,#252525 0%,#505050 100%),linear-gradient(#e7e7e7,#e7e7e7);
				background-blend-mode: normal,normal;
				border-radius:.25rem;
				margin-left: .22rem;
			}
			.user-comment-des{
				margin:.15rem 0 0 .62rem;
				text-align: left;
			}
			.user-comment-des-text{
				font-size: .26rem;
				color: #1e1e1e;
			}
			.user-comment-des-img{
				margin-top: .32rem;
				display: flex;
				justify-content: space-between
			}
			.user-comment-des-img img{
				width: 2rem;
				height: 2rem;
				margin: 0;
				border-radius: 0.05rem;
			}
			.goods-type{
				display: flex;
				margin-top: .24rem;
				font-size: .24rem;
				color: #7f7f7f;
			}
			.goods-type .tl{
				text-align: left;
				flex: 2;
			}
			.goods-type .tr{
				text-align: right;
				flex: 1;
			}
			
		}
	}
</style>

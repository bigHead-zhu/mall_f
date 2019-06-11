<template>
	<div class="filmdetailMain">
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
		<!-- 店铺详细 -->
		<div class="hotel-details">
			<div class="h-details-title">
				<label class="label-title cle f34">{{shoplist.merchantName}}</label>
				<div class="bg-score">综合评分：{{shoplist.score}}</div>
			</div>
			<div class="address">
				<div class="address-titles ">
					<img class="icon-address" src="../../assets/hotel/icon-address.png"  />
					<label class="f26 c1e">地址：</label>
				</div>
				<div class="address-txt">
					{{shoplist.merchantAddress}}
				</div>
			</div>
			<div class="address">
				<div class="address-titles ">
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
		<div class="all-list">
			<div class="hotel-list-title c1e">全部宝贝</div>
			<ul class="all-list-ul">
				<li v-for="(item,index) in shoplist.filmGoodsVo" :key="index">
					<div class="title f32 c1e">{{item.goodsName}}</div>
					<div class="time f28">{{item.startTimes}}至{{item.startTimes}}可用</div>
					<div class="cursor">
						<label class="money"><small class="f24">¥</small>{{item.minAmount}}</label>
						<label class="buy-btn" @click="toDetail(item.id)" >抢购</label>
					</div>
				</li>
			</ul>
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
	import film from '../../server/film.js';

	export default{
		data(){
			return {
				swiperOptionGood: {
					loop: true,
					slidesPerView: 'auto',
					spaceBetween: '0.5%',
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
						path:'/film',
						query:{
							categoryId:2
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
					film.shop(this.params).then(res =>{
						console.log(res)
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
						path:'/filmShopDetail',
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
	.filmdetailMain{
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
					transform: scale(0.8);
				}
				.swiper-slide img{
					width: 100%;
					height: 100%;
					border-radius: .04rem;
				}
				.swiper-slide-active {
					transform: scale(0.9)
				}
			}
			
		}
		
		/* 相册 end */
		/* 店铺详细*/
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
				height: .36rem;
				max-width: 5rem;
				margin: 0;
				line-height: .36rem;
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
			.address{
				display: flex;
				text-align: left;
				justify-content: left;
				align-content: left;
				margin-top: .3rem;
			}
			.address-titles{
				min-width: 1.25rem;
				height: .3rem;
				display: flex;
				text-align: left;
				margin: 0;
			}
			.address-titles label{
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
		.all-list{
			border-top: .16rem solid #f2f2f2;
			text-align: left;
			.hotel-list-title{
				font-size: .3rem;
				margin: .3rem 0 .3rem .3rem;
			}
			.all-list-ul{
				margin: 0 .3rem;
			}
			.all-list-ul li{
				height: 2.28rem;
				margin-bottom: .3rem;
				overflow: hidden;
				background-image: url('../../assets/film/film-couple.png');
				background-size: 100% 100%;
				.title{
					margin: .44rem 0 0 .6rem;
				}
				.time{
					margin: .14rem 0 0 .6rem;
					color: #9c9c9c;
				}
				.cursor{
					margin: .28rem 0 0 .6rem;
					color: #f90;
					height: .4rem;
					align-items: center;
					display: flex;
				}
				.money{
					font-size: .50rem;
					margin-left: 0;
					font-weight: bold;
				}
				.money small{
					font-weight: normal;
					margin-right: .06rem;
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

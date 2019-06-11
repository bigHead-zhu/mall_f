<template>
	<div class="pay">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">支付结果</label>
		</div>
		<!-- 支付状态 -->
		<div class="pay-state">
			<div class="pay-txt">
				<img src="../../assets/hotel/icon-pay.png" />
				<p class="f34 c1e">支付成功</p>
			</div>
			<div class="pay-btn">
				<label class="pay-btn-left" @click="toIndex">返回首页</label>
				<label class="pay-btn-right" @click="toOrder()">查看订单</label>
			</div>
		</div>
		<div class="goods-list" v-if="searchGoodsData.length>0">
			<!-- 精品推荐标题 -->
			<div class="goods-c-detail-title">
				<img class="bg-line-left" src="../../../static/img/bg-line-left.png" />
				<label class="bg-title c1e f26">为你推荐</label>
				<img class="bg-line-right" src="../../../static/img/bg-line.png" />
			</div>
			<!-- 搜索列表 -->
				<ul class="goods-ul clear" >
					<li v-for="(item,index) in searchGoodsData" :key ="index"
					  @click = 'toDetail(item.goodsId)'>
						<div class="goods-li">
							<img class="goods-img" :src="item.goodsImg" />
						</div>
						<div class="title tleft ">
							<p class="goods-title">{{item.goodsName}}</p>
							<label class="money">¥{{item.retailAmount}}</label>
						</div>
					</li>
				</ul>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchGoodsData:[],
				goods:{//爆品推荐
					source:0,
					userId:'',
					userToken:''
				},
			}
		},
		mouted(){
			this.goods.userId = common._getCookes('userid') || undefined
			this.goods.userToken = common._getCookes('code_token') || undefined
			this.topGoods();
		},
		methods: {
			cancel() {
				this.$router.push("/car")
			},
			toIndex(){
				// 去首页
				this.$router.push("/")
			},
			toOrder(){
				// 去订单
				this.$router.push("/order1")
			},
			/*爆品推荐*/
			topGoods(){
				order.carRecomm(this.goods).then(res =>{
					let code = res.code;
					console.log(res)
					if(code==0){
						if(res.data.length > 0){
							this.pagecount = Math.ceil(res.data.count / this.goods.pageSize)
							this.searchGoodsData = this.searchGoodsData.concat(res.data);
							if(this.goods.fromNum >= this.pagecount || this.goods.pageSize > this.pagecount){
							  this.loadingstate = false
							  this.loadingtext = '没有更多了~'
							}
						}else{
							console.log(res.message);
						}
					}else{
							console.error(res.message);
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../../static/css/style.css";
	
	.pay{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content:center;
			align-items: center;
			background: #fff;
			z-index:999;
			position: fixed;
			top: 0;
			left: 0;
			border-bottom: 0.01rem solid #eee;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.header label{
			display: inline-block;
			flex: 1;
			font-family: 'pf-Bold'
		}
		/*支付状态*/
		.pay-state{
			border-top: .16rem solid #f2f2f2;
			margin-top: .88rem;
			font-family: 'pf-Medium';
			.pay-txt img{
				width: 1.28rem;
				height: 1.18rem;
				margin: .2rem  0;
			}
			.pay-btn{
				margin-top: .32rem;
			}
			.pay-btn label{
				display: inline-block;
				width: 1.8rem;
				height: .6rem;
				color:#ffba30;
				line-height: .6rem;
				font-size: .28rem;
				border: .01rem solid #ffba30;
				border-radius: .3rem;
			}
			.pay-btn-left{
				margin-left: 1.28rem;
			}
			.pay-btn-right{
				margin-right: 1.28rem;
			}
			
		}
		/*兑换码*/
		.code{
			width: 100%;
			height: 3.04rem;
			margin-top: .6rem;
			overflow: hidden;
			background: #fff4e6 ;
		}
		.code-bg{
			width: 3.4rem;
			height: 2.56rem;
			font-size: .24rem;
			line-height: .24rem;
			color: #666;
			overflow: hidden;
			margin:.25rem auto 0 auto;
			background-image: url('../../assets/hotel/bg-code.png');
			background-size: 100% 100%;
		}
		.code-title{
			margin-top: .88rem;
		}
		.code-num{
			margin-top: .15rem;
		}
		.copy-btn{
			width: 1.68rem;
			height: .4rem;
			line-height: .4rem;
			margin: .3rem auto 0;
			color: #fff;
			background-color: #ff3738;
			border-radius: .06rem;
		}
		.goods-list {
			margin-bottom: 1rem;
			border-top:.16rem solid #f2f2f2;
		}
		
		.goods-ul {
			margin: 0 .3rem;
		}
		
		.goods-ul li {
			float: left;
			width: 3.4rem;
			margin-top: .35rem;
		}
		.goods-ul li:last-child{
			border-bottom: none;
		}
		.goods-ul li:nth-child(2n-1) {
			margin-right: .1rem;
		}
		.goods-img {
			width: 3.4rem;
			height: 3.4rem;
			border-radius: .04rem;
		}
		.title {
			width: 100%;
			font-size: .24rem;
		}
		
		.goods-title {
			width: 100%;
			text-overflow: ellipsis;
			overflow: hidden;
			margin-top: .23rem;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}
		
		.money {
			color: #b50101;
			display: inline-block;
			margin-top: .15rem;
			font-family: 'pf-Blod';
		
		}
		
	}
</style>

<template>
	<div class="pay">
		<div class="header">
			<!-- <img class="icon-left" src="../../../static/img/icon-left-blod.png"/> -->
			<label class="header-title">支付结果</label>
		</div>
		<!-- 支付状态 -->
		<div class="pay-state">
			<div class="pay-txt">
				<img src="../../assets/hotel/icon-pay.png" />
				<p class="f34 c1e">支付成功</p>
			</div>
			<div class="pay-btn">
				<label class="pay-btn-left" @click="toIndex()">返回首页</label>
				<label class="pay-btn-right" @click="toOrder(id,orderId)">查看订单</label>
			</div>
		</div>
		<!-- 兑换码 -->
		<div class="code">
			<div class="code-bg">
				<p class="code-title">商品兑换码</p>
				<input class="code-num" id="copy" type="text" v-model="orderId" readonly="readonly" />
				<input  class="copy-btn" type="button" value="复制兑换码"  @click="Copy()"/>
			</div>
		</div>
		<!-- 为你推荐 -->
		<div class="foryou" v-if="searchGoodsData.length>0">
			<!-- 精品推荐标题 -->
			<div class="foryou-title f26 c1e">
				<img src="../../../static/img/bg-line-left.png" />
				为你推荐
				<img src="../../../static/img/bg-line.png" />
			</div>
			<!-- 搜索列表 -->
				<ul class="goods-ul clear" >
					<li v-for="(item,index) in searchGoodsData" :key ="index"
					  @click = 'toDetail(item.goodsCategoryId,item.goodsId)'>
						<div class="goods-li">
							<img class="goods-img" :src="item.goodsImg" />
						</div>
						<div class="title tleft">
							<p class="goods-title">{{item.goodsName}}</p>
							<label class="money">¥{{item.retailAmount}}</label>
						</div>
					</li>
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
	import order from '../../server/order.js'
	import common from '../../plugins/common.js';
	import message from '../../components/message.vue';

	export default{
		components:{
			message,
		},
		data(){
			return{
				copyBtn:null,//存储初始化复制按钮
				searchGoodsData:[],
				goods:{//爆品推荐
					source:0,
					userId:'',
					userToken:''
				},
				id:"",
				orderId:'',//序列号商品码
				detailId:'',
				sendVal: '',
				msgContent: '',
			}
		},
		mounted(){
			this.goods.userId = common._getCookes('userid') || undefined
			this.goods.userToken = common._getCookes('code_token') || undefined
			this.id = this.$route.query.classifiId;
			this.orderId = this.$route.query.orderId;
			this.detailId = this.$route.query.detailId;
			this.topGoods();
		},
		methods: {
			 Copy(){
			  let url = document.querySelector('#copy');
			  url.select(); // 选择对象
			  document.execCommand("Copy");
			},
			toIndex(){
				// 去首页
				this.$router.push("/index");
			},
			toOrder(id,detailId){
				// 判断商品分类去订单详情
				this.$router.push({
					path:'/hotelOrderDetail',
					query:{
						Id:detailId,
						classifiId:id,
					}
				})		
			},
			/**
			 * 商品详情
			 * 1：商城  2：住宿  3：餐饮  4：旅游  5：电影
			 */
			toDetail(category,goodsID){
				if (category==2){
					this.goodsDetail(category,"/hotelGoodsDetail",goodsID)
				}else if(category==3){
					this.goodsDetail(category,"/foodDetail",goodsID)
				}else if(category==5){
					this.goodsDetail(category,"/filmShopDetail",goodsID)
				}else if(category==4){
					this.goodsDetail(category,"/tourShopDetail",goodsID)
				}else {
					this.goodsDetail(category,"/goodsDetail",goodsID)
				}
			},
			goodsDetail(category,path,id){
				if(category==2||category==3||category==4||category==5){
					this.$router.push({
						path:path,
						query:{
							id:id
						}
					})
				}else{
					this.$router.push({
						path:path,
						query:{
							goodsId:id
						}
					})
				}
				
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
			// 
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
	
	.pay{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		
		.header label{
			display: inline-block;
			flex: 1;
		}
		/*支付状态*/
		.pay-state{
			border-top: .16rem solid #f2f2f2;
			margin-top: .88rem;
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
				margin-left: 1.5rem;
			}
			.pay-btn-right{
				margin-right: 1.5rem;
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
			width: 86%;
			background: transparent;
			text-align: center;
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
		/*为你推荐*/
		.foryou{
			border-top: .16rem solid #f2f2f2;
		}
		.foryou-title{
			margin-top: .3rem;
		}
		.foryou-title img{
			width: .2rem;
			height: .18rem;
			vertical-align: middle;
		}
		.goods-ul {
			margin: 0 .3rem;
		}
		.goods-ul li {
			float: left;
			width: 3.4rem;
			margin-top: .35rem;
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
		}
	}
</style>

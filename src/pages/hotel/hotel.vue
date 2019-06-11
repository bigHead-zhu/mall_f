<template>
	<!-- 酒店住宿 -->
	<div class="hotel-main">
		<!-- 顶部导航star -->
		<div class="header f28">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="toindex"/>
			<div class="type-search">
				<img class="icon-search" src="../../../static/img/icon-search.png" />
				<input class="search-input f28" type="text" placeholder="搜索酒店名"  readonly="readonly" @click="tosearch"/>
			</div>
			<div class="addr-text c1e" @click="maskLayer">
				{{local.localposition}}
			</div>
		</div>
		<!-- 顶部导航end -->
		<!-- 主轮播 -->
		<div class="banner">
			<swiper :options="swiperOption" class="banner-box">
				<swiper-slide v-for="(item,index) in banner" :key = "index">
					<img v-lazy="item.bannerImg" @click="tolink(item.jumpId,item.type,item.position)"/>
				</swiper-slide>
			</swiper>
			<div class="swiper-pagination" id="hotel-banner-pagination"></div>
		</div>
		<!-- 主轮播end -->
		<!-- 精品推荐 -->
		<div class="hotel-list">
			<!-- 精品推荐标题 -->
			<div class="goods-c-detail-title">
				<img class="bg-line-left" src="../../../static/img/bg-line-left.png" />
				<label class="bg-title c1e">精品推荐</label>
				<img class="bg-line-right" src="../../../static/img/bg-line.png" />
			</div>
			<!-- hotel list -->
			<!-- 有数据 -->
			<div v-show="showlist">
				<div class="list-detail" v-for="(item,index) in hotelList" :key="index" @click="toshop(item.id)">
					<img class="list-img" v-lazy="item.showImgs" />
					<div class="bline">
						<div class="list-dtxt">
							<div class="bg-score">综合评分：{{item.score}}</div>
							<div class="hotel-title f32 c1e">{{item.merchantName}}</div>
							<div class="hotel-label">
								<label class="label-code" v-for="(item,index) in toObj(item.labels)" :key="index">{{item}}</label>
							</div>
							<div class="price">
								<small>¥</small>{{item.amount}}
							</div>
						</div>
					</div>
				</div>		
			</div>
			<div class="none-txt" v-show="!showlist">
				该城市暂无推荐数据~
			</div>
					
			</div>
			
			
		<!-- 精品推荐 end-->
		<!--  -->
		<!-- 蒙版 -->
		<!-- 地址 -->
		<city ref="city" @getCityData = "_getCityData"/>
	</div>

</template>

<script>
	import hotel from '../../server/hotel.js';
	import common from '../../plugins/common.js';
	import city from '../../components/address.vue';
	
	export default {
		components:{
			city
		},
		data() {
			return {
				swiperOption: {
					loop: true,
					autoplay: true,
					pagination: {
						el: '#hotel-banner-pagination',
						clickable: true,
					}
				},
				banner:'',
				local:{
					localposition:'',
					localareaId:''
				},//酒店位置
				params:{
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				hotelList:"",
				showlist:false,//T有
			}
		},
		mounted() {
			this.params.categoryId = this.$route.query.categoryId;
			this.local.localposition = common._getCookes('hotelCity') || '成都'
			this.local.localareaId = common._getCookes('hotelId') || '510100'
			this.hotel();
		},
		methods: {
		// 判断banner去向
		tolink(id,type,url){
			if(url == 0 || url ==1){
				// 首页					// 普通商家
				if(type == 0){
					this.$router.push({
						path:"/goodsDetail",
						query:{
							goodsId:id
						}
					})
				}else if(type==1){
					this.$router.push({
						path:"/company",
						query:{
							id:id
						}
					})
				}
			}else if(url == 2){
				// 酒店
				if(type == 0){
					this.$router.push({
						path:"/hotelGoodsDetail",
						query:{
							id:id
						}
					})
				}else if(type==1){
					this.$router.push({
						path:"/hotelDetail",
						query:{
							id:id
						}
					})
				}
			}else if(url == 3){
				if(type == 0){
					this.$router.push({
						path:"/filmShopDetail",
						query:{
							id:id
						}
					})
				}else if(type==1){
					this.$router.push({
						path:"/filmShop",
						query:{
							id:id
						}
					})
				}
			}else if(url == 4){
				if(type == 0){
					this.$router.push({
						path:"/foodDetail",
						query:{
							id:id
						}
					})
				}else if(type==1){
					this.$router.push({
						path:"/foodShop",
						query:{
							id:id
						}
					})
				}
			}else if(url==5){
				if(type==0){
					this.$router.push({
						path:"/tourShopDetail",
						query:{
							id:id
						}
					})
				}else if(type==1){
					this.$router.push({
						path:"/tourShop",
						query:{
							id:id
						}
					})
				}
			}
		},
			
			toindex(){
				this.$router.push("/")
			},
			// 地址窗口
			maskLayer(){
				this.$refs.city.open()
			},
			/*住宿模块*/
			hotel(){
				this.params.areaCode = this.local.localareaId;
				this.listData = []
				hotel.hotel(this.params).then(res =>{
					let code = res.code;
					if(code==0){
						this.banner = res.data.banners;
						if(res.data.count > 0){
							this.showlist = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.hotelList = res.data.hotelList;
						}else{
							this.showlist = false;
						}
					}else{
						console.error(res.message)
					}
				})
			},
			// 去店铺
			toshop(id){
				this.$router.push({
					path:'/hotelDetail',
					query:{
						id:id,
					}
				})
			},
			// 搜索
			tosearch(){
				this.$router.push({
					path:'/searchotel',
					query:{
						areaCode:this.local.localareaId,
						categoryId: this.$route.query.categoryId
					}
				})
			},
			// 转换标签类型
			toObj(item){
				if (typeof item == 'string') {
					let arr = []
					let obj = JSON.parse(item)
					for (let i in obj) {
					  arr.push(obj[i])
					}
					return arr
				  } else {
					return []
				  }
			},
			// 城市三级联动数据
			_getCityData(data) {
				this.$refs.city.close();
				this.local = data
				common._setCookie('hotelCity', data.localposition)
				common._setCookie('hotelId', data.localareaId)		
				this.hotelList = '';
				this.hotel();
			}
		},
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/classify.css";
	@import "../../../static/css/common.css";
	.hotel-main{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		// 精品推荐
		.hotel-list{
			border-top: 0.16rem solid #f1f1f1;
			.goods-c-detail-title {
				margin-top: .32rem;
				text-align: center;
				height: .3rem;
			}
			.bg-title{
				vertical-align: middle;
				font-size: .3rem;
			}
			.bg-line-left,
			.bg-line-right {
				display: inline-block;
				width: .4rem;
				height: .16rem;
				vertical-align: middle;
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
			.bg-score{
				width: 2rem;
				height: .32rem;
				line-height: .34rem;
				font-size: .22rem;
				border-radius: 4px 20px 4px 20px;
				text-align:center;
				color:#fff;
				margin:.1rem 0 0;
				background: #ffba30;
			}
			.hotel-title{
				margin: .2rem 0 .15rem 0;
				width: 4.6rem;
				height: .32rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;				
			}
			.hotel-labels{
				width: 100%;
				display: flex;
			}
			.label-code{
				display: inline-block;
				padding: .06rem .14rem;
				line-height: .22rem;
				font-size: .22rem;
				font-family:'pf-Regular';
				color: #7f7f7f;
				background-color: #f6f6f6;
				border-radius: .17rem;
				margin-right: .10rem;
			}
			.price{
				font-size: .36rem;
				margin: .24rem 0 .4rem 0;
				font-family:'pf-Bold';
				color: #b50000;
			}
			.price small{
				font-size: .2rem;
			}
		}
		
		.none-txt{
			font-size: .26rem;
			text-align: center;
			color: #666;
			margin-top: .30rem;
		}
	}
	
</style>

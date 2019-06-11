<template>
	<!-- 酒店住宿 -->
	<div class="tourmain">
		<!-- 顶部导航star -->
		<div class="header f28" >
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="toindex"/>
			<div class="type-search">
				<img class="icon-search" src="../../../static/img/icon-search.png" />
				<input class="search-input f28" type="text" placeholder="搜索商品名称"  readonly="readonly" @click="tosearch"/>
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
			<div class="swiper-pagination" id="tour-banner-pagination"></div>
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
			<!-- 旅游列表 -->
			<ul class="tour-list clear">
				<scrollto :datalist="hotelList" @scrollend="nextList">
					<li v-for="(item,index) in hotelList" :key="index" @click="todetail(item.merchantId)">
						<div class="goods">
							<div class="goods-img">
								<img v-lazy="item.goodsImg" />
							</div>
							<div class="title tleft">
								<p class="goods-title f28 c1e">{{item.goodsName}}</p>
								<label class="money f32">¥{{item.minAmount}}</label>
							</div>
						</div>
					</li>
					<li 
					  class="loadingmore">
					  <img 
						v-if="loadingstate"
						src="../../../static/img/img_list_loading.gif">
					  {{loadingtext}}
					</li>
				</scrollto>
			</ul>
		</div>
		<!--  -->
		<!-- 地址 -->
		<city ref="city" @getCityData = "_getCityData"/>
</div>
</template>

<script>
	import hotel from '../../server/hotel.js';
	import tour from '../../server/tour.js';
	import scrollto from '../../components/scrollto.vue';
	import common from '../../plugins/common.js';
	import city from '../../components/address.vue';
	
	export default{
		components:{
			scrollto,
			city
		},
		data(){
			return{
				swiperOption: {
					loop: true,
					autoplay: true,
					pagination: {
						el: '#tour-banner-pagination',
						clickable: true,
					}
				},		
				banner:"",//轮播图
				local:{
					localposition:'',
					localareaId:''
				},//酒店位置
				params:{
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				hotelList:[],
				showlist:false,//T有
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
		mounted() {
			this.params.categoryId = this.$route.query.categoryId
			this.local.localposition = common._getCookes('tourcity') || '成都'
			this.local.localareaId = common._getCookes('tourcityId') || '510100'
			this.tour();
		},
		methods:{
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
				//回首页
				this.$router.push("/")
			},
				// 地址窗口
				maskLayer(){
					this.mask = !this.mask;
					this.$refs.city.open()
					if (this.mask) {
					  document.body.style.overflow = 'hidden'
					} else {
					  document.body.style.overflow = 'initial'
					}
				},
				/*旅游模块*/
				tour(){
					this.params.areaCode = this.local.localareaId;
					this.listData = []
					tour.tour(this.params).then(res =>{
						console.log(res)
						let code = res.code;
						if(code==0){
							this.banner = res.data.banners;
							if(res.data.count > 0){
								
								this.showlist = true;
								this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
								this.hotelList = res.data.tourismVo;
								if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
								  this.loadingstate = false
								  this.loadingtext = ''
								}
							}else{
								this.showlist = false;
								this.loadingstate = false
								this.loadingtext = '暂无推荐数据'
							}
						}else{
							console.log(res.message)
						}
					})
				},
			// 去店铺
			todetail(id){
				this.$router.push({
					path:'/tourShop',
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
			/* 下一页 */
			nextList() {
				console.log(this.params.fromNum < this.pagecount)
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.tour()
			  }
			},
			// 城市三级联动数据
			_getCityData(data) {
				this.$refs.city.close();
				this.local = data
				common._setCookie('tourcity', data.localposition)
				common._setCookie('tourcityId', data.localareaId)	
				this.hotelList = '';
				this.tour();
			}
		
		}
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/common.css";
	@import "../../../static/css/classify.css";
	.tourmain{
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
			/* 商品 */
			.tour-list{
				margin: .32rem  .3rem 0;
			}
			.tour-list li{
				float: left;
				list-style: none;
				margin-bottom: .4rem;
			}
			.tour-list li:nth-child(2n-1){
				margin-right: .1rem;
			}
			.goods{
				width: 3.4rem;
				height: 4.4rem;  
			}
			.goods-title{
				width:100%;
				text-overflow:ellipsis;
				overflow: hidden;
				margin-top: .23rem;
				line-height: .32rem!important;
				white-space: nowrap;
			}
			.money{
				color: #b50101;
				display: inline-block;
				margin-top: .15rem;
			}
			
			.goods .goods-img{
				width:100%;
				height: 3.4rem;
			}
			.goods .goods-img img{
				width: 100%;
				height: 100%;
			}
		}
}
</style>

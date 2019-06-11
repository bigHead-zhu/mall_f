<template>
	<!-- 电影 -->
	<div class="filmmain">
		<!-- 顶部导航star -->
		<div class="header f28">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="toindex"/>
			<div class="type-search">
				<img class="icon-search" src="../../../static/img/icon-search.png" />
				<input class="search-input" type="text" placeholder="搜索商品名称"  readonly="readonly" @click="tosearch"/>
			</div>
			<div class="addr-text c1e" @click="maskLayer()">
				{{local.localposition}}
			</div>
		</div>
		<!-- 主轮播 -->
		<div class="banner">
			<swiper :options="swiperOption" class="banner-box">
				<swiper-slide v-for="(item,index) in banner" :key = "index">
					<img v-lazy="item.bannerImg" @click="tolink(item.jumpId,item.type,item.position)"/>
				</swiper-slide>
			</swiper>
			<div class="swiper-pagination" id="film-banner-pagination"></div>
		</div>
		<!-- 主轮播end -->
		<!-- 电影列表 -->
		<div class="film-list">
			<ul class="film-list-ul">
				<scrollto :datalist="filmList" @scrollend="nextList">
					<li v-for="(item,index) in filmList" :key="index" @click="todetail(item.id)">
						<div class="film-left">
							<div class="title">
								<label class="film-name f32 c1e">{{item.merchantName}}</label>
								<label class="bg-score">好评：{{item.score}}</label>
							</div>
							<div class="address f26 caaa">
								地址：{{item.merchantAddress}}
							</div>
						</div>
						<div class="film-right">
							<label class="num">{{item.minAmount}}</label><small>元</small><small class="caaa">起</small>
						</div>
					</li>
					<li 
						 class="loadingmore">
						<img 
						v-if="loadingstate"
						src="../../../static/img/img_list_loading.gif">
						{{ loadingtext }}
					</li>
				</scrollto>
			</ul>
				
		</div>
		
		<city ref="city" @getCityData = "_getCityData"/>
		
	</div>
</template>

<script>
	import hotel from '../../server/hotel.js';
	import film from '../../server/film.js';
	import scrollto from '../../components/scrollto.vue';
	import common from '../../plugins/common.js';
	import city from '../../components/address.vue';
	
	export default {
		components:{
			scrollto,
			city,
		},
		data() {
			return {
				swiperOption: {
					loop: true,
					autoplay: true,
					pagination: {
						el: '#film-banner-pagination',
						clickable: true,
					}
				},
				mask:false,
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
				filmList:[],
				showlist:false,//T有
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
			mounted() {
				this.params.categoryId = this.$route.query.categoryId
				this.local.localposition = common._getCookes('filmcity') || '成都'
				this.local.localareaId = common._getCookes('filmId') || '510100'
				this.film();
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
					this.$refs.city.open()
				},	
				/*电影模块*/
				film(){
					this.params.areaCode = this.local.localareaId;
					this.listData = []
					film.film(this.params).then(res =>{
						console.log(res)
						let code = res.code;
						if(code==0){
							this.banner = res.data.banners;
							if(res.data.count > 0){
								this.showlist = true;
								this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
								this.filmList = res.data.filmListVo;
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
						path:'/filmShop',
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
				_getCityData(data) {
					// data
					this.$refs.city.close()
					this.local = data
					common._setCookie('filmCity', data.localposition)
					common._setCookie('filmId', data.localareaId)
					this.hotelList = '';
					this.film();
				},
				
			
		},
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/common.css";
	@import "../../../static/css/classify.css";
	
	.filmmain{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;

		/*电影院列表*/
		.film-list{
			border-top: .16rem solid #f2f2f2;
			.film-list-ul{
				margin: 0 .3rem;			
			}
			.film-list-ul li{
				border-bottom: 1px solid #f2f2f2;
				display: flex;
				align-items: center;
				min-height: 1.44rem;
			}
			.film-left{
				width: 5.55rem;
				text-align: left;
			}
			.film-name{
				display: inline-block;
				max-width: 3.7rem;
				height: .32rem;
				overflow: hidden;
				vertical-align: middle;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.bg-score{
				display: inline-block;
				width: 1.5rem;
				height: .30rem;
				line-height: .34rem;			
				vertical-align: middle;
				font-size: .22rem;
				border-radius: 4px 20px 4px 20px;
				text-align:center;
				color:#fff;
				margin:-.12rem 0 0;
				margin: 0;
				vertical-align: middle;
				background: #ffba30;
			}
			.film-right{
				margin: -.32rem 0 0;
				color: #b50000;
				font-size: .22rem;
			}
			.film-right .num{
				font-size: .32rem;
				font-weight: bold;
			}
			.caaa{
				color: #aaa;
			}
			.address{
				margin-top: .12rem;
				
			}
		}
		/* 加载更多 */
		.loadingmore {
			margin: 0!important;
		  height: 0.92rem;
		  line-height: 0.92rem;
		  width: 100%!important;
		  text-align: center;
		  color: #666;
		  padding: 0 !important;
		  font-size: 0.28rem;
		  background-color: #fff;
		  font-weight: bold;
		  img{
			vertical-align: middle;
			width: 0.3rem;
			height: 0.3rem;
		  }
		}
}
</style>

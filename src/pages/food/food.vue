<template>
	<!-- 酒店住宿 -->
	<div class="foodmain">
		<!-- 顶部导航star -->
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="toindex" />
			<div class="type-search">
				<img class="icon-search" src="../../../static/img/icon-search.png" />
				<input class="search-input f28" type="text" placeholder="搜索商家"  readonly="readonly" @click="tosearch"/>
			</div>
			<div class="addr-text c1e" @click="maskLayer">{{local.localposition}}</div>
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
		<!-- 优质商家 -->
		<div class="hotel-list">
			<!-- 优质商家标题 -->
			<div class="goods-c-detail-title">
				<img class="bg-line-left" src="../../../static/img/bg-line-left.png" />
				<label class="bg-title c1e">优质商家</label>
				<img class="bg-line-right" src="../../../static/img/bg-line.png" />
			</div>
			<!-- 排序 -->
			<ul class="goods-search-type">
				
				<li v-for='(item,index) of searchType' :key="index" :class="[index==searchTypeIndex?'active':'']" @click="_searchfn(index)">
					<div :sortId = "index">
						{{item.name}}
						<label class="icon-up" :class="[item.upstate?'present':'']" @click.stop="_upstate(index)"></label>
						<label class="icon-down" :class="[item.downstate?'present':'']" @click.stop="_downstate(index)"></label>
					</div>
				</li>
			</ul>	
			<!-- 商品列表 -->
			<div class="list-detail" v-for="(item,index) in hotelList" :key="index" v-show="showlist" @click="toshop(item.id)">
				<img class="list-img" v-lazy="item.showImgs" />
				<div class="bline">
					<div class="list-dtxt">
						<div class="bg-score">综合评分：{{item.score}}</div>
						<div class="hotel-title f32 c1e">{{item.merchantName}}</div>
						<div class="hotel-label">
							<label class="label-code " :class="(index%2==0)?'person-money':'mounth-num'"
							 v-for="(item,index) in toObj(item.labels)" :key="index">{{item}}</label>
						</div>
						<div class="price">
							<small>¥</small>{{item.amount}}
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
	import food from '../../server/food.js';
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
					},
					navigation:{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				},
				// 搜索分类
				searchType: [{
					name: '价格',
					upstate: false,
					downstate: false
				}, {
					name: '销量',
					upstate: false,
					downstate: false
				}, {
					name: '好评',
					upstate: false,
					downstate: false
				}],
				// 搜索分类索引
				searchTypeIndex:-1,
				banner:"",//轮播图
				local:{
					localposition:'',
					localareaId:''
				},//酒店位置
				params:{
					sort:0,
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				hotelList:'',
				showlist:false,//T有
				
			}
		},mounted() {
			this.local.localposition = common._getCookes('foodcity') || '成都'
			this.local.localareaId = common._getCookes('foodcityId') || '510100'
			this.food();
		},
		methods: {
			tolink(id,type,url){
				if(type==1){
					if(url == 1){
						this.$router.push({
							path:"/company",
							query:{
								id:id
							}
						})
					}else if(url == 2){
						this.$router.push({
							path:"/hotelDetail",
							query:{
								id:id
							}
						})
					}else if(url == 3){
						this.$router.push({
							path:"/filmShop",
							query:{
								id:id
							}
						})
					}else if(url == 4){
						this.$router.push({
							path:"/foodShop",
							query:{
								id:id
							}
						})
					}else if(url == 5){
						this.$router.push({
							path:"/tourShop",
							query:{
								id:id
							}
						})
					}
				}else if(type==0){
					if(url ==0){
						this.$router.push({
							path:"/index"
						})
					}else if(url == 1){
						this.$router.push({
							path:"/goodsDetail",
							query:{
								goodsId:id
							}
						})
					}else if(url == 2){
						this.$router.push({
							path:"/hotelGoodsDetail",
							query:{
								id:id
							}
						})
					}else if(url == 3){
						this.$router.push({
							path:"/filmShopDetail",
							query:{
								id:id
							}
						})
					}else if(url == 4){
						this.$router.push({
							path:"/foodDetail",
							query:{
								id:id
							}
						})
					}else if(url == 5){
						this.$router.push({
							path:"/tourShopDetail",
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
			_searchfn(index) {
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				that.searchType[index].downstate = true
			},
			_upstate(index){
				//降序排列
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				switch (parseInt(index)){
					case 0:
						this.params.sort = 1
						break;
					case 1:
						this.params.sort = 2
						break;
					case 2:
						this.params.sort = 3
						break;
				}
				that.searchType[index].upstate = true
				this.clearList()
				this.food();
			},
			_downstate(index){
				//排序
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				switch (parseInt(index)){
					case 0:
						this.params.sort = 0
						break;
					case 1:
						this.params.sort = 2
						break;
					case 2:
						this.params.sort = 3
						break;
				}
				that.searchType[index].downstate = true
				this.clearList()
				this.food();
			},
			maskLayer(){
				this.$refs.city.open();
			},
			/*food模块*/
			food(){
				this.params.areaCode = this.local.localareaId;
				this.listData = []
				food.food(this.params).then(res =>{
					console.log(res)
					let code = res.code;
					if(code==0){
						this.banner = res.data.banners;
						if(res.data.count > 0){
							this.showlist = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.hotelList = res.data.hoteListVo;
						}else{
							this.showlist = false;
						}
					}else{
						console.error(res.message)
					}
				})
			},
		
			clearList() {
				this.params.fromNum = 1;
				this.hotelList.length = 0
			},
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.food()
			  }
			},
			// 去店铺
			toshop(id){
				this.$router.push({
					path:'/foodShop',
					query:{
						id:id,
					}
				})
			},
			// 转换类型
			toObj(item){
				console.log(typeof item == 'string')
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
			_getCityData(data) {
				// data
				this.$refs.city.close();
				this.local = data
				common._setCookie('foodcity', data.localposition)
				common._setCookie('foodcityId', data.localareaId)
				this.hotelList = '';
				this.food();
			}
		},
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/common.css";
	@import "../../../static/css/classify.css";
	.foodmain{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		
		// 精品推荐
		.hotel-list{
			border-top: 0.16rem solid #f1f1f1;
			.goods-c-detail-title {
				text-align: center;
				height: .6rem;
				background: #f1f1f1;
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
			/*排序*/
			.goods-search-type {
				display: flex;
				height: .76rem;
				justify-content: center;
				align-items: center;
			}
			
			.goods-search-type .active {
				color: #feb336;
			}
			
			.goods-search-type div {
				position: relative;
				flex: 1;
				width: 1.2rem;
				height: .3rem;
				font-size: .28rem;
				line-height: .3rem;
			}
			
			.icon-down,
			.icon-up {
				width: .14rem;
				height: .07rem;
				position: absolute;
				right: 0rem;
				background-repeat: no-repeat;
				background-size: .14rem .07rem;
			}
			.icon-up {
				top: .05rem;
				background-image: url(../../../static/img/icon-up.png);
			}
			
			.icon-down {
				bottom: .05rem;
				background-image: url(../../../static/img/icon-down.png);
			}
			
			.icon-up.present {
				top: .05rem;
				background-image: url(../../../static/img/icon-up-active.png);
			}
			
			.icon-down.present {
				bottom: .05rem;
				background-image: url(../../../static/img/icon-down-active.png);
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
				height: .34rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;				
			}
			.label-code{
				display: inline-block;
				padding: .06rem .14rem;
				line-height: .22rem;
				font-size: .22rem;
				background-color: #fff;
				border-radius: .17rem;
				margin:0 .10rem .1rem 0;
			}
			.person-money{
				color: #ff657b;
				border: 1px solid #ff657b
			}
			.mounth-num{
				color: #38caff;
				border: 1px solid #38caff;
			}
			.price{
				font-size: .36rem;
				line-height: .36rem;
				margin: .24rem 0 .4rem 0;
				color: #b50000;
			}
			.price small{
				font-size: .2rem;
			}
		}
		
		
	}
</style>

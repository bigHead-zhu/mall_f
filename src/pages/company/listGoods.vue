<template>
	<div class="main-goods-search" id="main-goods">
		<div class="header">
			<div class="header-nav-title">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
				<label>商品</label>
				<img class="icon-search" src="../../../static/img/icon-search.png" @click="tosearch()"/>
			</div>
			<ul class="goods-search-type">
				<li v-for='(item,index) of searchType' :key="index" :class="[index==searchTypeIndex?'active':'']" @click="_searchfn(index)">
					<div>
						{{item.name}}
						<label class="icon-up" :class="[item.upstate?'present':'']" @click.stop="_upstate(index)"></label>
						<label class="icon-down" :class="[item.downstate?'present':'']" @click.stop="_downstate(index)"></label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 商品列表 -->
		<div class="goods-list">
			<scrollto :datalist="searchGoodsData" @scrollend="nextList">
				<ul class="goods-ul clear" v-show="showGoods">
					<li v-for="(item,index) in searchGoodsData" :key="index"
					 @click = 'toDetail(item.goodsId)'>
						<div class="goods-li">
							<img class="goods-img" :src="item.goodsImg" />
						</div>
						<div class="title tleft">
							<p class="goods-title">{{item.goodsName}}</p>
							<div class="title-desc">
								<label class="title-money f32">¥{{item.amount}}</label>
								<label class="gray">{{item.sale}}人付款</label>
							</div>
						</div>
					</li>
				</ul>
			</scrollto>
			<!-- 无记录 -->
			<div class="goods-none"  v-show="showGoods==false">
				<img src="../../../static/img/none-goods.png"/>
				<div class="none-txt">当前暂无搜索结果~</div>
			</div>
		</div>
	</div>
</template>

<script>
	import common from '../../plugins/common.js';
	import shop from '../../server/shop.js';
	import scrollto from '../../components/scrollto.vue';
	export default {
		components:{
			scrollto
		},
		data() {
			return {
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
				props:['goodList'],
				// 商品列表
				params:{
					merchantId:'',
					merchCategoryId:'',
					fromNum:1,
					pageSize:10,
					type:0,
					level:''

				},
				// 加载更多
				showGoods:true,
				loadingstate: true,
				loadingtext: '正在加载',
				searchGoodsData:[],
				pagecount:"",
			}
		},
		mounted() {
			this.params.merchantId =  this.$route.query.merchantId;
			this.params.merchCategoryId =  this.$route.query.merchCategoryId;
			this.params.level =  this.$route.query.level;
			console.log(this.params.level)
			this.title = this.$route.query.title
			this.goodsList()
		},
		methods: {
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
				this.goodsList();
			},
			_downstate(index){
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
				this.goodsList();
			},
			cancel(){
				this.$router.go(-1)
			},
			tosearch(){
				this.$router.push("/searchCom")
			},
			/*列表*/
			goodsList(){
				shop.typeList(this.params).then(res =>{
					if(res.code==0){
						if(res.data.count > 0){
								this.showGoods = true;
								this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
								this.searchGoodsData = this.searchGoodsData.concat(res.data.goodsListVo);
								if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
								  this.loadingstate = false
								  this.loadingtext = '没有更多了~'
								}
							}else{
								this.showGoods = false
							}
						}else{
							console.log(res.message)
						}
				})
			},
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.goodsList()
			  }
			},
			clearList(){
				this.params.fromNum = 1;
				this.searchGoodsData.length = 0
			},
			/*商品详情*/
			toDetail(index){
				let goodsnum = index;
				console.log(goodsnum)
				this.$router.push({
					path:'/goodsDetail',
					query:{
						goodsId:goodsnum
					}
				})
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/css/style.css";
.main-goods-search{
	
		width: 100%;
		height: 100vh;
		overflow: auto;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: #fff;
	
	.header {
		width: 100%;
		padding-top: .18rem;
		position: fixed;
		background: #fff;
		overflow: hidden;
		z-index: 99;
		left: 0;
		font-family: 'pf-Bold';
		top: 0;
	}
	.header-nav-title{
		width: 100%;
		height: .88rem;
		display: flex;
		font-size: .34rem;
		color: #1e1e1e;
		justify-content:center;
		align-items: center;
		background: #fff;
		z-index:999;
	}
	.icon-left {
		width: .16rem;
		height: .28rem;
		display: inline-block;
		margin-left: .3rem;
	}
	.header label{
			display: inline-block;
			flex: 1;
		}
		.icon-search{
			width: .3rem;
			height: .3rem;
			display: inline-block;
			position: absolute;
			right: .3rem;
		}
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

	.goods-list {
		border-top: .16rem solid #f1f1f1;
		margin-top: 1.58rem;
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
	.title-desc{
		display: flex;
		margin-top: .15rem;
		align-items: center;
	}
	.title-money{
		color: #b50101;
		font-family:'pf-Bold';
		margin-left: .1rem;
		display: inline-block;
	}
	.gray{
		color: #aaa;
		font-size: .26rem;
		margin-right: .15rem;;
	}
	}
	
</style>

<template>
	<div class="car">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>购物车</label>
			<div class="c1e edit" v-show="showEdit" @click="edit()">{{editTxt}}</div>
		</div>
		<div v-show="showcarList">
			<!-- 购物车列表 -->
			<div class="car-list">
				<!-- <div class="car-adv-tips f24">
					新年特卖会，火热进行中！
				</div> -->
				<ul class="shop-goods">
					<!-- 购物车列表详细 -->
					<scrollto :datalist="shopGoodstList" @scrollend="nextList(carlist.fromNum,pagecount)">
					<li class="shop-goods-list" v-for="(items,index) in shopGoodstList" :key="index" >
						<!-- 店铺名字 -->
						<div class="shop-title">
							<!-- 选择框 -->
							<div class="check-box" @click="shopAll(index)" >
								<input type="checkbox"  v-model="items.checkState"/>
								<label class="checkbox-label"></label>
							</div>
							<div class="shop-name cle">
								{{items.merchantName}}
								<img class="icon-right" src="../../../static/img/icon-r-return.png" />
							</div>
						</div>
						<!-- 商品清单 -->
						<ul class="goods-list">
							<li class="goods-list-li" v-for="(item,levindex) in items.shoppingCart" :key="levindex" :style='item.moveStyle'
							v-swipeleft = "{fn:swipeleft,index:levindex+','+index}" v-swiperight = "{fn:swiperight,index:levindex+','+index}">
								<!-- 选择框 -->
								<div class="check-box">
									<input type="checkbox"  :checked ="item.ischeck" @click="sltActive(index, levindex)"/>
									<label class="checkbox-label"></label>
								</div>
								<div class="goods-img">
									<img v-lazy="item.specImg" />
								</div>
								<div class="goods-txt">
									<div class="goods-name c1e">
										{{item.goodsName}}
									</div>
									<div class="goods-type f24">
										{{item.specName}}
									</div>
									<div class="goods-choose">
										<div class="goods-price">
											<small class="f24">¥</small>{{item.vipPrices}}
										</div>
										<div class="goods-choose-input">
											<input type="button" class="buy-reduce"  @click="buyReduce(index,levindex)" value="-" />
											<input type="number" min="1" readonly="readonly"  class="buy-count" v-model="item.number" />
											<input type="button" class="buy-plus" @click="buyPlus(index,levindex)" value="+" />
										</div>
									</div>
								</div>
								<div class="del-btn del" @click="deleteList(index)">
									删除
								</div>
							</li>
						</ul>
					</li>
					</scrollto>
				</ul>
			</div>
			<!-- 管理栏 -->
			<div class="manager-nav" v-show="!editState">
				<!-- 选择框 -->
				<div class="all-check">
					<div class="check-box" @click="checkAll($event)">
						<input type="checkbox"  v-model="allState"/>
						<label class="checkbox-label"></label>
					</div>
					<label class="check-title">全选</label>
				</div>
				<div class="car-total-price">
					<label class="gray">合计：</label>
					<label class="money">¥{{price}}</label>
				</div>
				<div class="account-btn" @click="toOrder()">去下单</div>
				
			</div>
			<div class="manager-nav" v-show="editState">
				<!-- 选择框 -->
				<div class="all-check">
					<div class="check-box" @click="checkAll($event)">
						<input type="checkbox"  v-model="allState"/>
						<label class="checkbox-label"></label>
					</div>
					<label class="check-title">全选</label>
				</div>
				<div class="car-del" @click="allDel()">删除</div>
				
			</div>
			
		</div>
		<!-- 购物篮为空 -->
		<div class="carH"  v-show="!showcarList">
			<div class="nothing">
				<img class="none-img" src="../../assets/car/icon-no-car.png" />
				<p class="none-txt f28 c1e">您的购物车是空的哦，赶快去选购吧！</p>
			</div>
			<!-- 商品列表 -->
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
		<!-- 导航 -->
		<foot></foot>
		
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
	</div>
</template>

<script>
	import {swipeleft,swiperight} from '../../plugins/touchvue.js';
	import foot from '../../components/footer.vue';
	import order from '../../server/order.js';
	import search from '../../server/search.js';
	import common from '../../plugins/common.js';
	import message from '../../components/message.vue';
	import scrollto from '../../components/scrollto.vue';
	
	export default{
		components:{
			foot,
			message,
			scrollto

		},
		data(){
			return{
				sendVal: '',
				msgContent: '',
				delWidth:'',
				showEdit:false,//展示管理文字
				editState:false,//管理状态
				editTxt:"管理",
				shopGoodstList:[],
				shopallState:false,
				allState:false,//全选
				price:0,//总价
				carlist:{
					source:0,
					userId:'',
					userToken:'',
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				editParam:{
					// 修改购物车
					source:0,
					userId:'',
					userToken:'',
					shoppingCartvo:[
						{
							createTime:'',
							editType:2,
							freight:'',
							goodsId:'',
							goodsName:'',
							id:'',
							marketPrice:'',
							merchantId:'',
							specName:'',
							number:'',
							remark:'',
							specDesc:'',
							specId:'',
							status:0,
							supplyAmount:'',
							vipPrice:'',
						}
					]
				},
				delParam:{
					// 删除购物车
					source:0,
					userId:'',
					userToken:'',
					shoppingCartvo:[
						{
							createTime:'',
							editType:1,
							freight:'',
							goodsId:'',
							goodsName:'',
							id:'',
							marketPrice:'',
							merchantId:'',
							specName:'',
							number:'',
							remark:'',
							specDesc:'',
							specId:'',
							status:0,
							supplyAmount:'',
							vipPrice:'',
						}
					]
				},
				showcarList:false,//购物篮状态T有数据
				searchGoodsData:[],
				goods:{//爆品推荐
					source:0,
					userId:'',
					userToken:''
				},
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
				shoppinglist:[],//下单数据
			}
		},
		created(){
			// 
			this.$nextTick(() =>{
				let c = document.documentElement.clientWidth || document.body.clientWidth
					c = c >= 750 ? 750 : c
				this.delWidth = 1.4*(c / 7.5)
			})
		},
		computed: {
			get() {
				return this.price
			}
		},
		mounted() {
			this.carlist.userId = common._getCookes('userid') || undefined
			this.carlist.userToken = common._getCookes('code_token') || undefined
			
			this.editParam.userId = common._getCookes('userid') || undefined
			this.editParam.userToken = common._getCookes('code_token') || undefined
			
			this.delParam.userId = common._getCookes('userid') || undefined
			this.delParam.userToken = common._getCookes('code_token') || undefined
			
			this.goods.userId = common._getCookes('userid') || undefined
			this.goods.userToken = common._getCookes('code_token') || undefined
			this.getGoods()
			if(common._getCookes('userid') ||common._getCookes('code_token')){
				console.log("登录选购")
			}else{
				this.$router.push("/login")
			}
		},
		methods:{
			cancel(){
				this.$router.go(-1);
			},
			// 订单结算
			toOrder(){
				
				let shopping =[];
				for(let i=0; i< this.shopGoodstList.length; i++){
					for(let j=0;j<this.shopGoodstList[i].shoppingCart.length;j++){
						if(this.shopGoodstList[i].shoppingCart[j].ischeck){
							// 获取下单数据
							shopping.push({
								id:this.shopGoodstList[i].shoppingCart[j].id ,
								createTime:this.shopGoodstList[i].shoppingCart[j].createTime,
								freight:this.shopGoodstList[i].shoppingCart[j].freights,
								goodsId:this.shopGoodstList[i].shoppingCart[j].goodsId,
								goodsName:this.shopGoodstList[i].shoppingCart[j].goodsName,
								marketPrice:this.shopGoodstList[i].shoppingCart[j].marketPrice,
								merchantId:this.shopGoodstList[i].shoppingCart[j].merchantId,
								specName:this.shopGoodstList[i].shoppingCart[j].specName,
								specId:this.shopGoodstList[i].shoppingCart[j].specId,
								number:this.shopGoodstList[i].shoppingCart[j].number,
								remark:this.shopGoodstList[i].shoppingCart[j].remark,
								specDesc:this.shopGoodstList[i].shoppingCart[j].specDesc,
								supplyAmount:this.shopGoodstList[i].shoppingCart[j].supplyAmount,
								vipPrice:this.shopGoodstList[i].shoppingCart[j].vipPrices,
								status:0,
								userId:common._getCookes('userid') || undefined
							})
						}
					}
				}
				this.$router.push({
					path:'/carOrder',
					query:{
						fromSou:1,//
						shopping:shopping
					}
				})
			},
			
			// 管理按钮
			edit(){
				this.editState = !this.editState;
				if(this.editState){
					this.editTxt = "完成"
				}else{
					this.editTxt = "管理"
				}
			},
			swipeleft(s,e) {
				let that = this;
				console.log(s.index)
				let indexArr = s.index.split(',')
				let deltaX = Math.abs(e.changedTouches[0].clientX)
				if(e.changedTouches.length === 1) {
					// 如果是向右滑动或者只是点击，不改变滑动位置
					if(deltaX < 0 || deltaX == 0) {
					   that._setMove()
					}else if (deltaX > 0) {
						//如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
							that._setMove()
						if (deltaX>= this.delWidth) {
							console.log(indexArr)
						 that._setMove(indexArr[1], indexArr[0])
						}
					}
				}
			},
			 swiperight(s,e) {
				let that = this;
				let deltaX = Math.abs(e.changedTouches[0].clientX)
				let indexArr = s.index.split(',')
				console.log(s.index)
				if(e.changedTouches.length === 1) {
					// 如果是向右滑动或者只是点击，不改变滑动位置
					if(deltaX < 0 || deltaX == 0) {
						console.log(indexArr);
						that._setMove(indexArr[1], indexArr[0])
					}else if (deltaX > 0) {
						//如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
							that._setMove(indexArr[1], indexArr[0])
						if (deltaX>= this.delWidth) {
							that._setMove()
						}
					}
				}
			},
			 // setMOve
			_setMove(pindex = undefined, index = undefined){
				for(let i = 0; i < this.shopGoodstList.length; i++){
					// that.shopGoodstList[i].moveStyle = "transform:translateX(0rem)"
					for(let j = 0; j< this.shopGoodstList[i].shoppingCart.length; j++){
						this.shopGoodstList[i].shoppingCart[j].moveStyle = "transform:translateX(0rem)"
					}
				}
				if (pindex && index) {
					this.shopGoodstList[pindex].shoppingCart[index].moveStyle = "transform:translateX(-1.4rem)"
				}
				this.$forceUpdate()
			},
			// 获取商品数据
			getGoods(){
				this.shopGoodstList =[]
				order.carList(this.carlist).then(res =>{
					console.log(res)
					if(res.code==0){
						if(res.data.count <=0){
							this.showcarList = false
							this.showEdit = false
							this.topGoods();
						}else{
							this.showcarList = true
							this.showEdit = true
							this.pagecount = Math.ceil(res.data.count / this.carlist.pageSize)
							this.shopGoodstList = this.shopGoodstList.concat(res.data.myShoppingMerchantCartVo);
							// 店铺数据添加选择状态和滑动状态 一开始滑动样式为0
							for(let i = 0; i <this.shopGoodstList.length; i++){
								this.shopGoodstList[i].checkState = false
								for(let j = 0; j<this.shopGoodstList[i].shoppingCart.length; j++){
									this.shopGoodstList[i].shoppingCart[j].moveStyle = "transform:translateX(0rem)"
									this.shopGoodstList[i].shoppingCart[j].ischeck =false;
								}
							}
							console.log(this.shopGoodstList)
							if(this.carlist.fromNum >= this.pagecount || this.carlist.pageSize > this.pagecount){
							  this.loadingstate = false
							  this.loadingtext = '没有更多了~'
							}
						}
					}
				})
			},
			/* 下一页 */
			nextList(data,num) {
			  if (data <num) {
				++this.carlist.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.getGoods()
			  }
			},
			
			// 商品加
			buyPlus(index,levindex) {
				let number = this.shopGoodstList[index].shoppingCart[levindex].number
				 if(number<= this.shopGoodstList[index].shoppingCart[levindex].inventory){
					this.shopGoodstList[index].shoppingCart[levindex].number = number+1;
				 }else{
					 this._setMsgBox("亲,不能购买更多了~")
				 }
				 this.getEdit(index,levindex)
				 this.editCar(this.editParam)
				 this.countPrice();
			},
			// 修改购物车
			editCar(param){
				order.joinCar(param).then(res =>{
					console.log(res)
					if(res.code==0){
						if(param == this.delParam){
							this._setMsgBox("已删除")
							this.getGoods();
						}
					}
				})
			},
			// 获取修改参数
			getEdit(index,levindex){
				this.editParam.shoppingCartvo[0].id = this.shopGoodstList[index].shoppingCart[levindex].id 
				this.editParam.shoppingCartvo[0].createTime = this.shopGoodstList[index].shoppingCart[levindex].createTime
				this.editParam.shoppingCartvo[0].freight = this.shopGoodstList[index].shoppingCart[levindex].freights
				this.editParam.shoppingCartvo[0].goodsId = this.shopGoodstList[index].shoppingCart[levindex].goodsId
				this.editParam.shoppingCartvo[0].goodsName = this.shopGoodstList[index].shoppingCart[levindex].goodsName
				this.editParam.shoppingCartvo[0].marketPrice = this.shopGoodstList[index].shoppingCart[levindex].marketPrice
				this.editParam.shoppingCartvo[0].merchantId = this.shopGoodstList[index].shoppingCart[levindex].merchantId
				this.editParam.shoppingCartvo[0].specName = this.shopGoodstList[index].shoppingCart[levindex].specName
				this.editParam.shoppingCartvo[0].specId = this.shopGoodstList[index].shoppingCart[levindex].specId
				this.editParam.shoppingCartvo[0].number = this.shopGoodstList[index].shoppingCart[levindex].number
				this.editParam.shoppingCartvo[0].remark = this.shopGoodstList[index].shoppingCart[levindex].remark
				this.editParam.shoppingCartvo[0].specDesc = this.shopGoodstList[index].shoppingCart[levindex].specDesc
				this.editParam.shoppingCartvo[0].supplyAmount = this.shopGoodstList[index].shoppingCart[levindex].supplyAmount
				this.editParam.shoppingCartvo[0].vipPrice = this.shopGoodstList[index].shoppingCart[levindex].vipPrices
			},
			// 商品减
			buyReduce(index,levindex) {
				// index 外层循环
				let number = this.shopGoodstList[index].shoppingCart[levindex].number
				this.shopGoodstList[index].shoppingCart[levindex].number = number-1;
				if(number<=1){
					this.shopGoodstList[index].shoppingCart[levindex].number=1
				}
				this.getEdit(index,levindex);
				this.editCar(this.editParam)
				this.countPrice();
			},
			// 删除商品
			deleteList(index){
				$(".del").eq(index).parents("li").remove();
			},
			// 管理状态下的删除
			allDel(){
				this.delParam.shoppingCartvo=[];//清空c赋值
				for(let i=0; i< this.shopGoodstList.length; i++){
					for(let j=0;j<this.shopGoodstList[i].shoppingCart.length;j++){
						if(this.shopGoodstList[i].shoppingCart[j].ischeck){
							// 获取删除数据
							this.delParam.shoppingCartvo.push({
								id:this.shopGoodstList[i].shoppingCart[j].id ,
								createTime:this.shopGoodstList[i].shoppingCart[j].createTime,
								freight:this.shopGoodstList[i].shoppingCart[j].freights,
								goodsId:this.shopGoodstList[i].shoppingCart[j].goodsId,
								goodsName:this.shopGoodstList[i].shoppingCart[j].goodsName,
								marketPrice:this.shopGoodstList[i].shoppingCart[j].marketPrice,
								merchantId:this.shopGoodstList[i].shoppingCart[j].merchantId,
								specName:this.shopGoodstList[i].shoppingCart[j].specName,
								specId:this.shopGoodstList[i].shoppingCart[j].specId,
								number:this.shopGoodstList[i].shoppingCart[j].number,
								remark:this.shopGoodstList[i].shoppingCart[j].remark,
								specDesc:this.shopGoodstList[i].shoppingCart[j].specDesc,
								supplyAmount:this.shopGoodstList[i].shoppingCart[j].supplyAmount,
								vipPrice:this.shopGoodstList[i].shoppingCart[j].vipPrices,
								editType:1,
								status:0
							})
						}
					}
				}
				this.editCar(this.delParam)
			},
			getDel(){
				
			},
			// 全选框操作
			checkAll(event){
				if(!this.allState){
					for(let i=0; i< this.shopGoodstList.length; i++){
						this.shopGoodstList[i].checkState = true
						for(let j=0;j<this.shopGoodstList[i].shoppingCart.length;j++){
							this.shopGoodstList[i].shoppingCart[j].ischeck = true
						}
					}

				}else{
					for(let i=0; i< this.shopGoodstList.length; i++){
						this.shopGoodstList[i].checkState = false
						for(let j=0;j<this.shopGoodstList[i].shoppingCart.length;j++){
							this.shopGoodstList[i].shoppingCart[j].ischeck = false
						}
					}
				}
				this.$forceUpdate();
				this.countPrice();
			},
			// 店铺选择框
			shopAll(index){
				this.shopGoodstList[index].checkState = !this.shopGoodstList[index].checkState
				for (let i = 0; i < this.shopGoodstList[index].shoppingCart.length; i ++) {
					if (this.shopGoodstList[index].checkState) {
						this.shopGoodstList[index].shoppingCart[i].ischeck = true;
					} else {
						this.shopGoodstList[index].shoppingCart[i].ischeck = false;
					}
				}
				this.isAllSlt()
				this.countPrice();
			},
			// 商品选择框
			//单选
			sltActive (pindex, index) {
				let num = 0
				let price = 0
				let allList = this.shopGoodstList[pindex].shoppingCart.length;
				this.shopGoodstList[pindex].shoppingCart[index].ischeck = !this.shopGoodstList[pindex].shoppingCart[index].ischeck
				for(let i = 0; i< allList; i++){
					if (this.shopGoodstList[pindex].shoppingCart[i].ischeck) {
						num ++;
					}
				}
				if (num === allList) {
					this.shopGoodstList[pindex].checkState = true
				} else {
					this.shopGoodstList[pindex].checkState = false
				}
				
				this.isAllSlt()
				this.countPrice();
			},
			// 计算价格
			countPrice(){
				let price = 0;
				let num = 0
				for(let i = 0; i< this.shopGoodstList.length; i++){
					for(let j = 0; j< this.shopGoodstList[i].shoppingCart.length; j++){
						if (this.shopGoodstList[i].shoppingCart[j].ischeck) {
							num++
							// 计算价格
							price += this.shopGoodstList[i].shoppingCart[j].vipPrices*this.shopGoodstList[i].shoppingCart[j].number
							console.log(this.price)
						}
						if(num==0){
							this.price = 0;
						}
					}

				}
					this.price = price
			},
			//判断是否已经全选
			isAllSlt() {
				let length = this.shopGoodstList.length
				let num = 0
				for (let i = 0; i < length; i++) {
					if (this.shopGoodstList[i].checkState) {
						num++
					}
				}
				if (num == length) {
					this.allState = true
				} else {
					this.allState = false
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
			/*商品详情*/
			toDetail(index){
				this.$router.push({
					path:'/goodsDetail',
					query:{
						goodsId:index
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
	.car {
			width: 100%;
			height: auto;
			overflow: hidden;
			position: relative;
			background-color: #fff;
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
			border-bottom: 1px solid #f5f5f5;
			top: 0;
			left: 0;
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
		.edit{
			width: .6rem;
			height: .3rem;
			font-size: .3rem;
			display: inline-block;
			margin-right: .3rem;
		}
		
		// 购物车列表
		.car-list{
			border-top: .16rem solid #f1f1f1;
			margin: .88rem 0 1.95rem;
			width: 100%;
			height: auto;
			.car-adv-tips{
				width: 100%;
				height: .48rem;
				overflow: hidden;
				text-align: left;
				padding-left:.32rem; 
				line-height: .48rem;
				color: #feb336;
				background-color: #fff9e9;
			}
			.shop-goods{
				width: 100%;
				height: auto;
			}
			.shop-goods-list{
				width: 100%;
				height: auto;
				border-bottom: .16rem solid #f1f1f1;
				.shop-title{
					display: flex;
					height: .8rem;
					margin: 0 .3rem;
					align-items: center;
					
					.shop-name{
						margin: 0 0 0 .2rem;
						font-size: .24rem;
						vertical-align: middle;
					}
					.icon-right{
						width: .1rem;
						height: .18rem;
						vertical-align: middle;
						margin: 0 0 0 .2rem;
					}
				}
				// 商品清单
				.goods-list{
					margin: 0 .3rem;
				}
				.goods-list-li{
					height: 2.1rem;
					display: flex;
					border-bottom: 1px solid #f1f1f1; 
					align-items: center;
					transition: all 0.5s;
				}
				.goods-img{
					width: 1.8rem;
					height: 1.8rem;
					margin: 0 0 0 .2rem;
					img{
						width: 100%;
						height: 100%;
						border-radius: .04rem;
					}
				}
				.goods-txt{
					margin: 0 0 0 .24rem;
					text-align: left;
				}
				.goods-name{
					width:4.40rem;
					line-height: .36rem;
					font-size: .26rem;
					height: .72rem;
					display:-webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.goods-type{
					color: #9c9c9c;
					margin: .18rem 0 .26rem  0;
				}
				.goods-choose{
					display: flex;
					justify-content: space-between;
				}
				.goods-price{
					color: #b50000;
					margin: 0;
					font-size: .3rem;
				}
				.goods-choose-input{
					width: 1.6rem;
					height: .4rem;					
					margin: 0;
					font-size: .24rem;
					display: flex;
					border-radius: .04rem;
					border: solid 0.02rem #eee;
				}
				.goods-choose-input input {
					width: .4rem;
					height: .36rem;
					border: none;
					outline: none;
					color: #999;
					text-align: center;
					background-color: #fff;
				}
				.buy-reduce.forbid {
					color: #eee;
				}
				.buy-count {
					display: inline-block;
					width: .8rem;
					color: #999;
					border-left: solid 0.02rem #eee;
					border-right: solid 0.02rem #eee;
				}
				.del-btn{
					width: 1.4rem;
					height:2.1rem;
					color: #fff;
					line-height: 2.1rem;
					text-align: center;
					background: #b50000;
					position: absolute;
					right: -1.7rem;
				}
				
			}
		}
	
		// 选择按钮
		.check-box{
			width: .3rem;
			height: .3rem;
			margin: 0;
			display: inline-block;
			vertical-align: middle;
			position: relative;
		}
		.check-box input{
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
			z-index: 2;
		}
		.check-box input:checked + label{
			border: none;
			background: #ffba30;
			background-image: url('../../../static/img/icon-check-fff.png');
			background-repeat: no-repeat;
			background-size:.2rem .14rem;
			background-position: .05rem .07rem;
		}
		.check-box .checkbox-label{
			display: inline-block;
			width: .3rem;
			height: .3rem;
			border-radius:50%;
			border: .02rem solid #babac2;
		}
		// 管理栏
		.manager-nav{
			width: 100%;
			height: .95rem;
			position: fixed;
			display: flex;
			align-items: center;
			bottom: 1rem;
			left: 0;
			background: #fff;
			box-shadow: 2px 3px 5px #0c0c0c; 
			z-index: 5;
			.all-check{
				margin: 0 0 0 .32rem;
			}
			.check-title{
				font-size: .28rem;
				color: #999;
				margin: 0 0 0 .16rem;
				vertical-align: middle;
			}
			.car-del{
				width: 1.2rem;
				height: .4rem;
				border-radius: .2rem;
				color: #feb336;
				font-size: .26rem;
				line-height: .34rem;
				font-family: 'pf-Regular';
				margin-right: 0.3rem;;
				border: solid 1px #feb336;
			}
			.car-total-price{
				margin-right:0;
				font-size: .28rem;
			}
			.gray{
				color: #999;
			}
			.money{
				color:#b50000;
				margin: 0 .15rem;
			}
			.account-btn{
				width: 2.26rem;
				height:.95rem;
				margin:0;
				font-size: .3rem;
				line-height: .95rem;
				color: #fff;
				align-self: center;
				background-image: linear-gradient(98deg,#feca3a 0%, #feb336 100%), linear-gradient(	#c8c8c8, #c8c8c8);
				background-blend-mode: normal,normal;
				box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
			}
		}
		// 购物篮空
		.carH{
			height: 100vh;
			overflow: auto;
			.nothing{
						margin-top: .88rem;
						border-top:.16rem solid #f2f2f2;
						
					}
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
					.none-img{
						width: 2.18rem;
						height: 2.15rem;
						margin-top: .8rem;
					}
					.none-txt{
						padding: .3rem 0 .5rem 0;
						
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
		
	}
</style>

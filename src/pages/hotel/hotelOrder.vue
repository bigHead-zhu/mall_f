<template>
	<div class="hotel-order-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">订单结算</label>
		</div>
		<!-- 订单酒店 -->
		<div class="hotel" v-if="kind==4">
			<div class="order-hotel">
				<div class="hotel-title f28 c1e">{{goodsData.merchantName}} <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
				<div class="hotel-alls">
					<img class='hotel-img' v-lazy="goodsData.Img" />
					<div class="hotel-descript">
						<div class="hotel-descript-title f26 c1e">{{goodsData.goodsName}}</div>
						<div class="hotel-type f26">
							房型：{{goodsData.specDesc}}
						</div>
						<div class="price">
							<label class="price-money">¥{{goodsData.amount}}</label>
							<label class="price-num f24">x1</label>
						</div>
					</div>
					
				</div>
				<div class="order-time f26 c1e">
					<div class="time-title">
						<img src="../../assets/hotel/order-time.png" />
						入住时间
					</div>
					<div class="times">{{ImmedParams.beginTime}}~{{ImmedParams.endTime}}(共{{goodsData.days}}天)</div>
				</div>
			</div>
			<!-- 入住信息 -->
			<div class="check-info">
				<div class="title f26 c1e">
					<img src="../../assets/hotel/check-info.png" />
					入住信息
				</div>
				<ul class="check-info-des">
					<li >
						<label class="check-info-title f26">房间数</label>
						<input class="check-into-input f26 c1e" type="text" readonly="readonly" value="1间" />
					</li>
					<li >
						<label class="check-info-title f26">入住人</label>
						<input class="check-into-input f26 c1e" v-model="orderData.userName" type="text" placeholder="请填写实际入住人姓名" />
					</li>
					<li >
						<label class="check-info-title f26">手机号</label>
						<input class="check-into-input f26 c1e" v-model="orderData.userPhone" type="text" placeholder="请填写手机号码" />
					</li>
				</ul>
			</div>
			
		</div>
		<!-- 餐饮 -->
		<div class="food" v-if="kind==3">
			<div class="food-des">
				<div class="title f32 c1e">{{goodsData.goodsName}}</div>
				<div class="time f28">{{goodsData.beginTime}}至{{goodsData.endTime}}可用</div>
				<div class="cursor">
					<label class="money"><small class="f24">¥</small>{{goodsData.amount}}</label>
					<label class="buy-btn">抢购</label>
				</div>
			</div>
			<div class="food-num">
				<div class="tl">已选</div>
				<div class="tr">
					<div class="buy-total">
						<input type="button" class="buy-reduce" :class="[onstyle?'':'forbid']" @click="buyReduce" value="-" />
						<input class="buy-count" type="text" readonly="readonly" v-model="buyCount" value="buyCount">
						<input type="button" class="buy-plus" @click="buyPlus(buyCount)" value="+" />
					</div>
				</div>
			</div>
		</div>
		<!-- 电影 -->
		<div class="food" v-if="kind==2">
			<div class="film-des">
				<div class="title f32 c1e">{{goodsData.goodsName}}</div>
				<div class="time f28">{{goodsData.beginTime}}至{{goodsData.endTime}}可用</div>
				<div class="cursor">
					<label class="money"><small class="f24">¥</small>{{goodsData.amount}}</label>
					<label class="buy-btn">抢购</label>
				</div>
			</div>
			<div class="food-num">
				<div class="tl">已选</div>
				<div class="tr">
					<div class="buy-total">
						<input type="button" class="buy-reduce" :class="[onstyle?'':'forbid']" @click="buyReduce" value="-" />
						<input class="buy-count" type="text" readonly="readonly" v-model="buyCount" value="buyCount">
						<input type="button" class="buy-plus" @click="buyPlus(buyCount)" value="+" />
					</div>
				</div>
			</div>
		</div>
		<!-- 旅游 -->
		<!-- 旅游订单 -->
		<div class="tour" v-if="kind==1">
			<div class="order-hotel">
				<div class="hotel-title f28 c1e">{{goodsData.merchantName}} <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
				<div class="hotel-alls">
					<img class='hotel-img' v-lazy="goodsData.img" />
					<div class="hotel-descript">
						<div class="hotel-descript-title f26 c1e">{{goodsData.goodsName}}</div>
						<div class="hotel-type f26">
							生效时间：{{goodsData.beginTime}}~{{goodsData.endTime}}
						</div>
						<div class="price">
							<label class="price-money">¥{{goodsData.amount}}</label>
							<label class="price-num f24">x{{goodsData.number}}</label>
						</div>
					</div>				
				</div>
				<div class="food-num">
					<div class="tl ml0">已选</div>
					<div class="tr">
						<div class="buy-total">
							<input type="button" class="buy-reduce" :class="[onstyle?'':'forbid']" @click="buyReduce" value="-" />
							<input class="buy-count" type="text" readonly="readonly" :value="buyCount">
							<input type="button" class="buy-plus" @click="buyPlus(buyCount)" value="+" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 报销凭证  商家券-->
		<ul class="expense-couple">
			<li class="expense">
				<img class="icon-expense" src="../../assets/hotel/icon-expense.png" />
				报销凭证：该服务请提前联系商家确认
			</li>
			<li class="couple" v-if="shopCoupon.length<=0">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">商家券</label></div>
					<div class="tr" >暂无可用</div>
				</div>
			</li>
			<li class="couple height124" v-if="shopCoupon.length>0" >
				<div class="copule-total pt30">
					<div class="tl"><label class="icon-couple">商家券</label></div>
					<div class="tr">{{shopCoupon.length}}张可用<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
				</div>
				<div class="couple-txt">此优惠券与平台优惠券不得同时使用</div>
			</li>
			<li class="count">
				<label class="f24 c1e mr40">共计1件商品</label>
				<label class="f24 c1e cout-money">会员价：<span class="money">¥{{goodsData.vipAmount}}</span></label>
			</li>
		</ul>
		<!-- 平台券 -->
		<ul class="expense-couple mb135">
			<li class="couple" v-show="hasPubCouple">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">平台券</label></div>
					<div class="tr" v-show="sysCoupon.length<=0">暂无可用</div>
				</div>
			</li>
			<li class="couple height124" v-show="sysCoupon.length>0">
				<div class="copule-total pt30">
					<div class="tl"><label class="icon-couple">平台券</label></div>
					<div class="tr" @click="sysCouponProps"><label class="label">{{sysCoupon.length}}张可用</label><img class="icon-right" src="../../../static/img/icon-r-return.png" /></div>
				</div>
				<div class="couple-txt">此优惠券与商家优惠券不得同时使用</div>
			</li>
			<li class="couple " :class="switchLabel?'height124':'height114'">
				<div class="copule-total pt30">
					<div class="tl"><label class="money-title f26">收益钱包</label></div>
					<div class="tr">
						<div class="switch" :class="switchLabel ? 'active':''">
							<label class="switchDot " @click="switchOn" :class="switchLabel ? 'active':'unactive'" ></label>
						</div>
					</div>
				</div>
				<div class="couple-txt" v-show="switchLabel">当前抵扣{{switchMoney}}元</div>
			</li>
		</ul>
		
		<!--  -->
		<div class="tips mb135">
			<p class="tip-title">下单提示：</p>
			<p>该商品属于特殊商品，下单后无法退款</p>
		</div>
		
		
		<!-- 结算 -->
		<div class="pay-count">
			<div class="pay-count-price" >
				<div v-if="kind==3||kind==1||kind==2">
					<small class="f24">¥</small>{{huuAmount}}
				</div>
				<div v-if="kind==4">
					<small class="f24">¥</small>{{goodsData.vipAmount}}
				</div>
			</div>
			<div class="now-pay" @click="ordeComfirm()">立即支付</div>
		</div>
		<div class="mask" v-show="mainMask"></div>
		<!-- 支付金额弹窗 -->
		<div class="pay-mask" v-show="payProps">
			<div class="pay-title c1e ">
				<label>确认付款</label>
				<img class="icon-close" @click="immepayProps" src="../../../static/img/icon-close.png" />
			</div>
			<div class="pay-price c1e">¥{{lastMoney}}</div>
			<!-- 付款方式 -->
			<ul class="pay-type">
				<li v-for="(item,index) in payType" :key="index" >
					<img class="pay-img" :src="item.img" />
					<label class="pay-name c1e">{{item.title}}</label>
					<div class="check-box" @click="changeCheck(index)" >
						<input type="checkbox"  v-model="item.checkState" :checked="item.checkState" />
						<label class="checkbox-label" :class="item.checkState?'active':''"></label>
					</div>
				</li>
				<li v-for="(item,indexs) in wallent" :key="indexs" @click="toPay(item.level,item.title,item.balance)">
					<img class="pay-img" :src="item.img" />
					<label class="pay-name c1e">{{item.title}}</label>
					<div class="check-box" @click="wallentCheck(indexs,item.id)" >
						<input type="checkbox" v-model="item.checkState" :checked="item.checkState" />
						<label class="checkbox-label" :class="item.checkState?'active':''"></label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 组合卡片支付 -->
		<div class="card-pay" v-show="cardpayProps">
			<div class="pay-nav">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="showPayProps"/>
				<label class="card-pay-title">{{payTitle}}</label>
				<img class="icon-close" @click="colseCard" src="../../../static/img/icon-close.png" />
			</div>
			<div class="card-main" :class="bgName">
				<div class="card-title">
					<span>{{cardName}}</span>
					<label></label>
					<label class="dot"></label>
				</div>
				<div class="card-money">
					<small>¥</small>{{blance}}
				</div>
				<p>注意：使用卡片支付时，无法组合支付</p>
			</div>
			<div class="card-footer c1e" @click="impwdProps">
				立即支付
			</div>
		</div>
		<!-- 支付密码 -->
		<div class="pay-pwd" v-show="pwdProps">
			<div class="pay-nav">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
				<label class="card-pay-title">支付密码</label>
				<img class="icon-close" @click="closeimpwd" src="../../../static/img/icon-close.png" />
			</div>
			<div class="pay-main">
				<div class="pay-tips">
					请输入支付密码，完成支付
				</div>
				<div class="pay-input">
					<input v-for="(item,index) in inputList" :key="index" class="pwd-input" value=""
					type="password" maxlength="1" v-model="item.val" @keyup="nextNum(index,$event)" @blur="getPwd(index,item.val,'blur')"/>
				</div>
			</div>
		</div>
		
		
		<!-- 平台优惠券 -->
		<sysCoupon
			v-model="sysState"
			:sysCoupon="sysCoupon"
			@sysCheckValue ="getCoupon"
		/>
		
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
	import hotel from '../../server/hotel.js'
	import common from '../../plugins/common.js';
	import message from '../../components/message.vue';
	import sysCoupon from '../../components/sysCoupon.vue';
	
	export default{
		components:{
			message,
			sysCoupon
		},
		data(){
			return{
				showHotel:false,
				showFood:false,
				hasCouple:false,//T有券F无
				hasPubCouple:false,
				switchLabel:false,
				sendVal: '',
				mainMask:false,
				msgContent: '',
				buyCount: 1,//餐饮、电影购买数量
				onstyle: false,//可选状态
				switchMoney:0,
				merchantCount:'',
				params:{
					goodsId:"",
					source:1
				},
				goodsData:'',//商品详情
				orderData:{
					//确认下单
					source:0,
					userId:'',
					userToken:'',
					goodsId:'',
					goodsSpecId:'',
					merhcnatId:'',
					goodsVipAmount:'',
					number:1,
					userName:'',
					userPhone:'',
					vipAmount:'',
					couponDetailsId:'',
					couponId:'',
					useBalance:0,
					endTime:'',
					beginTime:'',
					orderType:""
				},
				moneyParams:{
					// 钱包余额
					userId:"",
					userToken:"",
					source:0
				},
				ImmedParams:{
					// 立即下单
					beginTime:'',
					endTime:'',
					goodsId:'',
					goodsSpecId:'',
					merhcnatId:'',
					orderType:'',
					userId:'',
					userToken:'',
					source:0
				},
				sysCoupon:[],//平台券
				checkCoup:-1,//平台券单选
				shopCoupon:[],//商家券
				shopCouponId:'',//商家券id
				shopcouponDetailsId:'',
				sysCouponId:'',//平台券id
				syscouponDetailsId:'',//领取id
				sysState:false,//平台优惠券
				payProps:false,//支付窗口
				payType:[
					{
						id:0,
						img:require("../../assets/car/icon-wx.png"),
						title:"微信支付",
						checkState:false
					},{
						id:1,
						img:require("../../assets/car/icon-alipay.png"),
						title:"支付宝",
						checkState:false
					},
				],//支付方式
				lastMoney:'',//支付金额
				payTitle:'',
				bgName:'',
				cardName:'',
				wallent:[],//卡片类型
				pwdProps:false,//密码窗口
				cardpayProps:false,//卡片类型
				blance:"",//卡片可用余额
				passwordVal:'',//完整六位数密码
				inputList: [{val:""}, {val:""}, {val:""}, {val:""}, {val:""}, {val:""}],//六位密码
				payParams:{
					//支付传参
					userId:"",
					userToken:"",
					source:0,
					payWay:'',
					vipWalletId:'',
					payPwd:'',
					mainOrderId:"",
					isParentOrder:""
				},
				orderId:'',//订单序列号
				kind:'',
				huuAmount:''
			}
		},
		watch:{
			buyCount(newVal, oldVal) {
				if (newVal == 1) {
					this.onstyle = false
				} else {
					this.onstyle = true 
				}
			}
		},
		mounted(){
			this.params.goodsId = this.$route.query.id;
			this.orderData.beginTime = this.$route.query.starTime;
			this.orderData.endTime = this.$route.query.endTime;
			this.orderData.userToken = common._getCookes('code_token') || undefined
			this.orderData.userId = common._getCookes('userid') || undefined
			this.moneyParams.userId = common._getCookes('userid') || undefined
			this.moneyParams.userToken = common._getCookes('code_token') || undefined
			
			this.payParams.userId = common._getCookes('userid') || undefined
			this.payParams.userToken = common._getCookes('code_token') || undefined
			
			this.ImmedParams.goodsId = this.$route.query.id;
			this.ImmedParams.merhcnatId = this.$route.query.merchantId;
			this.ImmedParams.goodsSpecId = this.$route.query.specId;
			this.ImmedParams.beginTime = this.$route.query.starTime;
			this.ImmedParams.endTime = this.$route.query.endTime;
			this.ImmedParams.userId = common._getCookes('userid') || undefined;
			this.ImmedParams.userToken = common._getCookes('code_token') || undefined;
			
			// 判断商品类型
			this.kind = this.$route.query.kind;
			this.ImmedParams.orderType = this.kind
			this.orderImmed();
			this.IsLogin();
		},
		methods:{
			cancel(){
				if(this.kind==4){
					// 住宿
					this.returnPath('/hotelGoodsDetail')
				}else if(this.kind==1){
					// 旅游
					this.returnPath('/tourShopDetail')
				}else if(this.kind==2){
					this.returnPath('/filmShopDetail')
				}else if(this.kind==3){
					this.returnPath('/foodDetail')
				}
			},
			// 回到最初的路径
			returnPath(path){
				this.$router.push({
					path:path,
					query:{
						id :this.$route.query.id
					}
				});
			},
			// 商品数量加减
			buyPlus() {
				this.buyCount++;
				this.onstyle = true;
				this.orderData.number = this.buyCount
				if(this.kind==3){
					this.huuAmount = Number(this.buyCount)*Number(this.goodsData.vipAmount)
				}else if(this.kind==1 || this.kind==2){
					this.huuAmount = Number(this.buyCount)*Number(this.goodsData.amount)
				}
			},
			buyReduce() {
				if (this.onstyle) {
					this.buyCount--;
				}
				this.orderData.number = this.buyCount;
				if(this.kind==3){
					this.huuAmount = Number(this.buyCount)*Number(this.goodsData.vipAmount)
				}else if(this.kind==1 || this.kind==2){
					this.huuAmount = Number(this.buyCount)*Number(this.goodsData.amount)
				}
			},
			switchOn(){
				this.switchLabel =!this.switchLabel;
				this.getMoney();
				// 1使用
				if(this.switchLabel){
					this.orderData.useBalance = 1
				}else{
					this.orderData.useBalance = 0
				}
			},
			// 获取六位密码
			getPwd(index,val){
				let passwordVal ="";
				if(val!=null || val !=undefined ||val!=""){
					for(let i=0;i<this.inputList.length;i++){
						if(this.inputList[i].val){
							passwordVal = val
						}
					}
					this.passwordVal +=passwordVal
					if(index==5){
						this.payParams.payPwd = this.passwordVal
						this.payParams.isParentOrder = 0 //0主订单
						
						order.orderPay(this.payParams).then(res =>{
							if(res.code==0){
								this._setMsgBox("支付成功！")
								this.$router.push({
									path:'/classifiPaySuccess',
									query:{
										classifiId:this.kind,
										orderId:this.orderId,
										detailId:this.payParams.mainOrderId
									}
								})
							}else{
								this._setMsgBox(res.message)
								this.passwordVal =""
								for(let i=0;i<this.inputList.length;i++){
									if(this.inputList[i].val){
										passwordVal = ''
									}
								}
							}
						})
					}
				}else{
					this._setMsgBox("密码不能为空")
				}
			},
			// payProps支付类型窗口
			immepayProps(){
				this.payProps = !this.payProps
				this.Props();
			},
			// 密码窗口
			impwdProps(){
				this.pwdProps = !this.pwdProps
				for(let i=0;i<this.inputList.length;i++){
					this.inputList[i].val = '';
				}
			},
			closeimpwd(){
				this.pwdProps=false;
				this.Props()
				this.cardpayProps = false;
				this.payProps = false;
				
			},
			cardProps(){
				this.cardpayProps = !this.cardpayProps
				this.Props();
				this.immepayProps();
			},
			colseCard(){
				this.cardpayProps = !this.cardpayProps
				this.payProps =false
				this.Props();
			},
			Props(){
				this.mainMask = !this.mainMask;
				if (this.mainMask) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
			showPayProps(){
				this.cardpayProps = false;
			},
			// 支付单选
			changeCheck(index){
				for (let i = 0; i < this.wallent.length; i++) {
					this.wallent[i].checkState = false
				}
				this.payType[index].checkState = !this.payType[index].checkState
				for (let i = 0; i < this.payType.length; i++) {
					if (i == Number(index)) {
						this.payType[i].checkState = !this.payType[i].checkState
					} else {
						this.payType[i].checkState = false
					}
				}	
				// 支付类型
				switch(index){
					case 0://微信
						this.payParams.payWay = 0
						break;
					case 1://支付宝
						this.payParams.payWay = 1
						break;
				}
				this.payParams.payWay = index
				this.payProps=false;
				this.impwdProps();
			
			},
			// 获取卡片明细
			getcard(){
				order.getcardDetail(this.moneyParams).then(res =>{
					if(res.code==0){
						this.wallent = []
						let title = '',img="";
						for(let i =0 ;i<res.data.vipWalletList.length;i++){
							switch(res.data.vipWalletList[i].level){
								case 0:
									title="银卡支付";
									img=require("../../assets/car/icon-gold.png")
									break;
								case 1:
									title="金卡支付"
									img = require("../../assets/car/icon-bank.png")
									break;
								case 2:
									title="钻卡支付"
									img =require("../../assets/car/icon-drill.png")
									break;
							}
							this.wallent.push({
								id:res.data.vipWalletList[i].id,
								title:title,
								checkState:false,
								img:img,
								level:res.data.vipWalletList[i].level,
								balance:res.data.vipWalletList[i].restMoney
								
							})
						}
					}else{
						console.error(res.message)
					}
				})
			},
			// 卡片类型单选
			wallentCheck(index,id){
				for (let i = 0; i < this.payType.length; i++) {
					 this.payType[i].checkState = false
				}
				this.wallent[index].checkState = !this.wallent[index].checkState
				for (let i = 0; i < this.wallent.length; i++) {
					if (i == Number(index)) {
						this.wallent[i].checkState = !this.wallent[i].checkState
					}else {
						this.wallent[i].checkState = false
					}
				}
				// 支付类型为卡片类型时支付参数payway	支付密码需要参数
				switch(index){
					case 0://银卡
						this.payParams.payWay = 3
						break;
					case 1://金卡
						this.payParams.payWay = 2
						break;
					case 1://钻卡
						this.payParams.payWay = 4
						break;
				}
				// 支付密码需要参数
				this.payParams.vipWalletId=id
			
			},
			// 跳转支付方式
			toPay(index,val,blance){
				this.cardpayProps = true;
				this.payTitle = val
				this.blance = blance
				switch (index){
					case 0:
						this.cardName = 'bank card'
						this.bgName = 'bank'
						break;
					case 1:
						this.cardName = 'Gold card'
						this.bgName = 'gold'
						break;
					case 2:
						this.cardName = 'drill card'
						this.bgName = 'drill'
						break;
				}
					
			},
			// 立即下单
			orderImmed(){
				order.orderImmediate(this.ImmedParams).then(res =>{
					if(res.code==0){
						this.goodsData = res.data;
						this.orderData.merhcnatId = res.data.merhcantId;
						this.orderData.goodsId = this.$route.query.id;
						this.orderData.goodsSpecId =  this.$route.query.specId;
						this.orderData.vipAmount = res.data.vipAmount;
						this.orderData.goodsVipAmount = res.data.vipAmount;		
						if(this.kind==4){
							this.orderData.number = res.data.days;		
						}
						this.huuAmount = res.data.amount

							
						// 优惠券
						this.shopCoupon= res.data.merchantAndGoodsCoupon;
						this.sysCoupon = res.data.sysCoupon;
					}
				})
			},
			
			
			
			// 获取收益余额
			getMoney(){
				order.getMoney(this.moneyParams).then(res =>{
					if(res.code==0){
						this.switchMoney = res.data;
					}else{
						console.error(res.message)
					}
				})
			},
			// 确认下单
			ordeComfirm(){
				this.orderData.orderType = this.kind;
				if(this.kind==4){
					if(!this.orderData.userName || !this.orderData.userPhone){
						this._setMsgBox('联系人和联系电话不能为空~')
					}else{
						order.orderTypeComfirm(this.orderData).then(res =>{
							if(res.code==0){
								this.immepayProps();
								this.payParams.mainOrderId = res.data.mainOrderId;
								this.orderId = res.data.merhcnatOrderId
								this.lastMoney = res.data.amount;
								if(this.orderData.useBalance==1){
									if(this.kind==4){
										if(this.switchMoney >= this.goodsData.vipAmount){
											this.pwdProps = true;
											this.payParams.payWay = 7;
										}else{
											this.getcard();
										}
									} 
								}else{
									this.getcard();
								}
							}else{
								console.error(res.message)
							}
						})
					}
				}else{
					order.orderTypeComfirm(this.orderData).then(res =>{
						if(res.code==0){
							this.immepayProps();
							this.payParams.mainOrderId = res.data.mainOrderId;
							this.orderId = res.data.merhcnatOrderId
							this.lastMoney = res.data.amount;
							this.getcard();
						}else{
							console.error(res.message)
						}
					})
				}
			
			},
			/**
			 * 使用平台优惠券
			 */
			getCoupon(id,detail){
				this.orderData.couponId = id;
				this.orderData.couponDetailsId = detail;
			},
			
			// 下一个输入
			nextNum(index,e){
				 var dom = document.getElementsByClassName("pwd-input"),
			        currInput = dom[index],
			        nextInput = dom[index + 1],
			        lastInput = dom[index - 1];
			    /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
			    if (e.keyCode != 8) {
			        if (index < (this.inputList.length - 1)) {
			            nextInput.focus();
			        } else {
			            currInput.blur();
			        }
			    }else{
			        if (index !=0) {
			            lastInput.focus();
			        }
			    }
			},
			/**
			 * 平台券
			 * 清空商家券
			 */
			sysCouponProps(){
				this.sysState = true;
				for(let isshop =0;isshop<this.shopCoupon.length;isshop++){
					this.shopCoupon[isshop].isCheck = false
				}
				this.orderData.couponId=""
				this.orderData.couponDetailsId=""
			},
			// 判断是否登录
			IsLogin(){
				if(common._getCookes('code_token') || common._getCookes('userid')){
					console.log('全程为你保驾护航')
				}else{
					this.$router.push("/login")
				}
			},
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
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";
	@import "../../../static/css/common.css";
	@import "../../../static/css/header.css";
	.hotel-order-main{
		width: 100%;
		height: 100vh;
		background: #eee;
		overflow:auto;
		font-family:'pf-Regular';

		
		.header label{
			display: inline-block;
			flex: 1;
		}
		/*订单酒店*/
		.order-hotel{
			margin-top: 1.05rem;
			padding: .3rem .3rem 0 .3rem;
			text-align: left;
			background: #fff;
		}
		.hotel-title{
			font-family:'pf-Bold';
		}
		.icon-right{
			width: .1rem;
			height: .18rem;
			vertical-align: middle;
			margin-left: .18rem;
		}
		.hotel-alls{
			display: flex;
			margin-top: .3rem;
			padding-bottom: .3rem;
			border-bottom: .01rem solid #f2f2f2;
		}
		.hotel-img{
			width: 2rem;
			height: 2rem;
			margin: 0;
		}
		.hotel-descript{
			margin: .16rem 0 0 .2rem;
			width: 100%;
		}
		.hotel-descript-title{
			line-height: .34rem;
		}
		.hotel-type{
			color: #aaa;
			font-family:'pf-Regular';
			margin: .2rem 0 .3rem 0;
		}
		
		.price-money,.price-num{
			display: inline-block;
			width: 49%;
		}
		.price-money{
			font-size: .3rem;
			color: #b50000;
			text-align: left;
		}
		.price-num{
			color: #aaa;
			font-family:'pf-Heavy';
			text-align: right;
		}
		.order-time{
			width: 100%;
			display: flex;
			height: .85rem;
			align-items: center;
		}
		.time-title img,.check-info img{
			width: .26rem;
			height: .26rem;
			margin-right: .1rem;
			vertical-align: middle;
		}
		.times{
			flex: 2;
			text-align: right;
		}
		.check-info{
			background: #fff;
			padding:0 .3rem;
			margin-top: .16rem;
		}
		.check-info .title{
			height: .84rem;
			text-align: left;
			line-height: .84rem;
		}
		.check-info-des{
			margin: 0 .3rem;
		}
		.check-info-des li,.expense-couple li{
			border-bottom: 0.01rem solid #f2f2f2;
			height: .85rem;
			text-align: left;
			align-items: center;
		}
		.expense-couple li:last-child,.check-info-des li:last-child{
			border-bottom: none;
		}
		.check-info-des li{
			display: flex;
		}
		.check-info-title{
			margin:0 0 0 .4rem;
			color: #aaa;
		}
		.check-info-input,.ml112{
			margin-left: 1.12rem;
		}
		.check-info-input::placeholder{
			color: #aaa;
		}
		/*报销凭证 商家券*/
		.expense-couple{
			margin: .16rem 0;
			background: #fff;
		}
		.expense-couple li{
			margin: 0 .3rem;
		}
		.icon-expense{
			width: .54rem;
			height: .54rem;
			margin: 0 .2rem 0 0;
		}
		.height112{
			height: 1.12rem!important;
		}
		.height124{
			height: 1.24rem!important;
		}
		.pt30{
			padding: .3rem 0 .08rem 0;
		}
		.expense{
			font-size: .26rem;
			display: flex;
			height: 1.1rem;
			align-items: center;
			color: #aaa;
		}
		.couple .copule-total{
			display: flex;
			width: 100%;
		}
		.couple .copule-total div{
			flex: 1;
		}
		.select-text {
			margin-left: .41rem;
			color: #1e1e1e;
		}
		.copule-tot{
			line-height: .85rem;
			display: flex;
		}
		.couple-txt{
			font-size: .22rem;
			line-height: .22rem;
			margin: .1rem 0 0;
			color: #aaa;
		}
		.icon-couple {
			display: inline-block;
			width: .92rem;
			height: .32rem;
			font-size: .24rem;
			line-height: .32rem;
			text-align: center;
			color: #b50000;
			background-image: url('../../../static/img/icon-couple.png');
			background-repeat: no-repeat;
			background-size: .92rem .32rem;
		}
		 .tr {
			font-size: .26rem;
			color: #aaa;
			flex: 1;
		}
		.icon-return {
			width: .1rem;
			height: .18rem;
			margin-left: .1rem;
			vertical-align: middle;
		}
		.count{
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.count .mr40{
			margin-right:.4rem!important;
		}
		.cout-money{
			margin: 0; 
		}
		.money{
			font-size: .32rem;
			color: #b50000;
		}
		.money-title{
			color: #b50000;
			font-size: .26rem;
		}
		.switch{
			width: .6rem;
			height: .34rem;
			background: #fff;
			border-radius: .2rem;
			margin-right: 0 ;
			position: relative;
			box-shadow: .03rem .03rem .02rem #ccc;
		}
		.switch.active{
			background: #4cd964;
		}
		.switch .switchDot{
			display: inline-block;
			position: absolute;
			top:-0.02rem;
			width: 0.34rem;
			height: .34rem;
			background: #fff;
			border-radius: 50%;
			box-shadow: .03rem .03rem .02rem #ccc;
		}
		.switch .switchDot.unactive{
			left: 0rem;
		}
		.switch .switchDot.active{
			 right: 0rem;
		}
		/*结算*/
		.pay-count{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: .98rem;
			display: flex;
			line-height: .98rem;
			background-color: #fff;
			justify-content: space-between;
			z-index: 15;
		}
		.pay-count-price{
			color: #b50000;
			font-size: .4rem;
			margin-left: .32rem;
		}
		.now-pay{
			color: #fff;
			font-size: .3rem;
			width: 2.26rem;
			height:100%;
			margin: 0;
			text-align: center;
			background-image: linear-gradient(98deg,#feca3a 0%,#feb336 100%),linear-gradient(#c8c8c8, #c8c8c8);
			background-blend-mode: normal,normal;
			box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
		}
		.mb135{
			margin-bottom: 1.35rem!important;
		}
		.tips{
			margin: .3rem .3rem;			
			text-align: left;
			font-size: .26rem;
			color: #aaa;
		}
		.tip-title{
			margin: .3rem 0 .2rem 0;
		}
			// 支付弹窗
		.pay-mask{
			position: fixed;
			bottom: 0;
			width: 100%;
			height:auto;
			overflow: auto;
			left: 0;
			background: #fff;
			border-radius: .2rem .2rem 0 0;
			z-index: 55;
			.pay-title{
				text-align: center;
				height: .95rem;
				position: relative;
				line-height: .95rem;
				font-size: .3rem;
			}
			.pay-price{
				font-size: .60rem;
				border-top: 1px solid #f1f1f1;
				padding: .3rem 0 .15rem 0;
				text-align: center;
			}
			// 支付方式
			.pay-type{
				margin: 0 .3rem;
				li{
					height: 1.2rem;
					display: flex;
					align-items: center;
					border-bottom: 0.03rem solid #f1f1f1;
					.pay-img{
						width: .36rem;
						// height: .36rem;
						margin: 0;
					}
					.pay-name{
						font-size: .3rem;
						margin-left: .28rem;
					}
				}
				li:last-child{
					border: none
				}
			}
			
		}
		// 
		.icon-close{
			position: absolute;
			right: .3rem;
			top: .3rem;
			width: .32rem;
			height: .32rem;
			z-index: 30;
		}
		// 卡片支付
		// 金卡背景
		.gold{
			background: url('../../assets/car/bg-gold.png') no-repeat;
		}
		// 银卡
		.bank{
			background: url('../../assets/car/bg-bank.png') no-repeat;
		}
		// 钻卡
		.drill{
			background: url('../../assets/car/bg-drill.png') no-repeat;
		}
		.card-pay,.pay-pwd{
			.pay-nav{
				width: 100%;
				height: .95rem;
				line-height: .95rem;
				font-size: .34rem;
				border-bottom: 1px solid #f2f2f2;
				position:relative;
				font-family: 'pf-Medium';
				.icon-left{
					position: absolute;
					left: .3rem;
					top: .33rem;
					display: inline-block;
					width: .16rem;
					height: .28rem;
					z-index: 5
				}
			}
			
			.card-main{
				margin: .4rem .6rem;
				height: 3.54rem;
				overflow: hidden;
				border-radius: .06rem;
				background-size: 100% 100%;
				font-family: 'pis';
				color: #fff;
				text-align: left;
				.card-title{
					padding: .5rem .3rem 0 .36rem;
					position: relative;
					span{
						font-size: .36rem;
					}
					label{
						display: inline-block;
						position: absolute;
						right: .3rem;
						top: .5rem;
						width: .3rem;
						height: .3rem;
						z-index: 5;
						background: #fff;
						border-radius: 50%;
						opacity: .4
					}
					.dot{
						right: .45rem;
					}
				}
				// 金额
				.card-money{
					font-size: .72rem;
					line-height: .72rem;
					margin: 1rem 0 0 .36rem;
					small{
						font-size: .42rem;
					}
				}
				p{
					font-size: .22rem;
					line-height: .22rem;
					margin: .3rem 0 0 .36rem;
					font-family: 'pf-Regular'
				}
			}
			.card-footer{
				height: 1.15rem;
				border-top: 1px solid #f2f2f2;
				position: fixed;
				bottom: 0;
				font-size: .34rem;
				line-height: 1.15rem;
				left: 0;
				width: 100%;
				z-index: 15;
				font-family: 'pf-Medium'
			}
		}
			
		// 支付密码
		.pay-tips{
			text-align: center;
			color: #aaa;
			font-size: .24rem;
			margin: .4rem 0;
		}
		.pay-input{
			margin: 0 .3rem;
			display: flex;
			input{
				height: 1.2rem;
				width: .85rem;
				text-align: center;
				font-size: .6rem;
				background: #efefef;
				margin:0 .35rem 0 0;
			}
			input:last-child{
				margin: 0;
			}
		}
		
		// 弹窗标题
		.coupon-title{
			text-align: center;
			font-size: .3rem;
			margin: .35rem 0;
		}
		
		.coupon-title img{
			float: right;
			width: .32rem;
			height: .32rem;
			margin-right: .3rem;
		}
			// 优惠券窗口
		.coupon-mask,.card-pay,.pay-pwd{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 60vh;
			overflow: auto;
			left: 0;
			background: #fff;
			border-radius: .2rem .2rem 0 0;
			z-index: 55;
			
			.get-title{
				color: #aaa;
				margin-left: .3rem;
				text-align: left;
			}
			.coupon-list{
				margin: 0 .22rem 0 .24rem;
			}
			.coupon-li{
				width: 6.9rem;
				height: 2rem;
				display: flex;
				margin: .3rem 0 0;
				background: url('../../assets/car/bg-coupon.png') no-repeat;
				background-size: 100% 100%;
			}
			.coupon-left{
				width: 2.4rem;
				height: 100%;
				margin: 0;
				color: #fefefe;
				text-align: center;
			}
			.coupon-money{
				font-size: .72rem;
				margin-top: .4rem;
				small{
					font-size: .4rem;
					margin-right: .05rem;
				}
			}
			.coupon-condition{
				font-size: .26rem;
				
			}
			.coupon-right{
				flex: 2;
				margin-left: 0;
				margin: 0 .3rem 0 .15rem;
			}
			.coupon-type{
				font-size: .22rem;
				text-align: left;
				margin: .25rem 0 0;
			}
			.coupon-label{
				display: inline-block;
				padding: .05rem .12rem;
				background-color: #febf38;
				border-radius: .15rem;
				color: #fff;
				text-align: center;
				margin:0 .1rem 0 0;
				line-height: .22rem;
			}
			.coupon-limit-time{
				font-size: .2rem;
				color: #aaa;
				align-items: center;
				justify-content: left;
				display: flex;
				height: .3rem;
				margin: .12rem 0;
				.time{
					margin: 0;
				}
			}
			.coupon-tips{
				font-size: .2rem;
				color: #aaa;
				border-top: .03rem solid #f2f2f2;
				padding-top: .15rem;
				text-align: left;
			}
		}
		.food{
			margin-top: 1.04rem;
			overflow: hidden;
			background: #fff;
		}
		// 餐饮
		.food-des{
			height: 2.28rem;
			margin: .3rem .3rem .35rem;
			overflow: hidden;
			text-align: left;
			background-image: url('../../assets/food/food.png');
			background-size: 100% 100%;
			
		}
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
			display: flex;
		}
		.money{
			font-size: .30rem;
			margin-left: 0;
			font-weight: bold;
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
		.film-des{
			height: 2.28rem;
			margin: .3rem .3rem .35rem;
			overflow: hidden;
			text-align: left;
			background-image: url('../../assets/film/film-couple.png');
			background-size: 100% 100%;
		}
		.food-num{
			display: flex;
			align-items: center;
			padding: .12rem 0;
			.tl{
				margin-left: 0.3rem;
			}
			.tr{
				margin-right: 0.3rem;
				.buy-total {
					flex: 1;
					text-align: right;
					font-size: .28rem;
				}
				
				.buy-total input {
					width: .8rem;
					height: .6rem;
					border: none;
					outline: none;
					text-align: center;
					background-color: #f5f5f5;
					border-radius: .04rem
				}
				
				.buy-reduce.forbid {
					background: #fbfbfb;
					color: #aaa;
				}
				
				.buy-count {
					display: inline-block;
					width: .8rem;
					height: .6rem;
					line-height: .6rem;
					text-align: center;
					background-color: #f5f5f5;
					border-radius: .04rem;
				}
			}
		}
		.pay-title img{
			width: .32rem;
			height: .32rem;
		}
		// 清空
		.ml0{
			margin-left: 0;
		}
	}
</style>

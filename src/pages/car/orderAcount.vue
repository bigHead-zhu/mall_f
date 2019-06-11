<template>
	<div class="order-acount">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">订单结算</label>
		</div>
		<div class="order-mian">
			<!-- 收获地址 -->
			<div class="order-addr">
				<div class="top-line">
					<img src="../../assets/car/bg-line.png" alt="">
				</div>
				<div class="check-infomation f28 c1e" v-show="addAddress">
					<label class="add-btn" @click="tofillAddress">添加收货地址</label>
				</div>
				<div class="check-infomation f28 c1e"  v-show="!addAddress">
					<div class="check-name">
						<label class="user-name">{{addrparams.userName}}</label>
						<span class="check-num">{{addrparams.userPhone}}</span>
						<img class="icon-right" src="../../../static/img/icon-r-return.png" @click="toAddress" />
					</div>
					<div class="check-address">{{addrparams.address}}{{addrparams.addressDetails}}</div>
				</div>
			</div>
			<!-- end -->
			<!-- 商铺 -->
			<div class="car-shop" v-for="(item,index) in orderList" :key="index" v-show="!addAddress">
				<!-- 商家优惠券窗口 -->
				<div class="coupon-mask" v-show="carProps">
					<div class="coupon-title c1e ">
						优惠券
						<img src="../../../static/img/icon-close.png"  @click="couponProps" />
					</div>
					<p class="get-title f28">可领取优惠券</p>
					<ul class="coupon-list">
						<li class="coupon-li" v-for="(items,cindex) in item.merchantAndGoodsCoupon" :key="cindex">
							<div class="coupon-left">
								<p class="coupon-money"><small>¥</small>{{items.discountAmount}}</p>
								<p class="coupon-condition">满{{items.conditionAmount}}减{{items.discountAmount}}</p>
							</div>
							<div class="coupon-right">
								<p class="coupon-type">
									<label class="coupon-label">商家券</label>
									<label class="coupon-limit c1e">订单中的商品不支持</label>
								</p>
								<div class="coupon-limit-time">
									<div class="time">
										{{items.startTime}}至{{items.endTime}}
									</div>
									<div class="check-box" @click="shopCheck(index,cindex,items.couponId,items.couponDetailsId,item.merchantOrderId,item.remark)">
										<input type="radio" :name="item.merchantOrderId"  :checked="items.isCheck"/>
										<label class="checkbox-label" :class="items.isCheck?'active':''"></label>
									</div>
								</div>
								<p class="coupon-tips">
									使用说明：此券不与平台券叠加使用，请在有效期内使用
								</p>
							</div>
						</li>
					</ul>
					
				</div>
				
				<!-- 普通商城商品明细 -->
				<div class="order-hotel">
					<div class="hotel-title f28 c1e">{{item.merchantName}} <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
					<div v-for="(goodsitem,index) in item.detailsVo" :key="index">
						<div class="hotel-alls"  >
							<img class='hotel-img' v-lazy="goodsitem.goodsImg" />
							<div class="hotel-descript">
								<div class="hotel-descript-title f26 c1e">{{goodsitem.goodsName}}</div>
								<div class="hotel-type f26">
									{{goodsitem.specName}}
								</div>
								
								<div class="price">
									<label class="price-money">¥{{goodsitem.goodsAoumt}}</label>
									<label class="price-num f24">x{{goodsitem.number}}</label>
								</div>
							</div>
						</div>
						<!-- 配送方式 -->
						<div class="bt1">
							<div class="copule-tot">
								<div class="tl"><label class="icon-delivery"></label>配送方式</div>
								<div class="tr" v-if="goodsitem.freight>0" >邮费：¥{{goodsitem.freight}}</div>
								<div class="tr" v-else>快递 包邮</div>
							</div>
						</div>
					</div>
				</div>
				<!-- end -->
				<!-- 报销凭证、商家券、留言、总价 -->
				<ul class="car-goods">
					<!-- 报销凭证 -->
					<li class="expense">
						<img class="icon-expense" src="../../assets/hotel/icon-expense.png" />
						报销凭证：该服务请提前联系商家确认
					</li>
					<!-- 商家券 -->
					<li  v-show ="item.merchantAndGoodsCoupon.length==0">
						<div class="copule-tot">
							<div class="tl"><label class="icon-couple">商家券</label></div>
							<div class="tr">暂无可用</div>
						</div>
					</li>
					<li class=" couple height124"  v-show ="item.merchantAndGoodsCoupon.length>0" >
						<div class="copule-total pt30">
							<div class="tl"><label class="icon-couple">商家券</label></div>
							<div class="tr"  @click="couponProps">{{item.merchantAndGoodsCoupon.length}}张可用<img class="icon-right" src="../../../static/img/icon-r-return.png"  @click=""/></div>
						</div>
						<div class="couple-txt">此优惠券与平台优惠券不得同时使用</div>
					</li>
					<!--普通商品买家留言 -->
					<li class="comment">
						<label class="car-goods-title">买家留言：</label>
						<input type="text" class="car-goods-input remark-txt" v-model="item.remark" @blur="changeRemark(item.merchantOrderId,item.remark,'blur')" />
					</li>
					<!-- 共计 -->
					<li class="count ">
						<label class="f24 c1e mr40">共计1件商品</label>
						<label class="f24 c1e cout-money">会员价：<span class="money">¥{{item.merchantAoumt}}</span></label>
					</li>
				</ul>
				
			</div>
			
			<!--平台券  -->
			<ul class="expense-couple mb135" v-show="!addAddress">
				<li class="couple" v-show="hasPubCouple">
					<div class="copule-tot">
						<div class="tl"><label class="icon-couple">平台券</label></div>
						<div class="tr" v-show="sysCoupon.length==0">暂无可用</div>
					</div>
				</li>
				<li class="couple height124" v-show="sysCoupon.length>0">
					<div class="copule-total pt30">
						<div class="tl"><label class="icon-couple">平台券</label></div>
						<div class="tr" @click="sysProps"><label class="label">{{sysCoupon.length}}张可用</label><img class="icon-right" src="../../../static/img/icon-r-return.png" /></div>
					</div>
					<div class="couple-txt">此优惠券与商家优惠券不得同时使用</div>
				</li>
				<li class="couple" :class="switchLabel?'height124':'height114'">
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
			
		</div>
		<!-- 结算 -->
		<div class="pay-count" v-show="!addAddress">
			<div class="pay-count-price">
				<small class="f24">¥</small>{{totalAmount}}
			</div>
			<div class="now-pay" @click="confirmOrder(orderData.mainOrderId)">立即支付</div>
		</div>
		
		<!-- 优惠券弹窗 -->
		<div class="mask" v-show="mask"></div>
		<!-- 平台优惠券 -->
		 <div class="coupon-mask" v-show="sysprops">
			<div class="coupon-title c1e ">
				优惠券
				<img src="../../../static/img/icon-close.png"  @click="sysProps" />
			</div>
			<p class="get-title f28">可领取优惠券</p>
			<ul class="coupon-list">
				<li class="coupon-li" v-for="(item,index) in sysCoupon" :key="index">
					<div class="coupon-left"  v-show="item.type==0">
						<p class="coupon-money"><small>¥</small>{{item.discountAmount}}</p>
						<p class="coupon-condition">满{{item.conditionAmount}}减{{item.discountAmount}}</p>
					</div>
					<div class="coupon-left"  v-show="item.type==1">
						<p class="coupon-money"><small></small>{{item.discountAmount}}<label class="f24">折</label></p>
						<p class="coupon-condition" v-show="item.conditionAmount">满{{item.conditionAmount}}打{{item.discountAmount}}折</p>
					</div>
					<div class="coupon-right">
						<p class="coupon-type">
							<label class="coupon-label">平台券</label>
						</p>
						<div class="coupon-limit-time">
							<div class="time">
								{{item.startTime}}至{{item.endTime}}
							</div>
							<div class="check-box" @click="sysCheck(index,item.couponId,item.couponDetailsId)" >
								<input type="checkbox"   :checked="item.isCheck"/>
								<label class="checkbox-label" :class="item.isCheck?'active':''"></label>
							</div>
						</div>
						<p class="coupon-tips">
							使用说明：此券不与商家券叠加使用，请在有效期内使用
						</p>
					</div>
				</li>
			</ul>
		</div>
		 
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
		
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
		  
	 </div>
</template>

<script>
	import order from '../../server/order.js';
	import common from '../../plugins/common.js';
	import message from '../../components/message.vue';
	import sysCoupon from '../../components/sysCoupon.vue';
	
	export default{
		components:{
			message,
			sysCoupon,
		},
		data(){
			return{
				sendVal: '',
				msgContent: '',
				hasCouple:false,//T有券F无
				hasPubCouple:false,
				switchLabel:false,
				mask:false,
				carProps:false,//优惠窗口
				payProps:false,//支付窗口
				pwdProps:false,//密码窗口
				cardpayProps:false,//卡片类型
				sysprops:false,
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
				inputList: [{val:""}, {val:""}, {val:""}, {val:""}, {val:""}, {val:""}],//六位密码
				bgName:'',
				cardName:'',
				payTitle:'',
				userData:{
					userId:'',
					userToken:''
				},
				addAddress:true,//收货地址
				addrparams:{
					userId:'',
					userToken:'',
					userName:'',//收货人
					userPhone:'',//手机号
					address:"",//地址
					addressDetails:'',//详细地址
					isDefault:'',//是否默认 0默认1不
					id:""
				},
				goodsParams:{
					userId:'',
					userToken:'',
					goodsId:'',
					source:0,
				},
				orderList:[],//商品列表
				goodsData:[],//规格
				number:'',
				orderParams:{
					// 立即下单
					source:0,
					orderType:0,
					userId:"",
					userToken:"",
					immediatelyVo:{
						freight: '',
						goodsId: "",
						goodsName: "",
						marketPrice:"",
						merchantId: "",
						number: "",
						specDesc: "",
						specId: "",
						specName: "",
						supplyAmount: "",
						vipPrice: ""
					}
				},//立即下单
				totalAmount:"",//总价
				sysCoupon:[],//平台券
				checkCoup:-1,//平台券单选
				shopCoupon:[],//商家券
				shopCouponId:'',//商家券id
				shopcouponDetailsId:'',
				sysCouponId:'',//平台券id
				syscouponDetailsId:'',//领取id
				moneyParams:{
					userId:"",
					userToken:"",
					source:0
				},
				switchMoney:0,//收益钱包余额				
				orderData:[],//订单数据
				confirmParams:{
					// 确认下单
					userId:"",
					userToken:"",
					source:0,
					useBalance:1,
					userName:'',
					userPhone:'',
					detailAddress:'',
					couponId:'',
					couponDetailsId:'',
					merchantOrderVo:[]
				},
				wallent:[],//卡片类型
				blance:"",//卡片可用余额
				passwordVal:'',//六位数密码
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
				lastMoney:'',//支付金额
				fromSou:'',//0普通商品下单，1购物车下单
				shopping:[],//购物车传递参数
				carOrderParams:{
					// 购物车订单需要参数
					source:0,
					orderType:0,
					userId:"",
					userToken:"",
					shoppingCart:[]
				},
				
			}
		},
		mounted(){
			this.userData.userId = common._getCookes('userid') || undefined
			this.userData.userToken = common._getCookes('code_token') || undefined
			
			this.payParams.userId = common._getCookes('userid') || undefined
			this.payParams.userToken = common._getCookes('code_token') || undefined
			
			this.goodsParams.userId = common._getCookes('userid') || undefined
			this.goodsParams.userToken = common._getCookes('code_token') || undefined
			
			this.moneyParams.userId = common._getCookes('userid') || undefined
			this.moneyParams.userToken = common._getCookes('code_token') || undefined
			
			this.confirmParams.userId = common._getCookes('userid') || undefined
			this.confirmParams.userToken = common._getCookes('code_token') || undefined
			
			this.orderParams.userId = common._getCookes('userid') || undefined
			this.orderParams.userToken = common._getCookes('code_token') || undefined
			
			this.carOrderParams.userId = common._getCookes('userid') || undefined
			this.carOrderParams.userToken = common._getCookes('code_token') || undefined
			
			this.goodsParams.goodsId = this.$route.query.goodsId
			this.specid = this.$route.query.specid
			this.addrparams.id = this.$route.query.id || undefined
			this.addrparams.detailAddress = this.$route.query.addrDe
			this.goodsId = this.$route.query.goodsId
			this.number = this.$route.query.number
			
			 // this.orderParams.immediatelyVo = this.$route.query.goodsList;//商品详情
			this.orderParams.immediatelyVo.goodsId = this.$route.query.goodsId
			this.orderParams.immediatelyVo.specId =  this.$route.query.specid
			this.orderParams.immediatelyVo.number = this.$route.query.number
			
			this.orderParams.immediatelyVo.freight = this.$route.query.freight
			this.orderParams.immediatelyVo.goodsName = this.$route.query.goodsName
			this.orderParams.immediatelyVo.marketPrice = this.$route.query.retailAmounts
			this.orderParams.immediatelyVo.merchantId = this.$route.query.shopId
			
			this.orderParams.immediatelyVo.specDesc = this.$route.query.specDesc
			this.orderParams.immediatelyVo.specName = this.$route.query.specName
			this.orderParams.immediatelyVo.supplyAmount = this.$route.query.supplyAmounts
			this.orderParams.immediatelyVo.vipPrice =this.$route.query.vipAmounts
			// 区分订单从何处来--订单来源
			this.fromSou = this.$route.query.fromSou || 0;
			this.carOrderParams.shoppingCart = this.$route.query.shopping;
			
			this.getAddress();
			this.immOrder();
			this.IsLogin();
		},
		methods:{
			// 返回
			cancel(){
				this.$router.go(-1)
			},
			// 开关
			switchOn(){
				this.switchLabel =!this.switchLabel;
				this.getMoney();
				if(this.switchLabel){
					this.confirmParams.useBalance = 0
				}else{
					this.confirmParams.useBalance = 1
				}
			},
			// 优惠券窗口
			couponProps(){
				this.carProps = !this.carProps
				this.Props();
			},
			// 平台优惠券窗口
			sysProps(){
				this.sysprops = !this.sysprops
				this.Props();
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
						this.payParams.mainOrderId = this.confirmParams.mainOrderId
						this.payParams.isParentOrder = 0
						order.orderPay(this.payParams).then(res =>{
							if(res.code==0){
								this._setMsgBox("支付成功！")
								this.$router.push("/carPSuccess")
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
					this._setMsgBox("密码不能为空，请输入正确密码")
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
				this.mask = !this.mask;
				if (this.mask) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
			showPayProps(){
				// this.payProps = true;
				this.cardpayProps = false;
			},
			// 商家单选
			shopCheck(orderIndex,index,couponid,couponDetailsId,merchantOrderId,remark){
				// 清空平台券
				for (let isys = 0; isys < this.sysCoupon.length; isys++) {
					this.sysCoupon[isys].isCheck = false
				}
				// 
				for(let i =0;i<this.orderList.length;i++){
					for (let j = 0; j < this.orderList[i].merchantAndGoodsCoupon.length; j++) {
						this.orderList[i].merchantAndGoodsCoupon[j].isCheck = false
						if (i == Number(orderIndex) && j==Number(index)) {
							this.orderList[i].merchantAndGoodsCoupon[j].isCheck= !this.orderList[i].merchantAndGoodsCoupon[j].isCheck
						}
					}
				}
				for( let mi=0;mi<this.confirmParams.merchantOrderVo.length;mi++){
					// 根据每个订单集合的长度来push
					if(merchantOrderId==this.confirmParams.merchantOrderVo[mi].merchantOrderId){
						// 如果选中id等于订单集合中的id则push优惠券id
						this.confirmParams.merchantOrderVo[mi]={
							couponId:couponid,
							couponDetailsId:couponDetailsId,
							merchantOrderId:merchantOrderId,
							remark:remark
						}
					}
				}
				this.confirmParams.couponId = '';//平台券
				this.confirmParams.couponDetailsId = '';//领取id
				// 更新数据并关闭优惠券
				this.$forceUpdate()
				this.couponProps();
			},
			// 平台单选
			sysCheck(index,couponid,couponDetailsId){
				// 清空商家券
				for(let isshop =0;isshop<this.orderList.length;isshop++){
					for (let jshop = 0; jshop < this.orderList[isshop].merchantAndGoodsCoupon.length; jshop++) {
						this.orderList[isshop].merchantAndGoodsCoupon[jshop].isCheck = false
					}
				}
				for( let mi=0;mi<this.confirmParams.merchantOrderVo.length;mi++){
					this.confirmParams.merchantOrderVo[mi].couponId=""
					this.confirmParams.merchantOrderVo[mi].couponDetailsId=""
				}
				// 平台券
				for (let i = 0; i < this.sysCoupon.length; i++) {
					this.sysCoupon[i].isCheck = false
					if (i == Number(index)) {
						this.sysCoupon[i].isCheck = !this.sysCoupon[index].isCheck
					}
				}
				this.confirmParams.couponId = couponid;//平台券
				this.confirmParams.couponDetailsId = couponDetailsId;//领取id
				
				this.$forceUpdate();
				this.sysProps();
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
			// 跳转支付方式
			toPay(index,val,blance){
				this.cardpayProps = true;
				this.payTitle = val
				this.blance = blance
				switch (index){
					case 0:
						this.cardName = 'Silver card'
						this.bgName = 'bank'
						break;
					case 1:
						this.cardName = 'Gold card'
						this.bgName = 'gold'
						break;
					case 2:
						this.cardName = 'Drill card'
						this.bgName = 'drill'
						break;
				}
					
			},
			// 获取收货地址
			getAddress(){
				order.address(this.userData).then(res =>{
					if(res.code==0){
						if(res.data.length>0){
							this.addAddress = false;
							// 第一次展示默认地址
							if(!this.addrparams.id){
								for(let i =0;i<res.data.length;i++){
									if(res.data[i].isDefault == 0){
										this.addrparams = res.data[i]
									}
								}
							}else{
								// 渲染选择地址数据
								for(let i =0;i<res.data.length;i++){
									if(res.data[i].id == this.addrparams.id){
										this.addrparams = res.data[i]
									}
								}
							}
						}else{
							this.addAddress = true;
						}
					}else{
						console.error(res.message)
					}
				})
			},
			// 地址列表
			toAddress(){
				this.$router.push({
					path:"/carAddr",
					query:{
						goodsId:this.$route.query.goodsId,
						shopId:this.$route.query.shopId,
						specid:this.$route.query.specid,
						number:this.$route.query.number,
						freight:this.$route.query.freight,//运费
						goodsName:this.$route.query.goodsName,//商品名
						retailAmounts:this.$route.query.retailAmounts,//显示价格
						specDesc:this.$route.query.specDesc,
						specName:this.$route.query.specName,
						supplyAmounts:this.$route.query.supplyAmounts,
						vipAmounts:this.$route.query.vipAmounts
					}
				});
			},
			// 添加收获地址
			tofillAddress(){
				this.$router.push({
					path:"/fillAddr",
					query:{
						kind:'one',
						goodsId:this.$route.query.goodsId,
						shopId:this.$route.query.shopId,
						specid:this.$route.query.specid,
						number:this.$route.query.number,
						freight:this.$route.query.freight,//运费
						goodsName:this.$route.query.goodsName,//商品名
						retailAmounts:this.$route.query.retailAmounts,//显示价格
						specDesc:this.$route.query.specDesc,
						specName:this.$route.query.specName,
						supplyAmounts:this.$route.query.supplyAmounts,
						vipAmounts:this.$route.query.vipAmounts 
					}
				});
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
			// 买家留言
			changeRemark(merchantOrderId,val){
				for(let i=0;i<this.confirmParams.merchantOrderVo.length;i++){
					if(merchantOrderId==this.confirmParams.merchantOrderVo[i].merchantOrderId){
						this.confirmParams.merchantOrderVo[i].remark = val
						console.log(this.confirmParams.merchantOrderVo[i].remark)
					}
				}
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
			// 单个种类立即下单
			getOrderData(params){
				order.immeOrder(params).then(res =>{
					console.log(res)
					if(res.code==0){
						this.orderData = res.data;
						this.orderList = res.data.merchantOrder;
						// 为confirmParams添加商铺订单id
						for(let i=0; i<res.data.merchantOrder.length;i++){
							this.confirmParams.merchantOrderVo.push({
								merchantOrderId:res.data.merchantOrder[i].merchantOrderId,
								remark:res.data.merchantOrder[i].remark
							})
						}
						this.shopCoupon= res.data.merchantOrder.merchantAndGoodsCoupon;
						this.totalAmount = res.data.totalAmount
						this.sysCoupon = res.data.sysCoupon
					}else{
						console.error(res.message)
					}
				})
			},
			// 多个订单立即下单
			getCarOrder(params){
				order.carOrder(this.carOrderParams).then(res =>{
					if(res.code==0){
						this.orderData = res.data;
						this.orderList = res.data.merchantOrder; //普通商品订单商户详情
						// 为confirmParams添加商铺订单id
						for(let i=0; i<res.data.merchantOrder.length;i++){
							this.confirmParams.merchantOrderVo.push({
								merchantOrderId:res.data.merchantOrder[i].merchantOrderId,
								remark:res.data.merchantOrder[i].remark
							})
						}
						this.shopCoupon= res.data.merchantOrder.merchantAndGoodsCoupon;
						this.totalAmount = res.data.totalAmount
						this.sysCoupon = res.data.sysCoupon
					}else{
						console.error(res.message)
					}
				})
			},
			// 立即下单
			immOrder(){
				let that = this;
				if(that.fromSou==0){
					// 单一订单
					that.getOrderData(that.orderParams);
				}else if(that.fromSou==1){
					that.getCarOrder(that.carOrderParams);
				}else if(that.fromSou == 3){
					
				}
			},
			// 获取收益余额
			getMoney(){
				order.getMoney(this.moneyParams).then(res =>{
					if(res.code==0){
						console.log(res)
						this.switchMoney = res.data;
					}else{
						console.error(res.message)
					}
				})
			},
			// 确认下单立即支付
			confirmOrder(val){
				this.confirmParams.userName = this.addrparams.userName;//收货人
				this.confirmParams.userPhone = this.addrparams.userPhone;//联系人
				this.confirmParams.detailAddress = this.addrparams.detailAddress
				this.confirmParams.mainOrderId = val;//主订单id
				
				order.confirmOrder(this.confirmParams).then(res =>{
					console.log(res)
					if(res.code==0){
						this.lastMoney = res.data;
						this.immepayProps();
						this.getcard()
					}else{
						this._setMsgBox(res.message)
					}
				})
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
			// 判断是否登录
			IsLogin(){
				if(common._getCookes('code_token') || common._getCookes('userid')){
					console.log('全程为你保驾护航')
				}else{
					this.$router.push("/login")
				}
			},
			// 立即支付输密码
			imPayOrder(){
				
			},
			
		}
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
	.order-acount{
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
			z-index:5;
			position: fixed;
			top: 0;
			left: 0;
			border-bottom: 1px solid #eee;
			.icon-left{
				position: absolute;
				left: .3rem;
				display: inline-block;
				width: .16rem;
				height: .28rem;
				z-index: 5
			}
			.header-title{
				display: inline-block;
				flex: 1;
				font-weight:bold;
			}
		}
		// 订单
		.order-mian{
			margin-top: .88rem;
			border-top: .16rem solid #f1f1f1;
			// 订单地址
			.order-addr{
				width: 100%;
				height: 1.8rem;
				.top-line{
					width: 100%;
					text-align: left;
					overflow: hidden;
					height: .12rem;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.check-infomation{
					height: 1.8rem;
					overflow: hidden;
					background: #fff;
					text-align: left;
				}
				.check-name{
					margin: .34rem .52rem 0 .3rem;
					display: flex;
				}
				.check-address{
					margin: .2rem .52rem 0 .3rem;
					line-height: .34rem;
				}
				.check-num{
					color: #aaa;
					margin-left: .22rem;
				}
				.user-name{
					margin: 0;
				}
				.add-btn{
					// width: 2rem;
					display:block;
					height: .4rem;
					font-size: .3rem;
					color: #febf38;
					text-align: center;
					padding-top: .5rem;
					border-radius: .4rem;
					line-height: .4rem;
					// border: 1px solid #febf38;
				}
			}
			// 商铺
			.car-shop{
				border-top: .16rem solid #f1f1f1;
				.order-hotel{
					padding: .3rem .3rem 0 .3rem;
					text-align: left;
					background: #fff;
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
				}
				.hotel-img{
					width: 2rem;
					height: 2rem;
					margin: 0;
				}
				.hotel-descript{
					margin: .16rem 0 0 .2rem;
					flex: 1;
				}
				.hotel-descript-title{
					line-height: .34rem;
				}
				.hotel-type{
					color: #aaa;
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
					text-align: right;
				}
				.copule-tot{
					display: flex;
					height: .8rem;
					align-items: center;
				}
				
				.icon-delivery{
					display: inline-block;
					width: .26rem;
					height: .24rem;
					margin-right: .1rem;
					background: url('../../assets/car/icon-delivery.png') no-repeat;
					background-size: .26rem .24rem;
				}
				.bt1{
					border-top: 1px solid #f2f2f2;
				}
				.car-goods{
					background: #fff;
					margin: 0 .3rem;
					li{
						border-top: 1px solid #f2f2f2;
					}
					
					
					.expense{
						font-size: .26rem;
						display: flex;
						height: 1.15rem;
						align-items: center;
						color: #aaa;
					}
					
					.count,.comment{
						display: flex;
						height: .88rem;
						align-items: center;
					}
					.count{
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
					}
					// 买家留言
					.car-goods-title{
						font-size: .26rem;
						color: #aaa;
						margin: 0;
					}
					.car-goods-input{
						text-align: right;
						height: .6rem;
						flex: 2;
					}
					
					
				}
			
			}
			.tr {
				font-size: .26rem;
				color: #aaa;
				flex: 1;
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
			.icon-right{
				margin-right: 0;
				width: .1rem;
				height: .18rem;
			}
			.icon-expense{
				width: .54rem;
				height: .54rem;
				margin: 0 .2rem 0 0;
			}
			.height114{
				height: 1.14rem!important;
			}
			.height124{
				height: 1.24rem!important;
			}
			.couple-txt{
				font-size: .22rem;
				line-height: .22rem;
				color: #aaa;
				margin-top: 0.1rem;
				text-align: left;
			}
			.couple .copule-total{
				display: flex;
				align-items: center;
				width: 100%;
			}
			.couple .copule-total div{
				flex: 1;
			}
			.pt30{
				padding: .3rem 0 0 0;
			}
			// 平台券
			.expense-couple{
				border-top: .16rem solid #f1f1f1;
				li{
					margin: 0 .3rem;
					height: .84rem;
					border-bottom: .01rem solid #f2f2f2;
				}
				.expense{
					font-size: .26rem;
					display: flex;
					align-items: center;
					color: #aaa;
				}
				.copule-tot{
					line-height: .85rem;
					display: flex;
				}
				.tr .label{
					vertical-align: middle;
					margin-right: .1rem;
				}
				.tr img{
					vertical-align: middle;
				}
			}
			
		}
		// 开关
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

		.pay-title img{
			width: .32rem;
			height: .32rem;
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
					flex: 2;
					text-align: left;
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
		// 选择按钮
		.check-box{
			width: .3rem;
			height: .3rem;
			margin-right: 0;
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

		.check-box .checkbox-label{
			display: inline-block;
			width: .3rem;
			height: .3rem;
			border-radius:50%;
			border: 1px solid #babac2;
		}
		.check-box .checkbox-label.active{
			border: none!important;
			background: #ffba30;
			background-image: url('../../../static/img/icon-check-fff.png');
			background-repeat: no-repeat;
			background-size:.2rem .14rem;
			background-position: .05rem .07rem;
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
			background-image: url('../../assets/car/bg-gold.png');
		}
		// 银卡
		.bank{
			background-image: url('../../assets/car/bg-bank.png');
		}
		// 钻卡
		.drill{
			background-image: url('../../assets/car/bg-drill.png');
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
				background-repeat: no-repeat;
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
	}
	
</style>

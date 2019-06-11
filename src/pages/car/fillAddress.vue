<template>
	<div class="fill-address">
		<div class="header">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel()" />
				<div class="header-title">编辑收货地址</div>
				<div class="icon-del c1e" @click="dellist" v-show="deltxt">删除</div>
		</div>
		<div class="edit-main">
			<!-- 收货人 -->
			<div class="edit-list">
				<div class="edit-title">收货人</div>
				<input class="edit-input" type="text" placeholder="请输入收货人姓名" 
				v-model="params.userName"/>
			</div>
			<!-- 手机号码 -->
			<div class="edit-list">
				<div class="edit-title">手机号码</div>
				<input class="edit-input" type="tel" placeholder="请输入收货人手机号码" v-model="params.userPhone"/>
			</div>
			<!-- 所有地址 -->
			
			<div class="edit-list">
				<div class="edit-title">所在地址</div>
				<div class="local-txt"  v-show="addrState"  @click="maskLayer()">请选择收货地址</div>
				<div class="local-txt"  v-show="!addrState"  @click="maskLayer()">{{params.address}}</div>
				<img class="icon-right" src="../../../static/img/icon-r-return.png"  @click="maskLayer()" />
			</div>
			<!-- 详细地址 -->
			<div class="edit-list">
				<div class="edit-title">详细地址</div>
				<input class="edit-input" type="tel" placeholder="请填写街道、门牌号" v-model="params.addressDetails"  />
			</div>
			<div class="set-addr">
				<div class="set-title c1e">设置该地址为默认地址</div>
				<div class="switch" :class="switchLabel ? 'active':''">
					<label class="switchDot " @click="switchOn" :class="switchLabel ? 'active':'unactive'" ></label>
				</div>
			</div>
		</div>
		<div class="foot-btn">
			<div class="save-btn" @click="addAddress()">保存并使用</div>
		</div>
		<!-- 地址选择 -->
		<city ref="city" @settledAddr = "_getCityData"/>
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
	import hotel from '../../server/hotel.js';
	import message from '../../components/message.vue';
	import city from '../../components/address.vue';

	export default{
		components:{
			message,
			city
		},
		data(){
			return{
				switchLabel:false,
				sendVal: '',
				msgContent: '',
				params:{
					userId:'',
					userToken:'',
					userName:'',//收货人
					userPhone:'',//手机号
					address:"",//地址
					addressDetails:'',//详细地址
					isDefault:'',//是否默认 0默认1不
					type:'',//0新增，1修改,2删除
				},
				delparams:{
					id:"",
					userId:'',
					userToken:'',
					type:2,//0新增，1修改,2删除
					id:""
				},
				goodsId:'',
				deltxt:false,
				addrState:true
			}
			
		},
		mounted(){
			this.params.userId = common._getCookes('userid') || undefined
			this.params.userToken = common._getCookes('code_token') || undefined
			this.delparams.userToken = common._getCookes('code_token') || undefined
			this.delparams.userId = common._getCookes('userid') || undefined
			this.delparams.id = this.$route.query.id 
			this.params.id = this.$route.query.id || undefined
			this.params.userName = this.$route.query.name || ''
			this.goodsId = this.$route.query.goodsId
			this.params.userPhone = this.$route.query.phone || ''
			this.params.address = this.$route.query.addr || ''
			this.params.addressDetails = this.$route.query.addrDe || ''
			this.params.isDefault = this.$route.query.isDefault || '0'
			if(this.$route.query.kind == "list"){
				this.params.type = 1
				this.deltxt = true
			}else if(this.$route.query.kind == "one"){
				this.params.type = 0
				this.deltxt = false
			}
			if(this.params.idDefault==0){
				this.switchLabel = true
			}else{
				this.switchLabel = false
			}
		},
		methods:{
			// 返回
			cancel(){
				this.$router.go(-1)
			},
			// 删除
			dellist(){
				order.addressManage(this.delparams).then(res =>{
					console.log(res)
					if(res.code == 0 ){
						this._setMsgBox('已删除！')
						this.$router.push({
							path:"/carAddr",
							goodsId:this.$route.query.goodsId
						})
					}else{
						console.log(res.message)
						this._setMsgBox(res.message)
					}
				})
			},
			// 开关
			switchOn(){
				this.switchLabel =!this.switchLabel;
				if(this.switchLabel){
					this.params.idDefault = 0;
				}else{
					this.params.idDefault = 1;
				}
			},
			// 地址窗口
			maskLayer(){
				this.addrState = false;
				this.$refs.city.open()
			},
			// 添加地址
			addAddress(){
				let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
				if (!phoneReg.test(this.params.userPhone)) {
					this._setMsgBox("请输入正确的手机号码");
					return false;
				}
				order.addressManage(this.params).then(res =>{
					console.log(res)
					if(res.code == 0 ){
						this._setMsgBox('保存成功')
						this.$router.push({
							path:"/carAddr",
							query:{
								goodsId:this.goodsId,
								shopId:this.$route.query.shopId,
								specid:this.$route.query.specid,
								number:this.$route.query.number,
								freight:this.$route.query.freight,//运费
								goodsName:this.$route.query.goodsName,//商品名
								retailAmounts:this.$route.query.retailAmounts,//显示价格
								specDesc:this.$route.query.specDesc,
								specName:this.$route.query.specName,
								supplyAmounts:this.$route.query.supplyAmounts,
								vipAmounts:this.$route.query.vipAmounts,
							}
						})
					}else{
						this._setMsgBox(res.message)
					}
				})
			},
			// 城市三级联动数据
			_getCityData(data) {
				this.params.address = data.provice+data.city+data.area
				this.$refs.city.close()
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
		}
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
	.fill-address{
		width: 100%;
		height: 100vh;
		overflow: auto;
		.header {
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content: center;
			align-items: center;
			background: #fff;
			box-shadow: 2px 1px 0 #eee;
			position: fixed;
			top: 0;
			left: 0;
			font-family: 'pf-Bold';
			z-index: 16;
		}
		.icon-left {
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin:0 0 0 .3rem ;
		}
		.icon-del {
			display: inline-block;
			font-size: .28rem;
			font-family: 'pf-Medium';
			margin:0 .3rem 0 0;
		}
		// 信息编辑
		.edit-main{
			border-top: .16rem solid #f1f1f1;
			margin-top: .88rem;
		}
		.edit-list{
			margin: 0 .3rem;
			display: flex;
			font-size: .3rem;
			align-items: center;
			border-bottom: 1px solid #f1f1f1;
			height: 1.06rem;
		}
		.edit-title{
			width: 1.2rem;
			text-align: left;
			font-family: 'pf-Regular';
			margin: 0;
		}
		.edit-input{
			margin-left:.3rem; 
			height: .8rem;
			flex: 1;
			font-family: 'pf-Bold';
		}
// 		.edit-local{
// 			margin:0 0 0.3rem; 
// 			text-align: left;
// 		}
		.local-txt{
			margin: 0 0 0 .3rem;
			font-family: 'pf-Bold';
		}
		.icon-right{
			margin-right: 0;
			width: .1rem;
			height: .18rem;
		}
		// 
		.set-addr{
			display: flex;
			font-family: 'pf-Regular';
			margin: .3rem .3rem 0 .3rem;
		}
		.set-title{
			font-size: .26rem;
			margin: 0;
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
		.foot-btn{
			position:fixed;
			width: 100%;
			bottom: .5rem;
			left: .0rem;
			z-index: 5;
		}
		.save-btn{
			margin: 0 .55rem;
			height:.8rem;
			background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
			background-blend-mode: normal,normal;
			box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
			border-radius: .4rem;
			color: #fff;
			line-height: .8rem;
			font-size: .3rem;
			font-family: 'pf-Medium';
		}
	}
</style>

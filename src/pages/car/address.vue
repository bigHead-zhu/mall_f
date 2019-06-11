<template>
	<div class="address-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">收货地址</label>
		</div>
		<!-- 地址选择 -->
		<ul class="address-list">
			<li class="address-li" v-for="(item,index) in addrData" :key="index">
				<div class="user-title" @click="toOrder(item.id,item.userName,item.userPhone,item.isDefault,item.address,item.addressDetails)">
					<label class="user-name c1e">{{item.userName}}</label>
					<label class="user-phone c1e">{{item.userPhone}}</label>
					<label class="user-label" v-if="item.isDefault==0">默认</label>
				</div>
				<div class="address-txt">
					<div class="addr-detail-txt c1e">
					{{item.address}}{{item.addressDetails}}
					</div>
					<div class="icon-edit" 
					@click="tofillAddress(item.id,item.userName,item.userPhone,item.isDefault,item.address,item.addressDetails)"></div>
				</div>
			</li>
			
		</ul>
		<div class="btn-prim" @click="toAddress">新建收货地址</div>
	</div>
</template>

<script>
	import order from '../../server/order.js';
	import common from '../../plugins/common.js';

	export default{
		
		data(){
			return{
				params:{
					userId:'',
					userToken:''
				},
				addrData:[]
			}
		},
		mounted(){
			this.params.userId = common._getCookes('userid') || undefined
			this.params.userToken = common._getCookes('code_token') || undefined
			this.getAddr();
		},
		methods:{
			// 返回
			cancel(){
				this.$router.go(-1)
			},
			// 获取收货地址
			getAddr(){
				order.address(this.params).then(res =>{
					if(res.code == 0){
						if(res.data.length>0){
							this.addrData = res.data
							let addr;
							for(let i =0; i<this.addrData.length;i++){
								if(this.addrData[i].isDefault==0){
									addr = this.addrData[i];
									this.addrData.splice(i,1)
									this.addrData.unshift(addr)
								}
							}
						}
					}
					
				})
			},
			// 添加收获地址
			toAddress(){
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
			// 填写地址
			tofillAddress(id,name,phone,isDefault,addr,addrDe){
				this.$router.push({
					path:"/fillAddr",
					query:{
						id:id,
						name:name,
						phone:phone,
						isDefault:isDefault,
						addr:addr,
						addrDe:addrDe,
						kind:"list",
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
					},
				})
			},
			// 
			toOrder(id,name,phone,isDefault,addr,addrDe){
				this.$router.push({
					path:"/carOrder",
					query:{
						id:id,
						name:name,
						phone:phone,
						isDefault:isDefault,
						addr:addr,
						addrDe:addrDe,
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
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	.address-main{
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
			z-index:999;
			position: fixed;
			top: 0;
			left: 0;
			border-bottom: 1px solid #eee;
			.icon-left{
				display: inline-block;
				width: .16rem;
				height: .28rem;
				margin-left: .3rem;
			}
			.header-title{
				display: inline-block;
				flex: 1;
				font-weight:bold;
			}
		}
		// 地址列表
		.address-list{
			margin-top: .88rem;
			border-top: .16rem solid #f1f1f1;
			
			.address-li{
				border-bottom: 1px solid #f1f1f1;
				margin: 0 .3rem;
				// height: 1.68rem;
			}
			.user-title{
				text-align: left;
				display: flex;
				align-items: center;
				margin: .3rem 0 0 0;
			}
			.user-name,.user-phone{
				font-size: .32rem;
			}
			.user-name{
				margin: 0;
			}
			.user-phone{
				margin: 0 .26rem 0 .43rem;
			}
			.user-label{
				width: .7rem;
				height: .3rem;
				color: #fff; 
				line-height: .3rem;
				text-align: center;
				display: inline-block;
				font-size: .22rem;
				margin: 0;
				align-self: center;
				background-image: linear-gradient(93deg,#ff99a7 0%,	#fe7f9a 100%);
				border-radius: .15rem;
			}
			.icon-edit{
				width: .25rem;
				height: .24rem;
				margin-right: 0;
				//background: url('../../../static/img/icon-pen.png') no-repeat 100%;
				background-image: url('../../../static/img/icon-pen.png');
				background-repeat: no-repeat;
				background-size:100% 100%;
			}
			.address-txt{
				font-size: .26rem;
				text-align: left;
				display: flex;
				margin-top: .2rem;
				padding-bottom: .3rem;
				align-items: center;
			}
			.addr-detail-txt{
				width: 5.9rem;
				line-height: .34rem;
				margin: 0;
			}
			
			
		}
		.btn-prim{
			position: absolute;
			bottom: .5rem;
			left: .55rem;
			right: .55rem;
			height:.8rem;
			line-height: .8rem;
			color: #fff;
			background-image: linear-gradient(187deg,#feca3a 0%, #feb336 100%), linear-gradient(#ffba30, #ffba30);
			background-blend-mode: normal, normal;
			box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
			border-radius: .4rem;
		}
		
	}
</style>

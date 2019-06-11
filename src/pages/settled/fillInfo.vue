<template>
	<div class="fill-main">
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="gosettled"/>
			入驻
		</div>
		<div class="fill-list">
			<h4 class="c1e">基本信息</h4>
			<ul class="info-ul">
				<li>
					<p class="list-title">商家名称</p>
					<input class="list-input" v-show="btnState" v-model="registerList.merchantName" type="text" placeholder="请输入商铺名称"/>
					<input class="list-input" v-show="!btnState" v-model="registerList.merchantName" type="text" readonly="readonly" placeholder=""/>
				</li>
				<li>
					<p class="list-title">联系人</p>
					<input class="list-input" v-show="btnState" v-model="registerList.merchantContacts" type="text" placeholder="请输入联系姓名"/>
					<input class="list-input" v-show="!btnState" readonly="readonly" v-model="registerList.merchantContacts" type="text" placeholder=""/>
				</li>
				<li>
					<p class="list-title">联系方式</p>
					<input class="list-input" v-show="btnState" v-model="registerList.merchantPhone" type="tel" placeholder="请输入联系方式"/>
					<input class="list-input" v-show="!btnState" readonly="readonly" v-model="registerList.merchantPhone" type="text" placeholder=""/>
				</li>
				<li v-show="state==0">
					<p class="list-title">地址</p>
					<div class="local-txt" v-show="!addr.provice" @click="maskLayer()">请选择地址</div>
					<div class="local-txt" v-show="addr.provice" >{{addr.provice}}{{addr.city}}{{addr.area}}</div>
					<img class="icon-right"  src="../../../static/img/icon-r-return.png"  @click="maskLayer()" />
				</li>
				<li >
					<p class="list-title">详细地址</p>
					<input class="list-input" v-show="btnState" v-model="detailAddr" type="text" placeholder="请填写您的详细地址"/>
					<input class="list-input" v-show="!btnState" readonly="readonly" v-model="detailAddr" type="text" placeholder=""/>
				</li>
				
			</ul>
		</div>
		<div class="shop-list"  v-show="state==0">
			<h4 class="c1e">商铺信息</h4>
			<ul>
				<li>
					<p class="shop-title">身份证正反面照片</p>
					<img v-show="idstate" class="icon-right" src="../../../static/img/icon-r-return.png"  @click="toIdcard(0)" />
					<label v-show="!idstate" class="arl-txt">已上传</label>
				</li>
				<li>
					<p class="shop-title">手持正反面照片</p>
					<img v-show="handstate" class="icon-right" src="../../../static/img/icon-r-return.png"  @click="toIdcard(1)" />
					<label v-show="!handstate" class="arl-txt">已上传</label>
				</li>
				<li>
					<p class="shop-title">入驻类别</p>
					<img class="icon-right" v-show="btnState" src="../../../static/img/icon-r-return.png"  @click="toType()"/>
				</li>
				<li>
					<p class="shop-title">营业执照（三合一）</p>
					<img  v-show="bussstate" class="icon-right" src="../../../static/img/icon-r-return.png"  @click="toIdcard(2)" />
					<label v-show="!bussstate" class="arl-txt">已上传</label>

				</li>
			</ul>
			<input v-if="!btnState" class="btn-prim bgc3" type="button"  value="审核中,暂无法修改信息" />
			<div class="" v-if="btnState">
				<input class="btn-prim bgffb" type="button" @click="merchantRegister" value="立即入驻" />
				<div class="tips-txt">
					点击按钮则表示您已阅读且同意<span class="cffb">《商家入驻细则》</span>
				</div>
			</div>
			
		</div>
		<div class="shop-list"  v-show="state==1">
			<h4 class="c1e">商铺信息</h4>
			<ul>
				<li>
					<p class="shop-title">身份证正反面照片</p>
					<label  class="arl-txt">已上传</label>
				</li>
				<li>
					<p class="shop-title">手持正反面照片</p>
					<label class="arl-txt">已上传</label>
				</li>
				<li>
					<p class="shop-title">入驻类别</p>
					<img class="icon-right" src="../../../static/img/icon-r-return.png" />
				</li>
				<li>
					<p class="shop-title">营业执照（三合一）</p>
					<label  class="arl-txt">已上传</label>
				</li>
			</ul>
			<input v-if="!btnState" class="btn-prim bgc3" type="button"  value="审核中,暂无法修改信息" />
			<div class="" v-if="btnState">
				<input class="btn-prim bgffb" type="button" @click="merchantRegister" value="立即入驻" />
				<div class="tips-txt">
					点击按钮则表示您已阅读且同意<span class="cffb">《商家入驻细则》</span>
				</div>
			</div>
			
		</div>
		
		<!-- 入驻类别 -->
		<div class="prop-mask" v-show="showType"></div>
		<ul class="settled-type" v-show="showType">
			<li v-for="(type,index) in settTypeList" :key="index" 
			@click="selectType(type.id)"
			:class="type.id==stypeId?'cffb':''"><label>{{type.desc}}</label></li>
		</ul>
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
	import settled from '../../server/settled.js';
	import city from '../../components/address.vue';
	import message from '../../components/message.vue';
	export default{
		components:{
			city,
			message
		},
		data(){
			return{
				hidden:false,//隐藏多余
				sendVal:'',
				msgContent:'',
				idstate:true,
				handstate:true,
				bussstate:true,
				settTypeList:"",//分类
				stypeId:-1,
				showType:false,//分类展示
				detailAddr:'',
				registerList:{
					merchantName:'',
					certJust:"",
					certBack:'',
					certContacts:'',
					businessLicense:"",
					merchantContacts:'',
					merchantPhone:'',
					areaCode:'',
					cityCode:'',
					provinceCode:'',
					merchantAddress:'',
					categoryId:"",
					recommenderId:'',
				},
				addr:{},//选择地址
				btnState:true,//申请状态
				loadData:{},
				state:''
			}
		},
		
		mounted(){
			this.state =  this. $route.query.state;
			this.loadData = this.$route.query.data;

			if(this.state == 1){
				this.btnState = false;
				this.registerList.certJust = this.loadData.certJust
				this.registerList.certBack = this.loadData.certBack
				this.registerList.certContacts = this.loadData.certContacts
				this.registerList.businessLicense = this.loadData.businessLicense;//营业
				this.registerList.merchantContacts = this.loadData.merchantContacts;
				this.registerList.merchantPhone =  this.loadData.merchantPhone;
				this.registerList.merchantName =  this.loadData.merchantName;
				this.registerList.merchantAddress =  this.loadData.merchantAddress;
				this.detailAddr =  this.loadData.merchantAddress;
			}else {
				this.btnState = true
				this.registerList.certJust = this.$route.query.IdcardImg ;//身份证
				this.registerList.certBack = this.$route.query.IdcardImgDou;//身份证
				this.registerList.certContacts = this.$route.query.handImg;//手持
				this.registerList.businessLicense = this.$route.query.bussImg;//营业
				this.registerList.merchantContacts = this.$route.query.merchantContacts ;
				this.registerList.merchantPhone = this.$route.query.merchantPhone;
				this.registerList.merchantName = this.$route.query.merchantName;
				this.registerList.areaCode = this.$route.query.areaCode ;
				this.registerList.cityCode = this.$route.query.cityCode;
				this.registerList.provinceCode = this.$route.query.provinceCode;
				this.registerList.merchantAddress = this.$route.query.merchantAddress;
				this.registerList.categoryId = this.$route.query.categoryId;
				this.registerList.recommenderId = this.$route.query.recommenderId;
				this.addr.provice = this.$route.query.provice;
				this.addr.city = this.$route.query.city;
				this.addr.area = this.$route.query.area;
				this.detailAddr = this.$route.query.detailAddr;
			}
			
			if(this.$route.query.IdcardImg|| this.$route.query.IdcardImgDou){
				this.idstate = false;
			}
			if(this.$route.query.handImg){
				this.handstate = false;
			}
			if(this.$route.query.bussImg){
				this.bussstate = false;
			}
			this.settlType();
		},
		methods:{
			// 返回
			gosettled(){
				this.$router.push("/settled");
			},
			// 图片上传
			toIdcard(obj){
				this.$router.push({
					path:'/settledId',
					query:{
						kind:obj,
						merchantName:this.registerList.merchantName,
						IdcardImg:this.$route.query.IdcardImg,
						IdcardImgDou:this.$route.query.IdcardImgDou,
						handImg:this.$route.query.handImg,
						bussImg: this.$route.query.bussImg,
						merchantContacts:this.registerList.merchantContacts,
						merchantPhone:this.registerList.merchantPhone,
						areaCode:this.registerList.areaCode,
						cityCode:this.registerList.cityCode,
						provinceCode:this.registerList.provinceCode,
						merchantAddress:this.registerList.merchantAddress,
						categoryId:this.registerList.categoryId,
						recommenderId:this.registerList.recommenderId,
						provice:this.addr.provice,
						city:this.addr.city,
						area:this.addr.area,
						detailAddr:this.detailAddr
					}
				})
			},
			// 获取入驻类别
			settlType(){
				settled.settlType().then(res=>{
					console.log(res)
					if(res.code==0){
						this.settTypeList = res.data;
					}else{
						console.erro(res.message)
					}
				})
			},
			// 地址窗口
			maskLayer(){
				this.$refs.city.open()
			},	
			toType(){
				this.showType =!this.showType
			},
			// 选择分类
			selectType(id){
				this.stypeId = id;
				
				this.registerList.categoryId = id;
				this.showType =!this.showType
			},
			// 商家入驻
			merchantRegister(){
				let merhcnatName = this.registerList.merhcnatName, certJust = this.registerList.certJust,
				certBack = this.registerList.certBack , certContacts = this.registerList.certContacts,
				businessLicense = this.registerList.businessLicense,merchantPhone = this.registerList.merchantPhone ,
				merchantAddress = this.registerList.merchantAddress , provinceCode = this.registerList.provinceCode,
				cityCode = this.registerList.cityCode , areaCode = this.registerList.areaCode,categoryId= this.registerList.categoryId;
			
				this.registerList.merchantAddress = this.addr.provice+this.addr.city+this.addr.area+this.detailAddr;
				this.registerList.recommenderId = '';
				console.log(this.registerList)
				let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
				if (!phoneReg.test(merchantPhone)) {
					this._setMsgBox("请输入正确的手机号码");
					return false;
				}
				if(!merhcnatName || !certJust || !certBack || !certContacts || !businessLicense || !merchantPhone || !merchantAddress || !provinceCode || !cityCode || !areaCode ||!categoryId){
					settled.seetlRegister(this.registerList).then(res =>{
						console.log(res);
						if(res.code == 0){
							this._setMsgBox("默认登录密码为手机号后6位！")
							this.btnState = false;
						}else{
							this._setMsgBox(res.message)
						}
					})
				}else{
					this._setMsgBox("请将信息填写完整！")
				}
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
			// 获取城市地址
			_getCityData(data) {
				this.addr = {}
				this.$refs.city.close()
				this.addr = data
				// 省市区
				this.registerList.provinceCode = this.addr.provinceCode;
				this.registerList.cityCode = this.addr.cityCode;
				this.registerList.areaCode = this.addr.areaCode;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";
	.fill-main{
		width: 100%;
		height: 100vh;
		overflow: auto;
		position: relative;
		background-color: #fff;
		
		.fill-list{
			margin: 0 .3rem;
			color: #1e1e1e;
			text-align: left;
			
			h4{
				font-size: .34rem;
				font-family: 'pf-Bold';
				margin: 1.28rem 0 .25rem 0;
			}
			
			.info-ul li{
				height: 1.54rem;
				display: flex;
				flex-wrap: wrap;
				border-bottom: 1px solid #ececec;
				.list-title{
					width: 100%;
					height: .26rem;
					font-size: .24rem;
					padding-top: .35rem;
				}
				.list-input{
					width: 100%;
					border: none;
					margin: 0;
					font-size: .26rem;
				}
				.list-input:placeholder{
					color: #aaa;
				}
				.local-txt{
					margin:.25rem 0 0 0;
				}
				.icon-right{
					margin-right: 0;
					margin-top: .25rem;
					width: .1rem;
					height: .18rem;
				}
				
			}
			.info-ul li:last-child{
				border: none;
			}
		}
		.shop-list{
			padding: 0 .3rem;
			color: #1e1e1e;
			border-top: .16rem solid #f1f1f1;
			text-align: left;
			h4{
				font-size: .34rem;
				font-family: 'pf-Bold';
				margin: .35rem 0 .25rem 0;
			}
			ul li{
				display: flex;
				align-items: center;
				height: .94rem;
				font-size: .24rem;
				border-bottom: 1px solid #f1f1f1;
				.icon-right{
					margin-right: 0;
					width: .1rem;
					height: .18rem;
				}
				
			}
			.btn-prim{
				width: 100%;
				height:.8rem;
				border-radius: .4rem;
				color: #fff;
				margin-top: .7rem;
				font-size: .3rem;
			}
			.bgffb{
				background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
				background-blend-mode: normal,normal;
				box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
			}
			.tips-txt{
				margin-top: .3rem;
				text-align: center;
				color: #aaa;
				padding-bottom: .5rem;
				font-size: .24rem;
			}
			
			.arl-txt{
				margin-right: 0;
				color: #aaa;
			}
		}
		// 入驻类别
		.prop-mask{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.4);
			z-index: 39;
		}
		.settled-type{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			font-size: .26rem;
			max-height: 70vh;
			overflow: auto;
			background: #fff;
			z-index: 49;
			li{
				width: 100%;
				height: .8rem;
				line-height: .8rem;
				text-align: left;
				border-bottom: 1px solid #f6f6f6;
				label{
					margin-left: .3rem;
				}
			}
		}
		.bgc3{
			background: #c3c3c3!important;
			color: #fff!important;
			margin-bottom: .5rem;
		}
}
</style>

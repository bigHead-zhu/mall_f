<template>
		<!-- 地址 -->
		<div class="city-main" v-show="addrProps">
			<div class="mask"></div>
			<div class="addr-main"  name ="address">
				<div class="addr-title c1e f32">
					您的位置
					<img @click="close" src="../../static/img/icon-close.png" />
				</div>
				<div class="addr-detail">
					<!-- 地址 -->
					<ul class="address-title">
						<li v-for="(item,index) in addressTitle" 
						:key="index" :class="item.title ?'active':''"
						@click="titleTab(index)" :codeId="item.code"
							v-if="item.state" >
							{{item.txt}}
						</li>					
					</ul>
					<div class="address-list">
						<!-- 省 -->
						<ul class="ad-list provice" v-if="addressData.codeproviceState">
							<li v-for="(item,index) in proviceData" 
							:class="addressData.proviceIndex == index?'person':''"
							@click="tocity(item.areaCode,item.name,index)" 
							:key="index">{{item.name}}</li>
						</ul>
						<!-- 市 -->
						<ul class="ad-list provice" v-if="addressData.codecityState">
							<li v-for="(item,index) in cityData" 
							@click="toarea(item.areaCode,item.name,index)" 
							:class="addressData.cityIndex == index?'person':''"
							:key="index">{{item.name}}</li>
						</ul>
						<ul class="ad-list provice" v-if="addressData.codeareaState">
							<li v-for="(item,index) in areaData" 
							 :key="index"
							 :class = "addressData.areaIndex == index?'person':''"
							 @click = "areaval(item.areaCode,item.name,index)">{{item.name}}</li>
						</ul>
					</div>
				</div>
			</div>
			
		</div>
	<!--  -->
</template>

<script>
	import hotel from '../server/hotel.js';
	import common from '../plugins/common.js';
	
	export default{
		props:{
			citykies:{
				type:String,
				default:''
			},
			cityIdkies:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				addrProps:false,
				addressData:{
					areaIndex:'',
					cityIndex:'',
					proviceIndex:'',
					codeproviceState:true,//长列显示
					codecityState:false,
					codeareaState:false,
				},
				proviceData:[],
				cityData:[],
				areaData:[],
				addressTitle:[
					{
						title:true,//切换显示状态
						state:true,//切换前显示状态
						txt:'请选择',
						code:'',
						index:''
					},{
						title:false,
						state:false,
						txt:'请选择',
						code:'',
						index:''
					},{
						title:false,
						state:false,
						txt:'请选择',
						code:'',
						index:''
					}
				],
				local: {
					
				},
				code:{
					areaId:0
				},
				settleData:{
					// 入驻地址
				},
			}
		},
		mounted(){
			this.local.localposition ='北京'
			this.local.localareaId =  '110000'
			this.city()
		},
		methods:{
			/*关闭 */
			close() {
				this.addrProps = false;
				document.body.style.overflow = 'initial';
			},
			open(){
				this.addrProps = true;
				document.body.style.overflow = 'hidden';
			},
			titleTab(index){
				switch(index){
					case 0:
						this.tocity(this.addressTitle[0].code,this.addressTitle[0].txt,this.addressTitle[0].index)
						this.addressData.cityIndex = "";
						this.addressData.areaIndex = "";
						this.addressTitle[0].title = true
						this.addressTitle[1].title = false
						this.addressTitle[2].title = false
						this.addressData.codeproviceState = true;
						this.addressData.codecityState = false;
						this.addressData.codeareaState = false;
						break;
					case 1:
						this.addressTitle[0].title = false
						this.addressTitle[1].title = true
						this.addressTitle[2].title = false
						this.addressData.codeproviceState = false;
						this.addressData.codecityState = true;
						this.addressData.codeareaState = false;
						break;
					case 2:
						this.addressTitle[0].title = false
						this.addressTitle[1].title = false
						this.addressTitle[2].title = true
						this.addressData.codeproviceState = false;
						this.addressData.codecityState = false;
						this.addressData.codeareaState = true;
						break;
				}
			},
			city(){
				hotel.city(this.code).then(res =>{
					console.log(res);
					if(res.code == 0){
						this.proviceData = res.data;
					}else{
						console.log(res.message)
					}
				})
			},
			tocity(areaId,val,index){
				this.addressTitle[1].state = true;
				this.addressData.codeproviceState = false;
				this.addressData.codecityState = true;
				this.addressData.codeareaState = false;
				this.addressTitle[0].code = areaId;
				this.addressTitle[0].index = index;
				this.addressTitle[0].title = false;
				this.addressTitle[1].title = true;
				this.addressTitle[2].title = false;
				this.addressData.proviceIndex = index;
				this.addressTitle[0].txt = val;
				this.code.areaId = areaId;
				if(areaId== 110000 || areaId == 120000 || areaId == 500000 || areaId == 300000){
					this.local.localposition = val
					this.local.localareaId = areaId
					// 
				}
				
				this.settleData.provice = val;
				this.settleData.provinceCode = areaId;
				
				hotel.city(this.code).then(res =>{
					console.log(res);
					if(res.code == 0){
						this.cityData = res.data;
					}else{
						console.log(res.message)
					}
				})	
							
			},
			toarea(areaId,val,index){
				if(areaId== 110100 || areaId == 110200){
					this.local.localposition = "北京"
					this.local.localareaId = 110000
				}else if(areaId == 120100 || areaId == 120200){
					this.local.localposition = "天津"
					this.local.localareaId = 120000
				}else if(areaId == 500100 || areaId == 500200){
					this.local.localposition = "重庆"
					this.local.localareaId = 500000
				}else if(areaId == 300100 || areaId == 300200){
					this.local.localposition = "上海"
					this.local.localareaId = 300000
				}else{
					this.local.localposition = val;
					this.local.localareaId = areaId
				}
				this.settleData.cityCode = areaId;
				this.settleData.city = val;

				this.addressTitle[0].title = false;
				this.addressTitle[1].txt = val;
				this.addressTitle[1].title = false;
				this.addressTitle[1].code = areaId;
				this.addressTitle[1].index = index;
				this.addressTitle[2].title = true;
				this.addressTitle[2].state = true;
				this.code.areaId = areaId;
				this.addressData.codeproviceState = false;
				this.addressData.codecityState = false;
				this.addressData.codeareaState = true;
				this.addressData.cityIndex = index;
				hotel.city(this.code).then(res =>{
					if(res.code == 0){
						this.areaData = res.data;
					}else{
						console.log(res.message)
					}
				})	
			},
			areaval(areaId,val,index){
				
				this.settleData.area = val;
				this.settleData.areaCode = areaId;

				this.addressTitle[2].txt = val;
				this.addressTitle[0].title = false;
				this.addressTitle[1].title = false;
				this.addressTitle[2].title = true;
				this.addressData.areaIndex = index;
				this.close();
				this.$emit("settledAddr",this.settleData)
				this.$emit("getCityData", this.local)
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>
	.city-main{
		width: 100%;
		height: 100vh;
		.mask {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .4);
			z-index: 30;
		}
		.addr-main{
			width: 100%;
			height: 10rem;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			border-radius: .2rem .2rem 0 0;
			z-index: 45;
			.addr-title{
				text-align: left;
				margin:.32rem .3rem;
			}
			.addr-title img{
				float: right;
				width: .32rem;
				height: .32rem;
			}
			.addr-detail{
				margin: 0 .3rem;
			}
			.address-title{
				height: .46rem;
				line-height: .46rem;
				font-size: .26rem;
				color: #ffba30;
				border-bottom:.03rem  solid  #f2f2f2;
			}
			.address-title li{
				float: left;
				height: 100%;
				margin-right: .7rem;
			}
			.address-title li.active{
				border-bottom:.03rem  solid  #ffba30;
			}
			.address-list{
				
			}
			.ad-list{
				float: left;
				height: 8.58rem;
				overflow: auto;
				text-align: left;
				margin-right: .8rem;
			}
			.ad-list .person{
				color: #ffba30;
			}
			.ad-list li{
				font-size: .26rem;
				color: #1e1e1e;
				line-height: .26rem;
				margin-top: .55rem;
			}
		}
	}
	
</style>

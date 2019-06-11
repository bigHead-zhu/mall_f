<template>
	<div class="trade">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">交易明细</label>
		</div>
		
		<!--  -->
		<div class="main">
			<ul class="title-ul">
				<li v-for="(item,index) in title" :key="index">
					<label :class="index==selectIndex ? 'active':''" @click="tab(index)">{{item.name}}</label>
				</li>
			</ul>
			<!--  -->
			<div class="tips-txt ">
				<label>商家您好，此页仅展示收入与提现，更多内容请在后台查询</label>
			</div>
			
			<div class="main" v-show ="!list">
				<p class="tips">暂时没有交易数据~</p>
			</div>
			
			<div class="" v-show="list">
				<scrollto :datalist="list" @scrollend="nextList">
					<ul class="detail-ul" v-if="selectIndex==0">
						<li v-for="(item,index) in list" :key="index">
							<div class="times">
								<label class="ml f26 caaa">
									{{item.date}}
								</label>
							</div>
							<div class="money">
								<label class="m-title ml c1e ">
									<span class="dott"></span>
									{{item.describe}}
								</label>
								<label class="m-price mr f32">
									+ {{item.amount}}
								</label>
							</div>
						</li>
						
					</ul>
				</scrollto>
			
				<!-- 提现 -->
				<scrollto :datalist="listCash" @scrollend="nextList">
					<ul class="detail-ul" v-if="selectIndex==1">
						<li v-for="(item,index) in listCash" :key="index">
							<div class="times">
								<label class="ml f26 caaa">
									{{item.date}}
								</label>
								<label class="mr de-txt ">
									{{item.statusType}}
								</label>
							</div>
							<div class="money">
								<label class="m-title ml c1e ">
									<span class="dott grr"></span>
									{{item.describe}}
								</label>
								<label class="m-price mr f32">
									- {{item.amount}}
								</label>
							</div>
						</li>
					</ul>
				</scrollto>
			</div>

		</div>
	</div>
</template>

<script>
	import settled from '../../server/settled.js';
	import scrollto from '../../components/scrollto.vue';
	
	export default{
		components:{
			scrollto
		},
		data(){
			return{
				list:[],
				listCash:[],
				params:{
					fromNum:1,
					pageSize:10,
					merchantId:'',
					merchantToken:'',
					type:0,
					source:0
				},
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
				title:[
					{
						id:0,
						name:'收益明细'
					},
					{
						id:1,
						name:'提现明细',
					}
				],
				selectIndex:0,//默认选中
			}
		},
		mounted(){
			this.params.merchantId= this.$route.query.merchantId;
			this.params.merchantToken= this.$route.query.merhcnatToken;
			this.detailList();
		},
		methods:{
			cancel(){
				this.$router.go(-1)
			},
			tab(index){
				// 
				this.selectIndex = index;
				this.params.type = index
				this.detailList();
			},
			// 明细
			detailList(){
				settled.moneyDetail(this.params).then(res =>{
					console.log(res);
					if(res.code==0){
						if(this.params.type==0){
							this.list = res.data.amountDetailsVo;
							
						}else {
							this.listCash = res.data.amountDetailsVo;
						}
						if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
						  this.loadingstate = false
						  this.loadingtext = '到底线了~'
						}
					}else{
						console.log(res.message);
					}
				})
			},
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				// this.searchGoodsData = []
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.detailList()
			  }
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	.trade{
		width: 100%;
		height: 100vh;
		overflow: auto;
		
		
		.main{
			margin-top: .88rem;
		.title-ul{
			overflow: hidden;
			height: auto;
			width: 100%;
			display: flex;
			line-height: .68rem;
			border-bottom: .16rem solid #f2f2f2;
			li{
				flex: 1;
				margin: 0;
			}
			label{
				font-size: .28rem;
				color: #7f7f7f;
				padding: .14rem 0;
			}				
			.active{
				color: #feb336;
				border-bottom: 0.04rem solid #feb336;
			}				
		}
		.tips-txt{
			width: 100%;
			height: .48rem;
			overflow-x: hidden;
			font-size: .24rem;;
			background-color: #fff9e9;
			color: #feb336;
			text-align: left;
			label{
				margin: 0;
				display: block;
				width: 100%;
				overflow: hidden;
				line-height: .48rem;
				padding-left: .34rem;
			}
		}
		.detail-ul{
			
			li{
				margin: 0 .3rem;
				// height: 1.64rem;
				border-bottom: 1px solid #f1f1f1;
			}
			.times{
				display: flex;
				margin: .4rem 0 .35rem 0;
			}
			.de-txt{
				display: inline-block;
				width: .9rem;
				height: .3rem;
				border-radius: .14rem;
				font-size: .22rem;
				line-height: .3rem;
				color: #feb336;
				border: solid 1px #feb336;
				font-family: 'pf-Regular'
			}
			.caaa{
				color: #aaa;
				font-family: 'pf-Regular'
			}
			.ml{
				margin-left: 0;
			}
			.mr{
				margin-right: 0
			}
			.money{
				display: flex;
				margin-bottom: .45rem;
				.m-title{
					font-size: .3rem;
				}
				.m-price{
					color: #b50000;
					font-family: 'pf-Bold'
				}
			}
			.dott{
				width: .1rem;
				height:.1rem;
				display: inline-block;
				margin-right: .2rem;
				border-radius: 50%;
				background-color: #ffba30;
			}
			.grr{
				background-color: #00cf67!important;
			}
			
			
		}
		
	}
	.tips{
		color: #aaa;
		font-size: .28rem;
		padding-top: .68rem;
	}

}
</style>

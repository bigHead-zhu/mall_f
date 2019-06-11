<template>
	<div class="diectory-main">
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			企业名录
		</div>
		<div class="main">
			<scrollto :datalist="list" @scrollend="nextList">
				<ul>
					<li class="company-name" v-for="(item,index) in list" :key="index" @click="toCompany(item.id)">
						<img class="comp-aimg" :src="item.enterpriseLogo"   />
						<div class="comp-txt" >
							{{item.enterpriseAbstract}}
						</div>
					</li>
				</ul>
			</scrollto>
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
				params:{
					fromNum:1,
					pageSize:10
				},
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
		mounted(){
			this.getDirectory();
		},
		methods: {
			// 返回
			cancel(){
				this.$router.go(-1);
			},
			// 企业名录
			getDirectory(){
				settled.sentence(this.params).then(res =>{
					console.log(res);
					if(res.code==0){
						this.list = res.data.enterpriseEdenVo;
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
				this.getDirectory()
			  }
			},
			toCompany(val){
				this.$router.push({
					path:'/company',
					query:{
						id:val
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	.diectory-main{
		width: 100%;
		height: 100vh;
		overflow: auto;
		background: #f6f6f6;
		
		.main{
			margin: 1.6rem .3rem 0;
			ul{
				list-style: none;
				li{
					width: 100%;
					background: red;
				}
			}
		}
		.company-name {
			margin-bottom: .72rem;
			background: #fff;
			width: 100%;
			height: 2rem;
			display: flex;
			box-shadow: .02rem 0.06rem .12rem 0px rgba(199, 199, 199, 0.2);
			border-radius: 4px;
			border-bottom: .01rem solid #eee;
			border-top: .01rem solid #f5f5f5;
			position: relative;
		}
		.comp-aimg {		
			width:1.6rem;
			display: inline-block;
			object-fit: contain;
			background:#fff; 
			height: 100%;
			// height: 2rem;
			margin: -.3rem .34rem .3rem .28rem;		
		}
		
		.main{
			.company-name {
				margin-top: .7rem;
				background: #fff;
				width: 100%;
				height: 2rem;
				display: flex;
				box-shadow: .02rem 0.06rem .12rem 0px rgba(199, 199, 199, 0.2);
				border-radius: 4px;
				border-bottom: .01rem solid #eee;
				border-top: .01rem solid #f5f5f5;
				position: relative;
			}
			.comp-aimg {		
				width:1.6rem;
				display: inline-block;
				height: 100%;
				height: 2rem;
				margin: -.3rem .34rem .3rem .28rem;		
			}
			
			.comp-txt {
				font-size: .24rem;
				line-height: .32rem;
				height: 1.2rem;
				color: #7f7f7f;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				font-family: 'pf-Regular';
				-webkit-box-orient: vertical;
				margin: .4rem 0 0;
			}
		}
}
</style>

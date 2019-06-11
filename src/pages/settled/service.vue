<template>
	<div class="service-main">
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			企业服务
		</div>
		<div class="main">
			<ul>
				<li class="f24 c1e" v-for="(item,index) in list" :key="index" @click="toEmployee(item.id)">
					<img class="icon" :src="item.enterpriseLogo" />
					{{item.enterpriseName}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import settled from '../../server/settled.js';

	export default{
		data(){
			return{
				params:{
					pageSize:10,
					fromNum:1,
				},
				list:"",
			}
		},
		mounted(){
			this.getService()
			
		},
		methods: {
			// 返回
			cancel(){
				this.$router.go(-1);
			},
			// 服务列表
			getService(){
				settled.comService(this.params).then(res =>{
					console.log(res)
					if(res.code == 0){
						this.list = res.data.enterpriseServiceVo;
					}else{
						console.log(res.message)
					}
				})
			},
			// 员工培训
			toEmployee(id) {
				this.$router.push({
					path:"/employee",
					query:{
						id:id
					}
				})
			},
		},
	}
</script>
<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	.service-main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #f6f6f6;
		
		.main{
			margin-top:1.3rem;
			 ul{
				 margin: 0 .3rem;
				 display: flex;
				 flex-wrap: wrap;
				 li{
					 margin: 0 0 .16rem .16rem;
					 width: 3.36rem;
					 text-align: left;
					 overflow: hidden;
					 text-overflow: ellipsis;
					 white-space: nowrap;
					 height: .9rem;
					 line-height: .9rem;
					 background: #fff;
				 }
				 li:nth-child(2n-1){
					 margin: 0 0 .16rem 0;
				 }
				 .icon{
					 display: inline-block;
					 width: .4rem;
					 height: .4rem;
					 margin: 0 .2rem 0 .28rem;
					 background-size: 100% 100%;
					 background-repeat: no-repeat;
					 vertical-align: middle;
				 }
				
			 }
		}
}
</style>

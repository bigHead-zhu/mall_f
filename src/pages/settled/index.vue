<template>
	<div class="settled-main">
		<div class="header">
			入驻
		</div>
		<div class="settled-list">
			<div class="check-in mr16" @click="gofillInfo()">
				<img class="settled-bg" src="../../assets/setteled/check-settled.png" />
				<div class="settled-title">
					<p class="sett-name c1e">商家入驻</p>
					<p class="sett-en">Merchant entry</p>
				</div>
			</div>
			<router-link to="/settledLogin"  tag="div" class="check-login">
				<img class="settled-bg" src="../../assets/setteled/check-login.png" />
				<div class="settled-title">
					<p class="sett-name c1e">商家登录</p>
					<p class="sett-en">Merchant login</p>
				</div>
			</router-link>
		</div>
		<!-- 企业家 -->
		<router-link tag="div" to="/park" class="company-play">
			<img class="settled-bg" src="../../assets/setteled/check-login.png" />
			<div class="settled-title ml34">
				<p class="sett-name c1e">企业家乐园</p>
				<p class="sett-en">Enterpriser's Paradise</p>
			</div>
			<img class="icon-right" src="../../assets/setteled/icon-goright.png" />
		</router-link>
		<foot></foot>
	</div>
</template>

<script>
	import foot from '../../components/footer.vue';
	export default{
		components:{
			foot
		},
		data(){
			return{
				
			}
		},
		methods:{
			gofillInfo(){
				this.$router.push({
					path:'/settledInfo',
					query:{
						state:0
					}
				})
			}
		}
	}
</script>
<style lang="scss"  scoped="scoped">
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";
	.settled-main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		background-color: #f1f1f1;
		
		.settled-list{
			margin: 1.3rem .24rem  0  .24rem;
			display: flex;
			align-items: center;
			.check-in,.check-login{
				flex: 1;
				display: flex;
				height: 2.4rem;
				background: #fff;
				text-align: left;
				border-radius: .08rem;
			}
			.mr16{
				margin-right: .14rem;
			}
				
		}
		.settled-bg{
			width: 1.65rem;
			height: 1.38rem;
			margin: .5rem 0 0 .08rem;
		}
		.settled-title{
			margin: .92rem 0 0 0.02rem;
			.sett-name{
				font-size: .3rem;
				font-family: 'pf-Bold'
			}
			.sett-en{
				font-size: .2rem;
				color: #aaa;
				font-family: 'pf-Regular'
			}
		}
		
		.company-play{
			display: flex;
			margin: .14rem .24rem 0 .24rem;
			text-align: left;
			height: 2.4rem;
			border-radius: 0.08rem;
			background: #fff;
		}
		.ml34{
			margin-left: .34rem;
		}
		.icon-right{
			width: .3rem;
			height: .3rem;
			line-height: 2.4rem;
			margin-top: 1.05rem;
			margin-right: .18rem;
		}
	}
</style>

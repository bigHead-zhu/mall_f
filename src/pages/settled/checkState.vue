<template>
	<div class="check-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>入驻</label>
		</div>
		<!-- 审核 -->
		<div class="main">
			<img class="pass" src="../../assets/setteled/settle-failed.png" />
			<div class="tips">
				您的入驻申请暂未通过审核！
			</div>
		</div>
		<div class="footer-btn">
			<div class="btn-primary" @click="toFill">重新填写</div>
		</div>
	</div>
</template>

<script>
	export default{
		methods: {
			toFill() {
				this.$router.push({
					path:'/settledInfo',
					query:{
						state:0
					}
				})
			}
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.check-main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #f1f1f1;
		.header{
			width: 100%;
			height: .88rem;
			line-height: .88rem;
			font-size: .34rem;
			color: #1e1e1e;
			text-align: center;
			background: #fff;
			z-index:9;
			font-family: 'pf-Bold';
			position: fixed;
			border-bottom: 1px solid #f5f5f5;
			top: 0;
			left: 0;
		}
		.icon-left{
			position: absolute;
			left: .32rem;
			top: .28rem;
			width: .16rem;
			height: .28rem;
			z-index: 19
		}
		.main{
			margin-top: 2.2rem;
			.pass{
				width: 3.58rem;
				height: 3rem;
			}
			.tips{
				margin: .4rem 1rem 0;
				color: #aaa;
				font-size: .3rem;
				font-family: 'pf-Regular';
			}
		}
		.footer-btn{
			position: fixed;
			bottom: 0.5rem;
			left: 0;
			width: 100%;
			height: auto;
			.btn-primary{
				margin: 0 .55rem;
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: .3rem;
				color: #fff;
				background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
				background-blend-mode: normal,normal;
				box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
				border-radius: 0.4rem;
			}
			
		}
	}
</style>

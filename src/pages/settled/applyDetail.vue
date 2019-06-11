<template>
	<div class="apply-result">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			支付结果
		</div>
		<div class="apply-main">
			<img src="../../assets/setteled/cash.png"  />
			<div class="cash-txt c1e">已提交提现申请，审核成功后到账</div>
			<!-- <router-link><label>123</label></router-link> -->
			
			<router-link to="/settled" class="btn-small f28">返回</router-link>
		</div>
		
	</div>
</template>

<script>
	
	
	export default{
		
		methods: {
			// 返回
			cancel(){
				this.$router.push("/index");
			},
			
			
		},
	}
</script>
<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	.apply-result{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #fff;
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
		// 
		.apply-main{
			text-align: center;
			margin-top: .88rem;
			border-top: .16rem solid #f1f1f1;
			img{
				margin-top: 1.06rem;
				width: 1.6rem;
				height: 1.3rem;
			}
			.cash-txt{
				font-size: .3rem;
				margin-top: .32rem;
			}
			.btn-small{
				display: inline-block;
				width: 1.80rem;
				height: .60rem;
				margin-top: 1.48rem;
				line-height: .6rem;
				border-radius: .30rem;
				border: solid 1px #ffba30;
				color: #ffba30;
			}
		}
	}
</style>

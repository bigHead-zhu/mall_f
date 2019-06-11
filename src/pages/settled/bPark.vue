<template>
	<div class="business-main">
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			企业家乐园
		</div>
		<div class="main">
			<router-link tag="div" to="/directory" class="company-play">
				<img class="settled-bg" src="../../assets/setteled/bg-sentance.png" />
				<div class="settled-title ml34">
					<p class="sett-name c1e">企业名录</p>
					<p class="sett-en">Enterprise directory</p>
				</div>
				<img class="icon-right" src="../../assets/setteled/icon-goright.png" />
			</router-link>
			<router-link tag="div" to="/service" class="company-play">
				<img class="settled-bg" src="../../assets/setteled/bg-server.png" />
				<div class="settled-title ml34">
					<p class="sett-name c1e">企业服务</p>
					<p class="sett-en">Enterprise service</p>
				</div>
				<img class="icon-right" src="../../assets/setteled/icon-goright.png" />
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		methods: {
			// 返回
			cancel(){
				this.$router.go(-1);
			},
		},
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	.business-main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #f6f6f6;
		
		
		.main{
			margin-top: 1.3rem;
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
			.settled-bg{
				width: 2.24rem;
				height: 1.54rem;
				margin: .5rem .35rem 0 .08rem;
			}
		}
 }
</style>

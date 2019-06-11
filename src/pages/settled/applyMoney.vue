<template>
	<div class="settled-apply">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>提现申请</label>
		</div>
		<div class="merchant-main">
			<div class="apply-title">
				<img class="icon-weixin" src="../../assets/setteled/icon-wx.png" />
				<label>提现至微信钱包</label>
			</div>
			<div class="money-pack">
				<h5 class="f24">账户余额</h5>
				<div class="money-input c1e">
					<label>¥</label>
					<input type="text" />
				</div>
				<div class="money-tips">可提现余额 10000.00元</div>
				<!-- 两个圆圈背景 -->
				<div class="cricle cricle-right"></div>
				<div class="cricle cricle-bottom"></div>
			</div>
			<div class="sub-btn" @click="apply">
				确认提现，审核后到账
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			cancel(){
				this.$router.go(-1);
			},
			apply(){
				this.$router.push("/applyDetail")
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
		@import '../../../static/css/style.css';
		@import '../../../static/css/header.css';
	.settled-apply{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		
		.merchant-main{
			margin-top: .88rem;
			.apply-title{
				img{
					width: .38rem;
					height: .3rem;
					margin-right: .25rem;
				}
				font-size: .28rem;
				font-family: 'pf-Regular';
				color: #aaa;
				padding: .44rem 0 .4rem .32rem;
				text-align: left;
				border-bottom: .16rem solid #f2f2f2;
			}
			.money-pack{
				padding: 0 .3rem;
				height: 3.2rem;
				width: 100%;
				text-align: left;
				overflow: hidden;
				position: relative;
				border-bottom: .16rem solid #f2f2f2;
				// 两个圆圈
				.cricle{
					position: absolute;
					width: 3.08rem;
					height: 3.08rem;
					border-radius: 50%;
				}
				.cricle-right{
					right: -1.54rem;
					bottom: 0;
					background: #e6e6fe;
					z-index: 2
				}
				.cricle-bottom{
					bottom: -50%;
					right: 0;
					background: #f2f5fa;
					z-index: 1
				}
				h5{
					color: #666;
					margin-top: .4rem;
				}
				.money-input{
					margin-right:.3rem;
					padding: .5rem  0 .3rem 0;
					display: flex;
					font-size: .6rem;
					border-bottom: 1px solid #f1f1f1;
					label{
						margin: 0;
					}
					input{
						width: 60%;
						margin: 0 0 0 .32rem;
					}
				}
				.money-tips{
					font-size: .28rem;
					color: #aaa;
					margin-top: .3rem;
				}
			}
			
			.sub-btn{
				margin: .7rem .3rem 0 .3rem;
				color: #fff;
				height:.8rem;
				line-height: .8rem;
				font-size: .3rem;
				background-image: linear-gradient(187deg, #feca3a 0%, #feb336 100%), linear-gradient(#ffba30, #ffba30);
				background-blend-mode: normal, normal;
				box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
				border-radius:.4rem;
			}

		}
	}
</style>

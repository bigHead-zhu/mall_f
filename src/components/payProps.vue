<template>
	<div class="comp-pay">
			<!-- 支付金额弹窗 -->
		<div class="pay-mask" v-show="payProps">
			<div class="pay-title c1e ">
				<label>确认付款</label>
				<img class="icon-close" @click="immepayProps" src="../../../static/img/icon-close.png" />
			</div>
			<div class="pay-price c1e">¥{{lastMoney}}</div>
			<!-- 付款方式 -->
			<ul class="pay-type">
				<li v-for="(item,index) in payType" :key="index" >
					<img class="pay-img" :src="item.img" />
					<label class="pay-name c1e">{{item.title}}</label>
					<div class="check-box" @click="changeCheck(index)" >
						<input type="checkbox"  v-model="item.checkState" :checked="item.checkState" />
						<label class="checkbox-label" :class="item.checkState?'active':''"></label>
					</div>
				</li>
				<li v-for="(item,indexs) in wallent" :key="indexs" @click="toPay(item.level,item.title,item.balance)">
					<img class="pay-img" :src="item.img" />
					<label class="pay-name c1e">{{item.title}}</label>
					<div class="check-box" @click="wallentCheck(indexs,item.id)" >
						<input type="checkbox" v-model="item.checkState" :checked="item.checkState" />
						<label class="checkbox-label" :class="item.checkState?'active':''"></label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 组合卡片支付 -->
		<div class="card-pay" v-show="cardpayProps">
			<div class="pay-nav">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="showPayProps"/>
				<label class="card-pay-title">{{payTitle}}</label>
				<img class="icon-close" @click="colseCard" src="../../../static/img/icon-close.png" />
			</div>
			<div class="card-main" :class="bgName">
				<div class="card-title">
					<span>{{cardName}}</span>
					<label></label>
					<label class="dot"></label>
				</div>
				<div class="card-money">
					<small>¥</small>{{blance}}
				</div>
				<p>注意：使用卡片支付时，无法组合支付</p>
			</div>
			<div class="card-footer c1e" @click="impwdProps">
				立即支付
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				cardpayProps:false,
				payProps:false,
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../static/style.css';
	.com-pay{
		width: 100%;
		height: 100vh;
		background: transparent;
		// 支付弹窗
		.pay-mask{
			position: fixed;
			bottom: 0;
			width: 100%;
			height:auto;
			overflow: auto;
			left: 0;
			background: #fff;
			border-radius: .2rem .2rem 0 0;
			z-index: 55;
			.pay-title{
				text-align: center;
				height: .95rem;
				position: relative;
				line-height: .95rem;
				font-size: .3rem;
			}
			.pay-price{
				font-size: .60rem;
				border-top: 1px solid #f1f1f1;
				padding: .3rem 0 .15rem 0;
				text-align: center;
			}
			// 支付方式
			.pay-type{
				margin: 0 .3rem;
				li{
					height: 1.2rem;
					display: flex;
					align-items: center;
					border-bottom: 0.03rem solid #f1f1f1;
					.pay-img{
						width: .36rem;
						// height: .36rem;
						margin: 0;
					}
					.pay-name{
						font-size: .3rem;
						margin-left: .28rem;
					}
				}
				li:last-child{
					border: none
				}
			}
			
		}
		.card-pay,.pay-pwd{
			.pay-nav{
				width: 100%;
				height: .95rem;
				line-height: .95rem;
				font-size: .34rem;
				border-bottom: 1px solid #f2f2f2;
				position:relative;
				font-family: 'pf-Medium';
				.icon-left{
					position: absolute;
					left: .3rem;
					top: .33rem;
					display: inline-block;
					width: .16rem;
					height: .28rem;
					z-index: 5
				}
			}
			
			.card-main{
				margin: .4rem .6rem;
				height: 3.54rem;
				overflow: hidden;
				border-radius: .06rem;
				background-size: 100% 100%;
				font-family: 'pis';
				color: #fff;
				text-align: left;
				.card-title{
					padding: .5rem .3rem 0 .36rem;
					position: relative;
					span{
						font-size: .36rem;
					}
					label{
						display: inline-block;
						position: absolute;
						right: .3rem;
						top: .5rem;
						width: .3rem;
						height: .3rem;
						z-index: 5;
						background: #fff;
						border-radius: 50%;
						opacity: .4
					}
					.dot{
						right: .45rem;
					}
				}
				// 金额
				.card-money{
					font-size: .72rem;
					line-height: .72rem;
					margin: 1rem 0 0 .36rem;
					small{
						font-size: .42rem;
					}
				}
				p{
					font-size: .22rem;
					line-height: .22rem;
					margin: .3rem 0 0 .36rem;
					font-family: 'pf-Regular'
				}
			}
			.card-footer{
				height: 1.15rem;
				border-top: 1px solid #f2f2f2;
				position: fixed;
				bottom: 0;
				font-size: .34rem;
				line-height: 1.15rem;
				left: 0;
				width: 100%;
				z-index: 15;
				font-family: 'pf-Medium'
			}
		}
	}
</style>

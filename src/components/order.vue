<template>
	<div class="order-props" v-show="orderState">
		<div class="mask"></div>
		<!-- 取消订单弹窗 -->
		<div class="cancel-list">
			<div class="close">
				<img class="icon-close" @click="propsclose()" src="../../static/img/icon-close.png" />
			</div>
			<ul class="reason-list">
				<li class="c1e" v-for="(item,index) in list" :key="index" @click="reason(item.des)">{{item.des}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			value: {
			  type: '',
			  default: ''
			},
		},
		data(){
			return{
				list:[
					{ 
						des:'不想买了',
					},
					{ 
						des:'信息填写错误，重新填写',
					},
					{ 
						des:'卖家缺货',
					},
					{ 
						des:'与卖家协商后取消',
					},
					{ 
						des:'其他原因',
					},
				],
				orderState:false,
				des:''
			}
		},
		watch: {
		  value(newVal, oldVal) {
		    this.orderState = newVal
		  },
		  orderState(val) {
		    this.$emit('input', val)
		  }
		},
		mounted(){
			this.orderState = this.value;
		},
		methods:{
			propsclose(){
				this.orderState = false
			},
			// 选择原因
			reason(content){
				this.des = content;
				this.$emit("reas",content);
				this.propsclose()
			}
		},
		
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../static/css/style.css';
	.order-props{
		// 取消原因
		.mask{
			width: 100%;
			height: 100vh;
			background: rgba($color: #000, $alpha: .4);
			z-index:45;
			position: absolute;
			left: 0;
			top: 0;
		}
		.cancel-list{
			width:100%;
			height: auto;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			font-size: .3rem;
			z-index: 65;
			.close{
				text-align: right;
				margin: .3rem;
			}
			.icon-close{
				width: .32rem;
				height: .32rem;
			}
			.reason-list{
				line-height: .8rem;
			}
		}
	}
</style>

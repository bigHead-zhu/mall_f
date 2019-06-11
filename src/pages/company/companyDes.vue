<template>
	<div class="compa-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>企业简介</label>
		</div>
		<div class="main-txt">
			{{des}}
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				des:''
			}
		},mounted() {
			this.merchantId = this.$route.query.merchantId;
			this.des = this.$route.query.des ||'';
			console.log(this.des)
		},methods:{
			cancel(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss"  >
	
	@import '../../../static/css/header.css';
	.compa-main {
		
		.header label{
			flex: 1;
		}
		.main-txt{
			margin: 1.5rem .3rem 0;
			font-size: .26rem;
			color: #1e1e1e;
			line-height: .3rem;
			text-align: left;
			text-indent: .52rem;
		}
	}
	
</style>

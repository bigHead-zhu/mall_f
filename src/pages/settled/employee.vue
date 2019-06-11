<template>
	<div class="employee-main">
		<div class="header">
			<img class="icon-left-p" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			{{empList.enterpriseName}}
		</div>
		<div class="main">
			<div class="main-txt">{{empList.content}}</div>
			<!--联系方式  -->
			<div class="contanct">
				<ul class="contanct-list">
					<li>
						<div class="contanct-title">
							<div class="icon">
								<img class="icon-small icon-phone" src="../../../static/img/c-phone.png"/>
							</div>							
							<div class="mL18">联系电话</div>
						</div>
						<div class="contanct-num" v-for="(item,index) in empList.contactNumbers" :key="index">
							{{item}}
						</div>
					</li>
					<li>
						<div class="contanct-title">
							<div class="icon">
								<img class="icon-small icon-weixin" src="../../../static/img/c-weixin.png"/>
							</div>
							<div class="mL18">客服微信</div>
						</div>
						<div class="contanct-num" v-for="(item,index) in empList.serviceWechats" :key="index">{{item}}</div>
					</li>
					<li>
						<div class="contanct-title">
							<div class="icon">
								<img class="icon-small icon-qq" src="../../../static/img/c-qq.png"/>
							</div>		
							<div class="mL18">客服QQ</div>
						</div>
						<div class="contanct-num" v-for="(item,index) in empList.serviceQqs" :key="index">{{item}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import settled from '../../server/settled.js';
	
	export default{
		data(){
			return{
				empId:'',//企业服务
				empList:"",
				params:{
					pageSize:10,
					fromNum:1,
				}
			}
		},
		mounted(){
			this.empId = this.$route.query.id;
			this.getEmployee();
		},
		methods: {
			// 返回
			cancel(){
				this.$router.go(-1);
			},
			// 
			getEmployee(){
				settled.comService(this.params).then(res =>{
					if(res.code == 0){
						this.list = res.data.enterpriseServiceVo;
						for(let i=0; i<res.data.enterpriseServiceVo.length;i++){
							if(res.data.enterpriseServiceVo[i].id == this.empId){
								this.empList = res.data.enterpriseServiceVo[i]
							}
						}
					}else{
						console.log(res.message)
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	.employee-main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		
		.main{
			margin-top: 1.35rem;
			.main-txt{
				margin: 0rem .3rem;
				font-size: .26rem;
				color: #1e1e1e;
				line-height: .3rem;
				text-align: left;
				text-indent: .52rem;
				word-break: break-all;
				word-wrap: break-word;
			}
			.contanct{
				width: 6.9rem;
				min-height: 3.88rem;
				border-radius: .04rem;
				background-color: #ffffff;
				box-shadow: 0px 3px 6px 0px rgba(174, 174, 174,0.2);
				margin:.7rem auto 0;
				overflow: hidden;
				position: relative;
				z-index: 6;
			}
			.contanct-list{
				margin: .24rem .38rem 0;
				text-align: left;
			}
			.contanct-list li{
				margin-bottom: .40rem;	
				font-size: .28rem;
			}
			.contanct-title{
				display: flex;
				height: .4rem;
				align-items: center;
			}
			.icon{
				width: .4rem;
				height: .4rem;
				display: inline-block;
				background: #fedb6a;
				border-radius: 50%;
				position: relative;
				margin: 0;
			}
			.icon-small{
				position: absolute;
				left: -0.08rem;
				top: .06rem;
				z-index: 5;
			}
			.mL18{
				margin-left: .18rem;
				color: #1e1e1e;
				display: inline-block;
			}
			.icon-phone{
				width: .3rem;
				height: .26rem;
			}
			.icon-weixin{
				width: .34rem;
				height: .28rem;
			}
			.icon-qq{
				width: .26rem;
				height: .28rem;
			}
			.contanct-num{
				margin:.14rem 0 0 .55rem;
				color: #7f7f7f;
				font-family:'pf-Regular';
			}
		}
		
	}
	
</style>

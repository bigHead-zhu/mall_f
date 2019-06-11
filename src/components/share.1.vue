<template>
	<div class="share-mask" v-show="show">
		<div class="mask"></div>
		<div class="share-props"  ref = "msg"  @click.stop="invitationBtnNO">
			<div class="share-title">
				分享到：
			</div>
			<ul class="share-ul">
				<li class="share-icon -mob-share-weixin">
					<img  src="../assets/share/share-weixin.png" />
					<p>微信好友</p>  
				</li>
				<li class="-mob-share-qq">
					<img src="../assets/share/share-qq.png" />
					<p>QQ</p>
				</li>
				
			</ul>
			<input class="cancel-btn" type="button" value="取消" @click="invitationBtnNO"/>
		</div>
	</div>
	
</template>

<script>
	import wx from 'weixin-js-sdk';
	import share from '../server/share.js';
	
	export default{
		data(){
			return {
// 				weixin:'',
// 				qq:'',
			}
		},
		props:{
			show:{
				type:Boolean,
				default:false
			},
			config:{
				type:Object,
				default: function () {
					return {}
				}
			},
		},
		created(){
			this.createScript();
		},
		mounted(){
			this.init(this.config);
			this.isWeiXin()
			this.setWeiXinShare(this.config);
		},
		methods: {
			 // // 取消邀请
			invitationBtnNO(){
				this.$emit("chose");
			},
			// 初始化
			init(config){
				window.onload = function(){
					mobShare.config( {
						appkey: '291f2ac7a44a4', // appkey
						params: {
							url: config.url, // 分享链接
							title: config.title, // 分享标题
							description: config.desc, // 分享内容
							pic: config.logo, // 分享图片，使用逗号,隔开
							reason:config.reason || ""
						}
					
					} );
				}
			},
			copy(){
				this.$emit("copy")
			},
			 // 创建script
			createScript(callback){
				(function(){
					let url = "http://f1.webshare.mob.com/code/mob-share.js?appkey=291f2ac7a44a4"
					let cssurl = "http://f1.webshare.mob.com/code/mob-share.css"
					let script = document.createElement('script')
					let link =  document.createElement('link')
					script.setAttribute('src', url)
					link.setAttribute('href', cssurl)
					link.setAttribute('rel', "stylesheet")
					link.setAttribute('type', "text/css")
					document.getElementsByTagName('head')[0].appendChild(script)
					document.getElementsByTagName('head')[0].appendChild(link)
				})()
			},
			 /* 
       *微信分享
       */
        setWeiXinShare(config){
			console.log(window.location.href)
			share.share(window.location.href)
            .then(res => {
				console.log(res)
//                 let code = res.data.returnCode
                if(res.code == 0){
                    let data = res.data;
                     wx.config({
                        debug: true,
                        appId: data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                        timestamp:data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.noncestr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareQQ'
                        ]
                    });
                }else{
                    console.log(res.message)
                }

            })
            .catch(error => {
                console.log(error)
            })
           
            //处理验证失败的信息
            wx.error(function (res) {
                console.log('验证失败返回的信息:',res);
            });
            //处理验证成功的信息
            wx.ready(function () {
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: config.title, // 分享标题
                    desc: config.desc, // 分享描述
                    link: config.url.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: config.logo, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        console.log(config)
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function (res) {
                        console.log(config)
                    // 用户取消分享后执行的回调函数
                    }
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title: config.title, // 分享标题
                    desc: config.desc, // 分享描述
                    link: config.url.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: config.logo, // 分享图标
                    success: function (res) {
                    // 用户确认分享后执行的回调函数
                        console.log("分享到QQ好友成功返回的信息为:",res);
                    },
                    cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                        console.log("取消分享给QQ好友返回的信息为:",res);
                    }
                });
            });  
            
        },
        /*
        *判断是否为微信
        */
        isWeiXin(){
            return /micromessenger/.test(navigator.userAgent.toLowerCase())
        },
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.share-mask{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		.mask{
			width: 100%;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba($color: #000000, $alpha: 0.4);
			z-index: 35;
		}
			.share-props{
				width: 100%;
				background: #f1f1f1;
				position: absolute;
				left: 0;
				bottom: 0;
				z-index: 45;
				.share-title{
					font-size: .26rem;
					text-align: left;
					margin: .32rem 0 0 .42rem;
					color: #aaa;
				}
				.share-ul{
					height: 1.7rem;
					overflow: hidden;
					font-size: .26rem;
					color: #1e1e1e;
					display: flex;
					list-style: none;
					margin: .3rem 0 .2rem  .4rem;
					li{
						width: 1.12rem;
						margin:0 .66rem 0 0;
						img{
							width: 1.12rem;
							height: 1.12rem;
							margin-bottom: .16rem;
						}
					}
				}             
				.cancel-btn{
					width: 100%;
					height: 1.08rem;
					background: #fff;
					border: none;
					outline: none;
					text-align: center;
				}
			}
		
	}
</style>

<template>
	<div class="share-app">
		<img class="share-img" src="../../assets/share/share-bg.png" />
		<ul class="download-btn">
			<li>Android</li>
			<li>iOS</li>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
	.share-app{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		.share-img{
			width: 100%;
			height: 100vh;
			object-fit: fill
		}
		.download-btn{
			position: fixed;
			left: 1rem;
			right: 1rem;
			display: flex;
			list-style: none;
			bottom: 1rem;
			li{
				flex: 1;
				margin: 0 .45rem;
				color: #fff;
				height: .8rem; 
				line-height: .8rem;
				background-color: #3475b7;
				border-radius:.08rem;
				font-size: .28rem;
			}
		}
		
	}
</style>

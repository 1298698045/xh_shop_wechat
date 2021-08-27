<template>
	<view class="wrap">
		<div class="header">
			<image class="bannerImg" src="https://cbt.pumchit.cn/images/uploaded/leaflet/banner.jpg" mode=""></image>
		</div>
		<div class="tipsWrap">			
			<div class="tips">
				<div class="text">
					<p class="cont">
						百年协和，团圆中秋，一切为民，为病人提供更有质量、更有温度的服务是协和人永恒的价值追求。在迎接协和百年的特殊日子里，围绕“以人民为中心、一切为了患者”的主题，开展协和中秋月饼活动，具有特殊的意义。
					</p>
				</div>
			</div>
		</div>
		<div class="container">			
			<div class="content">
				<div class="box">
					<div class="imgs">
						<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t3.png"></image>
						<p class="title">活动主办方</p>
					</div>
					<span class="subject">北京协和科技开发有限责任公司</span>
				</div>
				<div class="box">
					<div class="imgs">
						<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t3.png"></image>
						<p class="title min">活动时间</p>
					</div>
					<div class="subject">本次活动将于<span class="color">2021年8月-2021年9月</span>举行</div>
				</div>
				<div class="box">
					<div class="imgs">
						<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t3.png"></image>
						<p class="title min">活动内容</p>
					</div>
					<p class="subject desc">
						主要目的是以服务患者，方便患者为基础，给患者提供一个高质量、更温暖的中秋佳节。活动期间将为住院患者及家属提供祝福语留言、送货上门等便利服务，
						同时也为各位呈上美味可口，具有较高营养价值、干净卫生的协和定制款月饼，其口味为广式月饼口味，品种系列包括五仁金腿系列月饼、蛋黄莲蓉系列月饼、水果系列月饼等。
						欢迎各位持续关注和积极参与。
					</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.header{
		width: 100%;
	}
	.header .bannerImg{
		width: 100%;
	}
	.tipsWrap{
		padding:40rpx 20rpx;
	}
	.tips{
		background-image: linear-gradient(
		135deg
		, rgb(251, 241, 241) 10%, rgb(253, 244, 225) 100%);
		border-radius: 5px;
		padding: 5px;
		border-width: 0px;
	}
	.tips .text{
		border: 1px dashed rgb(203, 73, 55);
		border-radius: 5px;
	}
	.tips .text .cont{
		padding: 25rpx 20rpx;
		font-size: 28rpx;
		line-height: 1.5;
		color: rgb(203, 73, 55);
	}
	.container{
		padding:0 20rpx;
	}
	.content{
		padding: 15px;
		border: 5rpx dashed rgb(236, 208, 121);
		border-radius: 10px;
	}
	.content .box .imgs {
		width: 320rpx;
		height: 80rpx;
		margin:0 auto;
		position: relative;
		left: -30rpx;
	}
	.content .box .imgs .title{
		position: absolute;
		top: 16rpx;
		left: 132rpx;
		color: #ffa900;
		font-size: 32rpx;
		font-weight: bold;
	}
	.content .box .imgs .title.min{
		left: 140rpx;
	}
	.content .box .imgs  image{
		width: 100%;
		height: 100%;
	}
	.content .box{
		text-align: center;
		margin-top: 60rpx;
	}
	.content .box:first-child{
		margin-top: 20rpx;
	}
	.content .box .subject{
		font-size: 28rpx;
		display: inline-block;
		padding-top: 20rpx;
		line-height: 1.5;
	}
	.content .box .subject .color{
		color: #ffa900;
	}
	.content .box .subject.desc{
		text-align: left;
	}
</style>

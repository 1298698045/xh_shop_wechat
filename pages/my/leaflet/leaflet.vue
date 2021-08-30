<template>
	<view class="wrap">
		<div class="header">
			<image class="bannerImg" mode="widthFix" src="https://cbt.pumchit.cn/images/uploaded/leaflet/banner.jpg"></image>
		</div>
		<div class="tipsWrap">			
			<div class="tips">
				<div class="text">
					<p class="cont">
						百年协和，团圆中秋，一切为民，为病人提供更有质量、更有温度的服务是协和人永恒的价值追求。在迎接协和百年的特殊日子里，围绕“以人民为中心、一切为了患者”的主题，开展协和中秋月饼活动，具有特殊的意义。
					</p>
				</div>
				<p class="tips_icon"></p>
			</div>
		</div>
		<div class="container">			
			<div class="content">
				<div class="top_icon"></div>
				<div class="bottom_icon"></div>
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
					<div class="qrCode">
						<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t4.jpg" mode="widthFix"></image>
					</div>
					<div class="qrCode_text">
						长按识别图中二维码
					</div>
				</div>
				<div class="moocake">
					<p class="icon"></p>
					<div class="sectionBorder">
						<div class="sectionBorder_child">
							<div class="maxImg">
								<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t6.jpg" mode=""></image>
							</div>
							<div class="desc">
								广式月饼的制饼技术起源于上世纪九十年代，迄
								今已有二十多年的历史，制饼商一直把研究传统伍仁金腿月饼为已任，
								承传了中国月饼之乡广东800多年历史的传统制饼精髓，
								将传统文化融入了现代生活，让大众更好地享受到月饼这一“国粹”食品。
							</div>
							<div class="mainText">本次活动主要是为患者及家属提供温暖中秋的便民服务，</div>
							<div class="gifImg">
								<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t2.gif" mode=""></image>
							</div>
							<div class="tipsText">
								预订方式如下////
							</div>
							<div class="numText"><span>01.</span>通过扫描病房床头二维码</div>
							<div class="numText"><span>02.</span>在公众号上进行预订并留下祝福语言</div>
							<div class="numText"><span>03.</span>通过院内各营业超市进行预订</div>
							<div class="numText"><span>04.</span>通过“协和百年文创商城”微信小程序进行预订并留言备注祝福语言</div>
							<div class="mainText">本院职工需预订，请移步至外科楼等候厅超市现场预订，
							会有更多惊喜等着您！！！ 
							</div>
							<div class="time">预订截止时间9月16日</div>
							<div class="afterText">
								现将价格及优惠活动公布如下
							</div>
							<div class="xinGif">
								<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t3.gif" mode=""></image>
							</div>
						</div>
					</div>
					<div class="shop-wepper" v-for="(item,index) in listData" :key="index">
						<div class="flex">
							<div class="flex_box">
								<div class="borderSolid"></div>
							</div>
							<div class="flex_box">
								<div class="borderSolid"></div>
							</div>
						</div>
						<div class="sectionBorder">
							<div class="shopWrap">							
								<div class="shopBox" v-for="(val,idx) in item.children" :key="idx">
									<div class="shopImg">
										<image :src="val.imgUrl" mode="widthFix"></image>
									</div>
									<div class="shop_name">
										-{{val.name}}-
									</div>
									<div class="price">价格：{{val.price}}/盒</div>
									<div class="iconText">
										扫码购买
										<p class="icon"></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="radius">
					<span class="gif"></span>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="bottom">
				<p class="gif">
					<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t2.gif" mode="widthFix"></image>
				</p>
				<p class="gif">
					<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/t2.gif" mode="widthFix"></image>
				</p>
			</div>
			<p class="text">
				中秋花好月又圆，协和祝您两团圆。
			</p>
		</div>
		<div class="shareWrap">
			<p class="tips_desc">这次中秋活动可远远不止这些哦！</p>
			<p class="text">长按识别图中二维码即可查看更多商品活动</p>
			<p class="imgs">
				<image src="../../../static/images/t21.jpg" mode="widthFix"></image>
			</p>
		</div>
		<div class="share">
			<image src="https://cbt.pumchit.cn/images/uploaded/leaflet/fot.jpg" mode="widthFix"></image>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[
					{
						children:[
							{
								name:"五仁金腿600克",
								price:'168',
								imgUrl:'https://cbt.pumchit.cn/images/mooncake/五仁金腿600克.jpg'
							},
							{
								name:"五仁金腿1斤",
								price:'128',
								imgUrl:'https://cbt.pumchit.cn/images/mooncake/五仁金腿1斤.jpg'
							}
						]
					},
					{
						children:[
							{
								name:"五仁金腿2斤",
								price:'258',
								imgUrl:'https://cbt.pumchit.cn/images/mooncake/五仁金腿2斤.jpg'
							},
							{
								name:"五仁金腿3斤",
								price:'360',
								imgUrl:'https://cbt.pumchit.cn/images/mooncake/五仁金腿1斤或者2斤.jpg'
							}
						]
					},
					{
						children:[
							{
								name:"五仁金腿4斤",
								price:'450',
								imgUrl:'https://cbt.pumchit.cn/images/mooncake/五仁金腿1斤或者2斤1.jpg'
							},
							{
								name:"蛋黄豆沙月饼2斤",
								price:'180',
								imgUrl:'https://cbt.pumchit.cn/images/mooncake/蛋黄豆沙600克2.jpg'
							}
						]
					}
				]
			}
		},
		methods: {
			
		},
		onShareAppMessage(res){
		    return {
		      title:'百年协和襄明月，一切为民共团圆',
		      path:'/pages/my/leaflet/leaflet'
		    }
		},
		onShareTimeline(res){
			return {
			  title:'百年协和襄明月，一切为民共团圆',
			  path:'/pages/my/leaflet/leaflet'
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.wrap{
		padding-bottom: 100rpx;
	}
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
		position: relative;
	}
	.tips .tips_icon{
		position: absolute;
		width: 50rpx;
		height: 80rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t1.png');
		background-size: 100% 100%;
		right: 30rpx;
		bottom: -21rpx;
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
		position: relative;
		margin-top: 20rpx;
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
	.content .qrCode{
		width: 300rpx;
		height: 300rpx;
		margin: 20rpx auto;
	}
	.content .qrCode image{
		width: 100%;
	}
	.content .qrCode_text{
		text-align: center;
		color: #333;
		font-size: 28rpx;
	}
	/* 活动 */
	.moocake{
		margin-top: 50rpx;
	}
	.moocake .icon{
		width: 35rpx;
		height: 60rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t5.png');
		background-size: 100% 100%;
		margin-left: 50rpx;
	}
	.moocake .sectionBorder{
		vertical-align: top;
		background-color: rgb(255, 219, 177);
		/* background: #fdfaf0; */
		border-width: 1px;
		border-radius: 20rpx;
		border-style: solid;
		border-color: rgb(255, 255, 255);
		overflow: hidden;
		padding: 10rpx;
		box-shadow: rgb(255 219 177) 0px 0px 10px;
	}
	.moocake .sectionBorder .sectionBorder_child{
		background: #fdfaf0; 
		padding: 0 10rpx;
		padding-top: 1rpx;
		border-radius: 20rpx;
	}
	.moocake .sectionBorder .maxImg{
		width: 100%;
		height: 300rpx;
		margin: 20rpx 0 50rpx 0;
	}
	.moocake .sectionBorder .maxImg image{
		width: 100%;
		height: 100%;
	}
	.moocake .sectionBorder .desc{
		text-align: center;
		font-size: 28rpx;
		line-height: 2;
		color: #333;
		margin-top: 20rpx;
	}
	.moocake .sectionBorder .mainText {
		text-align: center;
		margin-top: 30rpx;
		font-size: 28rpx;
		line-height: 2;
		color: #333;
	}
	.moocake .sectionBorder .gifImg{
		width: 200rpx;
		height: 50rpx;
		margin: 30rpx auto;
	}
	.moocake .sectionBorder .gifImg image{
		width: 100%;
		height: 100%;
	}
	.moocake .sectionBorder .tipsText{
		width: 300rpx;
		height: 80rpx;
		background: #ffdb76;
		margin: 30rpx auto;
		text-align: center;
		color: #333;
		line-height: 80rpx;
	}
	.moocake .sectionBorder .numText span{
		font-size: 32rpx;
		padding-right: 20rpx;
	}
	.moocake .sectionBorder .numText{
		text-align: center;
		font-size: 30rpx;
		color: #333;
		line-height: 2;
	}
	.moocake .sectionBorder .time{
		color: #dd3202;
		text-align: center;
		line-height: 2;
	}
	.moocake .sectionBorder .afterText{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.moocake .sectionBorder .afterText::before{
		content: '';
		width: 50rpx;
		height: 70rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t19.png');
		background-size: 100% 100%;
		margin-right: 20rpx;
		transform:rotate(360deg);
	}
	.moocake .sectionBorder .afterText::after{
		content: '';
		width: 50rpx;
		height: 70rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t7.png');
		background-size: 100% 100%;
		margin-left: 20rpx;
	}
	.xinGif{
		width: 300rpx;
		height: 50rpx;
		margin: 0 auto;
		padding-bottom: 50rpx;
	}
	.xinGif image{
		width: 100%;
		height: 100%;
	}
	.moocake .flex{
		display: flex;
		justify-content: center;
	}
	.moocake .flex .flex_box{
		width: 50%;
	}
	.moocake .flex .flex_box .borderSolid{
		width: 4rpx;
		height: 40px;
		vertical-align: top;
		overflow: hidden;
		line-height: 0;
		letter-spacing: 0px;
		background-color: rgb(255, 219, 177);
		margin: 0 auto;
	}
	.sectionBorder .shopWrap{
		display: flex;
		justify-content: space-between;
	}
	.sectionBorder .shopWrap .shopBox{
		width: 49%;
		background: #fdfaf0;
		padding: 10rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.sectionBorder .shopWrap .shopBox .shopImg{
		width: 100%;
	}
	.sectionBorder .shopWrap .shopBox .shopImg image{
		width: 100%;
		height: 100%;
	}
	.sectionBorder .shopWrap .shopBox .shop_name{
		margin: 20rpx 0;
		font-size: 28rpx;
		font-weight: bold;
		text-align: center;
	}
	.sectionBorder .shopWrap .shopBox .price{
		text-align: center;
		padding-bottom: 30rpx;
		font-size: 24rpx;
		color: #333;
	}
	.sectionBorder .shopWrap .shopBox .iconText{
		width: 200rpx;
		height: 60rpx;
		line-height:60rpx;
		border:2rpx solid rgb(255, 219, 177);
		margin: 0 auto;
		border-radius: 10rpx;
		text-align: right;
		color: #ff8124;
		font-size: 30rpx;
		font-weight: bold;
		padding-right: 20rpx;
		position: relative;
	}
	.sectionBorder .shopWrap .shopBox .iconText .icon{
		position: absolute;
		top: -15px;
		left: -17px;
		width: 51rpx;
		height: 85rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t8.png');
		background-size: 100% 100%;
	}
	.radius{
		text-align: right;
	}
	.radius .gif{
		display: inline-block;
		width: 80px;
		height: 80px;
		vertical-align: top;
		overflow: hidden;
		border-width: 0px;
		border-radius: 50%;
		border-style: none;
		border-color: rgb(62, 62, 62);
		background-image: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t6.gif');
		background-position: 48.0299% 20.0727%;
		background-repeat: no-repeat;
		background-size: 316.879%;
		background-attachment: scroll;
		margin: 30rpx 0 50rpx 0;
	}
	.top_icon{
		position: absolute;
		width: 123rpx;
		height: 48rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t2.png');
		top: -36rpx;
		left: 0rpx;
		background-size: 100% 100%;
	}
	.bottom_icon{
		position: absolute;
		width: 123rpx;
		height: 48rpx;
		background: url('https://cbt.pumchit.cn/images/uploaded/leaflet/t18.png');
		background-size: 100% 100%;
		bottom: -20rpx;
		right: 150rpx;
	}
	.footer .bottom{
		display: flex;
		justify-content: center;
		margin: 50rpx 0;
	}
	.footer .bottom .gif{
		width: 200rpx;
		height: 40rpx;
	}
	.footer .bottom .gif image{
		width: 100%;
		height: 100%;
	}
	.footer .text{
		font-size: 28rpx;
		text-align: center;
		line-height: 2;
	}
	.shareWrap .tips_desc{
		text-align: center;
		font-size: 24rpx;
		color: #333;
		margin-top: 100rpx;
		margin-bottom: 50rpx;
	}
	.shareWrap .text{
		text-align: center;
		font-size: 28rpx;
		color: #ec1601;
	}
	.shareWrap .imgs{
		width: 100rpx;
		height: 50rpx;
		margin: 0 auto;
	}
	.shareWrap .imgs image{
		width: 100%;
		height: 100%;
	}
	.share{
		width: 100%;
	}
	.share image{
		width: 100%;
	}
</style>

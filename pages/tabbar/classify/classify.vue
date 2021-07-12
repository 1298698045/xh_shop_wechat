<template>
	<view class="container">
		<view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<icon type="search" :size="13" color="#999"></icon>
				<text class="tui-search-text">搜索商品</text>
			</view>
		</view>

		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-into-view="scrollViewId" :style="{ height: height + 'px', top: top + 'px' }">
			<view :id="`id_${index}`" v-for="(item, index) in listData" :key="index" class="tab-bar-item" :class="[currentTab == index ? 'active' : '']" :data-current="index" @tap.stop="swichNav">
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>
		<block v-for="(item, index) in listData" :key="index">
			<scroll-view scroll-y class="right-box" :style="{ height: height + 'px', top: top + 'px' }" v-if="currentTab == index">
				<!--内容部分 start 自定义可删除-->
				<view class="page-view">
				<!-- 	<swiper indicator-dots autoplay circular :interval="5000" :duration="150" class="swiper">
						<swiper-item v-if="index % 2 === 0" @tap.stop="detail"><image src="https://thorui.cn/images/mall/banner/2.jpg" class="slide-image" /></swiper-item>
						<swiper-item @tap.stop="detail"><image src="https://thorui.cn/images/mall/banner/4.jpg" class="slide-image" /></swiper-item>
						<swiper-item @tap.stop="detail"><image src="https://thorui.cn/images/mall/banner/5.jpg" class="slide-image" /></swiper-item>
					</swiper> -->
					<view class="class-box">
						<view class="class-item" v-for="(one,i) in item.children">
							<view class="class-name">{{ one.name }}</view>
							<view class="g-container">
								<view class="g-box" v-for="(self,idx) in one.children" :key="idx" @click="productList(self)" :data-key="self.name">
									<image :src="self.pictureVirtualPath" class="g-image" />
									<view class="g-title">{{self.name}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabbar: [
				'推荐分类',
				'进口超市',
				'国际名牌',
				'奢侈品',
				'海囤全球',
				'男装',
				'女装',
				'男鞋',
				'女鞋',
				'钟表珠宝',
				'手机数码',
				'电脑办公',
				'家用电器',
				'玩具乐器',
				'运动户外',
				'宠物生活',
				'特产馆'
			],
			height: 0, //scroll-view高度
			top: 0,
			currentTab: 0, //预设当前项的值
			scrollViewId:"id_0",
			listData:[]
		};
	},
	onLoad: function(options) {
		setTimeout(() => {
			uni.getSystemInfo({
				success: res => {
					let header = 92;
					let top = 0;
					//#ifdef H5
					top = 44;
					//#endif
					this.height = res.windowHeight - uni.upx2px(header);
					this.top = top + uni.upx2px(header);
				}
			});
		}, 50);
		this.getData();
	},
	methods: {
		getData(){
		    this.$http.getClassList({}).then((res)=>{
				this.listData = res.returnValue;
			})    
		} ,
		// 点击标题切换当前页时改变样式
		swichNav: function(e) {
			let cur = e.currentTarget.dataset.current;
			if (this.currentTab == cur) {
				return false;
			} else {
				this.currentTab = cur;
				this.checkCor();
			}
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor: function() {
			if (this.currentTab > 6) {
				this.scrollViewId = `id_${this.currentTab - 2}`;
			} else {
				this.scrollViewId = `id_0`;
			}
		},
		detail(e) {
			uni.navigateTo({
				url: '/pages/index/productDetail/productDetail'
			});
		},
		productList(item) {
			uni.navigateTo({
				url: '/pages/index/productList/productList?searchKey=' + item.name + '&id='+ item.id
			});
		},
		search: function() {
			uni.navigateTo({
				url: '/pages/common/search/search'
			});
		}
	}
};
</script>

<style>
page {
	background: #fcfcfc;
}

/* 左侧导航布局 start*/

/* 隐藏scroll-view滚动条*/

::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}

.tui-searchbox {
	width: 100%;
	height: 92rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0;
	/* #ifdef H5 */
	top: 44px;
	/* #endif */
	z-index: 100;
}

.tui-searchbox::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #d2d2d2;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

.tui-search-input {
	width: 100%;
	height: 60rpx;
	background: #f1f1f1;
	border-radius: 30rpx;
	font-size: 26rpx;
	color: #999;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-search-text {
	padding-left: 16rpx;
}

.tab-view {
	/* height: 100%; */
	width: 200rpx;
	position: fixed;
	left: 0;
	z-index: 10;
}

.tab-bar-item {
	width: 200rpx;
	height: 110rpx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
}

.active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fcfcfc;
}

.active::before {
	content: '';
	position: absolute;
	border-left: 8rpx solid #e41f19;
	height: 30rpx;
	left: 0;
}

/* 左侧导航布局 end*/

.right-box {
	width: 100%;
	position: fixed;
	padding-left: 220rpx;
	box-sizing: border-box;
	left: 0;
}

.page-view {
	width: 100%;
	overflow: hidden;
	padding-top: 20rpx;
	padding-right: 20rpx;
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
}

.swiper {
	width: 100%;
	height: 220rpx;
	border-radius: 12rpx;
	overflow: hidden;
	transform: translateZ(0);
}

/* #ifdef MP-WEIXIN */
.swiper .wx-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

.swiper .wx-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

.swiper .wx-swiper-dot-active::before {
	background: #fff;
}

.swiper .wx-swiper-dot.wx-swiper-dot-active {
	width: 16rpx;
}

/* #endif */

/* #ifndef MP-WEIXIN */
>>> .swiper .uni-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

>>> .swiper .uni-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

>>> .swiper .uni-swiper-dot-active::before {
	background: #fff;
}

>>> .swiper .uni-swiper-dot.uni-swiper-dot-active {
	width: 16rpx;
}

/* #endif */

.slide-image {
	width: 100%;
	height: 220rpx;
}

.class-box {
	padding-top: 30rpx;
}

.class-item {
	background: #fff;
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
}

.class-name {
	font-size: 22rpx;
}

.g-container {
	/* padding-top: 20rpx; */
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
}

.g-box {
	width: 33.3333%;
	text-align: center;
	padding-top: 40rpx;
}

.g-image {
	width: 120rpx;
	height: 120rpx;
}

.g-title {
	font-size: 22rpx;
}
</style>

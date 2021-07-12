<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-swipe-action :actions="actions" @click.stop="setDelete(item)">
					<view slot="content" @click="isAddress?getCheck(item):''">
						<tui-list-cell padding="0">
							<view class="tui-address-flex">
								<view class="tui-address-left">
									<view class="tui-address-main">
										<view class="tui-address-name tui-ellipsis">{{item.contactName}}</view>
										<view class="tui-address-tel">{{item.phoneNumber}}</view>
									</view>
									<view class="tui-address-detail">
										<view class="tui-address-label">{{item.isDefault==1?'默认':'其他'}}</view>
										<text>{{item.city+item.address1}}</text>
									</view>
								</view>
								<view class="tui-address-imgbox" @click.stop="getEdit(item)">
									<image class="tui-address-img" src="/static/images/mall/my/icon_addr_edit.png" />
								</view>
							</view>
						</tui-list-cell>
					</view>
				</tui-swipe-action>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button shadow shape="circle" type="danger" height="88rpx" @click="editAddr">+ 新增收货地址</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
				actions: [{
					name: '删除',
					color: '#fff',
					fontsize: 30, //单位rpx
					width: 70, //单位px
					background: '#FD3B31'
				}],
				isAddress:false
			}
		},
		onLoad: function(options) {
			if(options.isAddress){
				this.isAddress = true;
			}
		},
		computed:{
			currenAddress(){
				return this.$store.state.currenAddress;
			},
			userId(){
				return this.$store.state.userId;
			}
		},
		onShow: function() {
			// let addressList = JSON.parse(wx.getStorageSync('addressList'));
			// // console.log(addressList,'add')
			// this.addressList = addressList;
			// this.$http.queryAddress({
			// 	customerId:1
			// }).then(res=>{
			// 	console.log(res);
			// 	this.addressList = res.returnValue;
			// })
			this.getQuery();
		},
		methods: {
			getQuery(){
				this.$http.queryAddress({
					customerId:this.userId
				}).then(res=>{
					console.log(res);
					this.addressList = res.returnValue;
				})
			},
			editAddr(index, addressType) {
				uni.navigateTo({
					url: "/pages/my/editAddress/editAddress"
				})
			},
			getEdit(item){
				uni.navigateTo({
					url: "/pages/my/editAddress/editAddress?params="+JSON.stringify(item)
				})
			},
			setDelete(item){
				// console.log(item,'===')
				this.$http.deleteAddress({
					customerId:this.userId,
					addressId:item.id
				}).then(res=>{
					this.getQuery();
				})
			},
			getCheck(item){
				this.$store.commit('setAddress',item);
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}
	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-address-name {
		width: 120rpx;
		height: 60rpx;
	}

	.tui-address-tel {
		margin-left: 12rpx;
	}

	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>

<template>
	<view class="container">
		<view class="tui-order-list">
			<view class="tui-order-item" v-for="(item, orderIndex) in list" :key="orderIndex">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view >{{item.createdTime}}</view>
						<view class="tui-order-status">{{getStatusText(item.returnRequestStatusId)}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell padding="0" :hover="false">
					<view class="tui-goods-item" v-for="(shop,idx) in item.orderItems" :key="idx">
						<image :src="shop.picture.thumbImageUrl" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{shop.productName}}</view>
						</view>
						<view class="tui-price-right">
							<view>￥{{shop.unitPrice}}</view>
							<view>x{{item.quantity}}</view>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" unlined>
					<view class="tui-goods-price">
						<view>共{{item.orderItems.length}}件商品 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{totalPrice(item.orderItems,item.quantity,item.LastRefundShippFee)}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-btn" v-if="item.returnRequestStatusId==20" @click.stop="LogisticsOrderNo(item)">
					<tui-button type="black" plain width="152rpx" height="52rpx" :size="26" shape="circle">物流单号</tui-button>
					<!-- <tui-button type="black" plain width="152rpx" height="52rpx" :size="26" shape="circle">查看详情</tui-button> -->
				</view>
			</view>
		</view>
		<tui-modal :show="isModal" custom>
			<view class="tui-modal-custom">
				<view class="title">物流公司：</view>
				<input class="tui-input"  placeholder-class="phcolor" placeholder="请填写物流公司" v-model="name"></input>
				<view class="tui-modal-custom-text">物流单号：</view>
				<view class="tui-input-box">
					<input placeholder-class="tui-phcolor" placeholder="请填写物流单号" type="number" class="tui-input" v-model="noNumber"/>
				</view>
				<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="handleClick">确定</tui-button>
			</view>
		</tui-modal>
		<tui-divider width="60%" gradual>没有更多了</tui-divider>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId:"",
			list:[],
			isModal:false,
			noNumber:"",
			id:"",
			name:"",
			returnRequestStatusId:"",
			orderIdItemId:"",
			isShippingFee:"", // 是否+运费
			shippingFee:""
		};
	},
	onLoad(options) {
		this.orderId = options.orderId;
		this.returnRequestStatusId = options.returnRequestStatusId;
		this.orderIdItemId = options.shopId;
		// this.getShippingFee().then(res=>{
		// 	let list = res.returnValue;
		// 	var row = list.find(item=>item.orderItemID==this.orderIdItemId);
		// 	this.shippingFee = row.shippingFee;
		// 	var temp = list.filter(item=>item.orderItemID!=this.orderIdItemId); // 其他商品
		// 	this.isShippingFee = temp.every(item=>item.keTuiQuantity==0);
		// 	console.log(temp,this.shippingFee,this.isShippingFee,'------');
		// });
		this.getQuery();
	},
	computed:{
		userId(){
			return this.$store.state.userId;
		}
	},
	methods: {
		detail() {
			this.tui.href('/pages/my/refundDetail/refundDetail')
		},
		getQuery(){
			this.$http.refundList(
				{
					customerId:this.userId,
					orderId:this.orderId,
					ReturnRequestStatus:this.returnRequestStatusId
				}
			).then(res=>{
				this.list = res.returnValue;
				this.list.forEach(item=>{
					var createdTime = item.createdOnUtc.replace(/\T/g,' ');
					item.createdTime = createdTime;
					return item;
				})
			})
		},
		// 获取运费
		async getShippingFee(){
			let response
			await this.$http.refundShippingFee({
				customerId:this.userId,
				orderId:this.orderId,
				orderItemId:this.orderIdItemId
			}).then(res=>{
				console.log('运费：', res);
				response = res;
			})
			return response;
		},
		getStatusText(status){
			let idx = 0;
			switch(status){
				case 0:
					idx = 0;
					break;
				case 10:
					idx = 1; 
					break;
				case 20:
					idx = 2;
					break;
				case 30:
					idx = 3;
					break;
				case 40:
					idx = 4;
					break;
				case 50:
					idx = 5;
					break;
				case 60:
					idx = 6;
					break;
				default:
					idx = 0;
			}
			return ['等待','已收到','退货授权','货物已更换','货物已退款','拒绝请求','已取消'][idx];
		},
		totalPrice(list,quantity,LastRefundShippFee){
			let price = '';
			// if(this.isShippingFee){
			// 	list.map(item=>{
			// 		price += (item.unitPrice * quantity)+this.shippingFee;
			// 	})
			// }else{				
			// 	list.map(item=>{
			// 		price += item.unitPrice * quantity;
			// 	})
			// }
			price += (item.unitPrice * quantity) + LastRefundShippFee
			return price;
		},
		// 填写物流单号
		LogisticsOrderNo(item){
			this.id = item.id;
			this.isModal = true;
		},
		// 提交物流单号
		handleClick(){
			if(this.name==''){
				uni.showToast({
					title:'请填写物流公司名称',
					icon:'none',
					duration:2000
				})
			}else if(this.noNumber==''){
				uni.showToast({
					title:'请填写物流单号',
					icon:'none',
					duration:2000
				})
			}else {
				this.$http.orederNoSubmit(
					{
						customerId:this.userId,
						RetId:this.id,
						ReturnNumber:this.noNumber,
						ShippingCompany:this.name
					}
				).then(res=>{
					let that= this;
					uni.showToast({
						title:'提交成功',
						icon:'none',
						duration:2000,
						success:res=>{
							setTimeout(()=>{
								that.isModal = false;
							},1000)
						}
					})
				})
			}
		}
	}
};
</script>

<style>
.tui-order-list {
	width: 100%;
	padding: 0 25rpx;
	box-sizing: border-box;
}

.tui-order-item {
	margin-top: 20rpx;
	border-radius: 12rpx;
	box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.06);
	overflow: hidden;
}

.tui-goods-title {
	width: 100%;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}


.tui-order-status {
	color: #eb0909;
	font-size: 26rpx;
}

.tui-goods-item {
	width: 100%;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
}

.tui-goods-img {
	width: 180rpx;
	height: 180rpx;
	display: block;
	flex-shrink: 0;
}

.tui-goods-center {
	flex: 1;
	padding: 20rpx 8rpx;
	box-sizing: border-box;
}

.tui-goods-name {
	max-width: 310rpx;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	font-size: 26rpx;
	line-height: 32rpx;
}

.tui-goods-attr {
	font-size: 22rpx;
	color: #888888;
	line-height: 32rpx;
	padding-top: 20rpx;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.tui-price-right {
	text-align: right;
	font-size: 24rpx;
	color: #888888;
	line-height: 30rpx;
	padding-top: 20rpx;
}

.tui-color-red {
	color: #e41f19;
	padding-right: 30rpx;
}

.tui-goods-price {
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	font-size: 24rpx;
}

.tui-size-24 {
	font-size: 24rpx;
	line-height: 24rpx;
}

.tui-price-large {
	font-size: 32rpx;
	line-height: 30rpx;
	font-weight: 500;
}

.tui-order-btn {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background: #fff;
	padding: 10rpx 30rpx 20rpx;
	box-sizing: border-box;
}
.tui-modal-custom .tui-input-box{
	padding:20rpx 0;
}
/* .tui-modal-custom .tui-input-box input{
	border: 1rpx solid #E2E3E5;
	border-radius: 10rpx;
} */
.tui-input {
  font-size: 30rpx;
  height: 88rpx;
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  padding: 0 25rpx;
  box-sizing: border-box;
}
</style>

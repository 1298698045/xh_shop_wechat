<template>
	<view class="container">
		<view class="tui-order-item">
			<tui-list-cell padding="20rpx 30rpx" :hover="false" :lineLeft="false">
				<view class="tui-goods-title"><view>商品信息</view></view>
			</tui-list-cell>
			<block>
				<tui-list-cell padding="0" @click="detail">
					<view class="tui-goods-item">
						<image :src="shopInfo.picture.thumbImageUrl" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{shopInfo.productName}}</view>
						</view>
						<view class="tui-price-right">
							<view>￥{{shopInfo.unitPrice}}</view>
							<view>x{{shopInfo.quantity}}</view>
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<view class="tui-refund__form">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>数量</text>
					</view>
					<tui-numberbox :value="number" :min="1" :max="shopInfo.quantity" @change="change"></tui-numberbox>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="true" padding="0"arrow>
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请类型</text>
					</view>
					<picker @change="bindPickerChange" value="index" :range="array">
						<input placeholder-class="tui-phcolor" class="tui-input" v-model="array[index]" type="text" disabled/>
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" arrow>
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请原因</text>
					</view>
					<picker @change="changeReason" value="index" :range="reason">
						<input placeholder-class="tui-phcolor" class="tui-input" v-model="reason[reasonIdx]" type="text" disabled/>
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>退款金额</text>
					</view>
					<input placeholder-class="tui-phcolor" class="tui-input"   type="text"  :value="refundPrice" disabled/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请说明</text>
					</view>
					<input v-model="desc" placeholder-class="tui-phcolor" class="tui-input"   type="text"  placeholder="请填写申请说明"/>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-btn__box">
			<tui-button height="88rpx" type="danger" shadow shape="circle" @click="getSubmit">提交申请</tui-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderDetail:{},
			orderId:"",
			shopId:"",
			shopInfo:[],
			number:"",
			desc:"",
			index:0,
			array:['退货退款','仅退款'],
			reason:[
				'商品成分描述不符',
				'退运费',
				'假冒品牌',
				'发票问题',
				'卖家发错货'
			],
			reasonIdx:0,
			shippingFee: 0, // 运费，
			isShippingFee:false // 是否包含运费
		};
	},
	computed:{
		userId(){
			return this.$store.state.userId;
		},
		refundPrice(){
			if(!this.isShippingFee){
				return this.number * this.shopInfo.unitPrice;
			}else {
				return this.number * this.shopInfo.unitPrice + this.shippingFee;
			}
		}
	},
	onLoad(options){
		this.orderId = options.orderId;
		this.shopId = options.shopId;
		this.getShippingFee().then(res=>{
			let list = res.returnValue;
			var row = list.find(item=>item.orderItemID==this.shopId);
			this.shippingFee = row.shippingFee;
			var temp = list.filter(item=>item.orderItemID!=this.shopId); // 其他商品
			this.isShippingFee = temp.every(item=>item.keTuiQuantity==0);
			console.log(temp,this.shippingFee,this.isShippingFee,'------');
		});
		this.getQuery();
	},
	methods: {
		// 获取运费
		async getShippingFee(){
			let response
			await this.$http.refundShippingFee({
				customerId:this.userId,
				orderId:this.orderId,
				orderItemId:this.shopId
			}).then(res=>{
				console.log('运费：', res);
				response = res;
			})
			return response;
		},
		// 订单详情
		getQuery(){
			this.$http.getSingleOrder(
				{
					customerId:this.userId,
					orderId:this.orderId
				}
			).then(res=>{
				this.orderDetail = res.returnValue;
				this.shopInfo = this.orderDetail.items.find(item=>item.id==this.shopId);
				this.number = this.shopInfo.quantity;
			})
		},
		change(e){
			this.number = e.value;
		},
		bindPickerChange(e){
			this.index = e.mp.detail.value;
		},
		changeReason(e){
			this.reasonIdx = e.mp.detail.value;
		},
		getSubmit(){
			if(this.desc==''){
				uni.showToast({
					title:'请输入申请说明',
					icon:'none',
					duration:2000
				})
				return 
			}else {				
				let url = "/Order/delivery/refund?customerId="+this.userId+'&orderId='+this.orderId
				let obj = {
					ReturnRequestStatusId:0,
					StaffNotes:'',
					CustomerComments:this.desc,
					ReasonForReturn:this.reason[this.reasonIdx],
					StoreId:1,
					CustomNumber:'',
					UploadedFileId:0,
					RequestedAction:this.array[this.index],
					['OrderItemId_'+this.shopId]:this.number
				};
				let data = '';
				for(var key in obj){
						data+=
							'\r\nContent-Disposition: form-data; name="'+key+'"' +
							'\r\n' +
							'\r\n'+obj[key]+
							'\r\n--XXX' 
				}
				data += '--';
				this.$http.refundSign(url,data).then(res=>{
					if(res.state=='SUCCESS')
					uni.showToast({
						title:'提交成功',
						icon:'success',
						duration:2000,
						success:res=>{
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
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
	margin-top: 80rpx;
}

.tui-order-item {
	margin-top: 20rpx;
	border-radius: 10rpx;
	overflow: hidden;
}

.tui-goods-title {
	width: 100%;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
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

.tui-refund__form {
	margin-top: 20rpx;
}
.tui-line-cell {
	width: 100%;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.tui-title {
	width: 180rpx;
	font-size: 28rpx;
	color: #666;
}
.tui-color__red{
	color: #EB0909;
	padding-right: 6rpx;
}

.tui-title-city-text {
	width: 180rpx;
	height: 40rpx;
	display: block;
	line-height: 46rpx;
}

.tui-input {
	width: 500rpx;
	font-size: 28rpx;
}

.tui-phcolor {
	color: #ccc;
	font-size: 28rpx;
}
.tui-btn__box{
	padding: 60rpx 30rpx;
}

</style>

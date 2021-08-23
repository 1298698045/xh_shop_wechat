<template>
	<view class="container">
		<!--  @tap="switchStatus" -->
		<view class="tui-order-header">
			<!-- <image :src="webURL+'img_detail_bg.png'" mode="widthFix" class="tui-img-bg"></image> -->
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">{{getStatusText(status)}}</view>
					<view class="tui-reason"><text class="tui-reason-text">{{getReason(status)}}</text>
						<tui-countdown :time="countDown" @end="changeEnd" color="rgba(254,254,254,0.75)" colonColor="rgba(254,254,254,0.75)" borderColor="transparent"
						 backgroundColor="transparent" v-if="status===1"></tui-countdown>
					</view>
				</view>
				<image :src="getImg(status)" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view>
		<!-- <tui-list-cell arrow backgroundColor="#fefefe" @click="logistics">
			<view class="tui-flex-box">
				<image :src="webURL+'img_order_logistics3x.png'" class="tui-icon-img"></image>
				<view class="tui-logistics">
					<view class="tui-logistics-text">快递已到收货点，请注意查收哦! 投递员: echo. 联系电话: 17788849992</view>
					<view class="tui-logistics-time">2019-06-03 12:02</view>
				</view>
			</view>
		</tui-list-cell> -->
		<tui-list-cell unlined :hover="false" v-if="!orderDetail.isQRCodeSubmit">
			<view class="tui-flex-box">
				<image :src="webURL+'img_order_address3x.png'" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">{{orderDetail.shippingAddress.contactName}}<text class="tui-addr-tel">{{orderDetail.shippingAddress.phoneNumber}}</text></view>
					<view class="tui-addr-text">{{orderDetail.shippingAddress.city+orderDetail.shippingAddress.address1}}</view>
				</view>
			</view>
		</tui-list-cell>

		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					商品信息
				</view>
			</tui-list-cell>
			<block v-for="(item,index) in orderDetail.items" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-goods-item">
						<image :src="item.picture.thumbImageUrl" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{item.productName}}</view>
							<!-- <view class="tui-goods-attr">黑色，50ml</view> -->
						</view>
						<view class="tui-price-right">
							<view>￥{{item.unitPrice}}</view>
							<view>x{{item.quantity}}</view>
						</view>
					</view>
					<view class="after_sale" v-if="orderDetail.paymentStatusId!=10">
						<tui-button v-if="item.isRefund&&item.returnRequestStatusId!=50" type="black" :plain="true" width="152rpx" height="56rpx" :size="24" shape="circle" @click.stop="refundList(item)">退货/退款</tui-button>
						<tui-button v-if="(!item.isRefund)||(item.isRefund&&item.returnRequestStatusId==50)" type="black" :plain="true" width="152rpx" height="56rpx" :size="24" shape="circle" @click.stop="refund(item)">申请售后</tui-button>
					</view>
				</tui-list-cell>
			</block>
			<view class="tui-goods-info">
				<view class="tui-price-flex tui-size24">
					<view>商品总额</view>
					<view>￥{{getFixed(orderDetail.orderTotal)}}</view>
				</view>
				<!-- <view class="tui-price-flex  tui-size24">
					<view>优惠券</view>
					<view>￥0.00</view>
				</view> -->
				<view class="tui-price-flex  tui-size24" v-if="orderDetail.shippingFee>0">
					<view>运费</view>
					<view>￥{{orderDetail.shippingFee}}</view>
				</view>
				<view class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">合计</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{getFixed(orderDetail.orderTotal)}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</view>
				<view class="tui-price-flex tui-size32">
					<view class="tui-flex-shrink">实付款</view>
					<view class="tui-goods-price tui-primary-color">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{getFixed(orderDetail.orderTotal)}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</view>
			</view>
		</view>

		<view class="tui-order-info">
			<tui-list-cell :hover="false">
				<view class="tui-order-title">
					订单信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex" @click="handleCopeOrder(orderDetail.customOrderNumber)">
					<view class="tui-item-title">订单号:</view>
					<view class="tui-item-content">{{orderDetail.customOrderNumber || ''}}</view>
				</view>
				<view class="tui-order-flex" v-if="orderDetail.shipments!=''" v-for="(self,i) in orderDetail.shipments" :key="i">
					<view class="tui-item-title">物流单号:</view>
					<view class="tui-item-content">{{self.trackingNumber}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">创建时间:</view>
					<view class="tui-item-content">{{orderDetail.createdOn || ''}}</view>
				</view>
				<view class="tui-order-flex" v-if="orderDetail.orderStatusId==20||orderDetail.orderStatusId==30">
					<view class="tui-item-title">付款时间:</view>
					<view class="tui-item-content">{{orderDetail.paidDateUtc}}</view>
				</view>
				<view class="tui-order-flex" v-if="orderDetail.shipments!=''" v-for="(self,i) in orderDetail.shipments" :key="i">
					<view class="tui-item-title">发货时间:</view>
					<view class="tui-item-content">{{self.shippedDate}}</view>
				</view>
				<view class="tui-order-flex" v-if="!orderDetail.isQRCodeSubmit">
					<view class="tui-item-title">配送方式:</view>
					<view class="tui-item-content">{{orderDetail.pickupInStore?'自提':'配送'}}</view>
				</view>
				<view class="tui-order-flex" v-if="!orderDetail.isQRCodeSubmit&&orderDetail.pickupAddress.address1!=null">
					<view class="tui-item-title">自提地点:</view>
					<view class="tui-item-content" v-if="orderDetail.pickupInStore">{{orderDetail.pickupAddress.address1 || ''}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">订单备注:</view>
					<view class="tui-item-content">{{orderDetail.orderNotes.length>=1?orderDetail.orderNotes[0].note:''}}</view>
				</view>
			</view>
			<!-- <tui-list-view unlined="bottom">
				<tui-list-cell unlined>
					<view class="tui-contact">
						<image src="https://thorui.cn/images/mall/group/icon_order_contactmerchant.png"></image>
						<text>联系商家</text>
					</view>
				</tui-list-cell>
			</tui-list-view> -->
		</view>
		<view class="tui-order-info">
			<tui-list-cell :hover="false">
				<view class="tui-order-title">
					登记信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex">
					<view class="tui-item-title">姓名:</view>
					<view class="tui-item-content">{{orderDetail.personName || ''}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">身份证号:</view>
					<view class="tui-item-content">{{orderDetail.personCardID || ''}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">手机号:</view>
					<view class="tui-item-content">{{orderDetail.personPhone || ''}}</view>
				</view>
			</view>
		</view>
		<view class="tui-order-info" v-if="orderDetail.invoiceTitleId!=''&&orderDetail.invoiceTitleId!='00000000-0000-0000-0000-000000000000'">
			<tui-list-cell :hover="false">
				<view class="tui-order-title">
					<!-- 电子发票 -->
					增值税电子普通发票
				</view>
			</tui-list-cell>
			<div class="pannel">
				<!-- <h3 class="title">增值税电子普通发票</h3> -->
				<div class="bd">
					<div class="left">
						<div class="box">
							<span class="label">
								发票类型
							</span>
							<span class="val">
								电子普通发票
							</span>
						</div>
						<div class="box">
							<span class="label">
								发票类别
							</span>
							<span class="val">
								商品类别
							</span>
						</div>
						<div class="box">
							<span class="label">
								抬头类型
							</span>
							<span class="val">
								{{orderDetail.invoiceTitle.invoiceTitleType==1?'单位':'个人'}}
							</span>
						</div>
						<div class="box">
							<span class="label">
								抬头名称
							</span>
							<span class="val">
								{{orderDetail.invoiceTitle.name || ''}}
							</span>
						</div>
						<div class="box">
							<span class="label">
								公司税号
							</span>
							<span class="val">
								{{orderDetail.invoiceTitle.taxpayerCode||''}}
							</span>
						</div>
						<div class="box">
							<span class="label">
								接收人邮箱
							</span>
							<span class="val">
								{{orderDetail.invoiceTitle.shipTo_Email||''}}
							</span>
						</div>
						<div class="box">
							<span class="label">
								开票金额
							</span>
							<span class="val">
								{{orderDetail.orderTotal}}
							</span>
						</div>
						<div class="box">
							<span class="label">
								开票时间
							</span>
							<span class="val">
								
							</span>
						</div>
						<div class="box">
							<span class="label">
								申请时间
							</span>
							<span class="val">
								
							</span>
						</div>
					</div>
					<div class="right"></div>
				</div>
			</div>
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar tui-order-btn">
			<!-- <view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
			</view> -->
			<!-- <view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle" @click="refund">申请售后</tui-button>
			</view> -->
			<view class="tui-btn-mr" v-if="orderDetail.orderStatusId==10&&status!=5">
				<tui-button type="danger" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle" @click="btnPay">立即支付</tui-button>
			</view>
			<view class="tui-btn-mr" v-else-if="orderDetail.orderStatusId==40||status==5">
				<tui-button type="danger" disabled="true" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle">交易关闭</tui-button>
			</view>
			<view class="tui-btn-mr" v-else>
				<tui-button type="danger" disabled="true" :plain="true" width="200rpx" height="56rpx" :size="26" shape="circle">{{orderDetail.shippingStatus}}</tui-button>
			</view>
		</view>
		<t-pay-way :show="show" :totalPrice="orderDetail.orderTotal" :orderId='orderId' @close="popupClose"></t-pay-way>
	</view>
</template>

<script>
	import tPayWay from "@/components/views/t-pay-way/t-pay-way"
	export default {
		components: {
			tPayWay
		},
		data() {
			return {
				webURL: "https://www.thorui.cn/wx/static/images/mall/order/",
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
				status: '',
				show: false,
				orderId:"",
				orderDetail:{},
				countDown:1800,
				endOrderTime:'',
				endOrderTimeStr:'', // 订单结束时间戳
				currentDate:{
					nowDateTime:'',
					timeStr:''
				},
				timer:null,
				isCountDown:true
			}
		},
		computed:{
			userId(){
				return this.$store.state.userId;
			}
		},
		onLoad(options){
			this.orderId = options.orderId;
			console.log(this.orderId)
			this.getQuery();
			this.currentTime();
		},
		onUnload(){
			// clearInterval(this.timer);
		},
		onShow(){
			this.getQuery();
		},
		methods: {
			// 复制订单号
			handleCopeOrder(orderNumber){
				uni.setClipboardData({
					data:orderNumber,
					success:res=>{
						uni.getClipboardData({
							success:res=>{
								console.log('复制：', res);
								uni.showToast({
									title:'订单号已复制',
									icon:'success',
									duration:2000
								})
							}
						})
					}
				})
			},
			// 倒计时结束时间回调
			changeEnd(e){
				console.log(1);
				this.status = 5;
				this.isCountDown = false;
				// this.getQuery();
			},
			// 保留两位小数点
			getFixed(str){
				str = Number(str);
				return str.toFixed(2);
			},
			getQuery(){
				this.$http.getSingleOrder(
					{
						customerId:this.userId,
						orderId:this.orderId
					}
				).then(res=>{
					this.orderDetail = res.returnValue;
					this.orderDetail.createdOn = res.returnValue.createdOn.replace('T',' ')
					let date = new Date(this.orderDetail.createdOn.replace(/-/g,'/')).getTime();
					let min = 30 * 60 * 1000;
					this.endOrderTimeStr = date+min;
					let oldTime = this.getYMDHMS(date+min);
					this.endOrderTime = oldTime;
					console.log(oldTime,this.endOrderTimeStr,'oldtime')
					console.log(this.currentDate,'currentDate');
					
					if(this.orderDetail.shipments!=''){
						this.orderDetail.shipments.map(item=>{
							item.shippedDate = item.shippedDate.replace('T',' ');
							return item;
						})
					}
					
					if(this.orderDetail.orderStatusId==10&&this.orderDetail.paymentStatusId==10&&this.isCountDown){
						this.status = 1;
					}else if(this.orderDetail.orderStatusId==10&&this.orderDetail.paymentStatusId==10&&!this.isCountDown){
						this.status = 5;
					}else if(this.orderDetail.orderStatusId==20&&(this.orderDetail.paymentStatusId==30||this.orderDetail.paymentStatusId==35)&&this.orderDetail.shippingStatusId==20){
						this.status = 2; // 付款成功，待发货
					}else if(this.orderDetail.orderStatusId==20&&(this.orderDetail.paymentStatusId==30||this.orderDetail.paymentStatusId==35)&&this.orderDetail.shippingStatusId==30){
						this.status = 3;
					}else if(this.orderDetail.orderStatusId==30&&(this.orderDetail.paymentStatusId==30||this.orderDetail.paymentStatusId==35)&&this.orderDetail.shippingStatusId==40){
						this.status = 4;
					}else if(this.orderDetail.orderStatusId==20&&(this.orderDetail.paymentStatusId==30||this.orderDetail.paymentStatusId==35)&&this.orderDetail.shippingStatusId==10){
						this.status = 3; // 不需要发货
					}
					
					// if(this.orderDetail.orderStatusId==10&&this.orderDetail.paymentStatusId==10){
					// 	this.status = 1;
					// }else if(this.orderDetail.orderStatusId==20&&this.orderDetail.paymentStatusId==20&&this.orderDetail.shippingStatusId==20){
					// 	this.status = 2;
					// }else if(this.orderDetail.orderStatusId==20&&this.orderDetail.paymentStatusId==20&&this.orderDetail.shippingStatusId==30){
					// 	this.status = 3;
					// }
					// else if(this.orderDetail.orderStatusId==30&&this.orderDetail.paymentStatusId==30){
					// 	this.status = 4;
					// }
				})
			},
			// 获取当前时间
			getTime(){
				var _this = this;
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth()+1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
				_this.currentDate.nowDateTime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
				_this.currentDate.timeStr = new Date().getTime();
				if(this.currentDate.timeStr>this.endOrderTimeStr&&this.orderDetail.orderStatusId==40){
					this.status = 5;
				}else {
					this.countDown = (this.endOrderTimeStr-this.currentDate.timeStr) / 1000;
					// console.log(this.endOrderTimeStr-this.currentDate.timeStr,'剩余倒计时')
				}
			},
			currentTime(){
				this.timer = setInterval(this.getTime,500)
			},
			getYMDHMS (timestamp) {
			  let time = new Date(timestamp)
			  let year = time.getFullYear()
			  const month = (time.getMonth() + 1).toString().padStart(2, '0')
			  const date = (time.getDate()).toString().padStart(2, '0')
			  const hours = (time.getHours()).toString().padStart(2, '0')
			  const minute = (time.getMinutes()).toString().padStart(2, '0')
			  const second = (time.getSeconds()).toString().padStart(2, '0')
		
			  return year + '/' + month + '/' + date + ' ' + hours + ':' + minute + ':' + second
			},
			getImg: function(status) {
				return this.webURL + ["img_order_payment3x.png", "img_order_send3x.png", "img_order_received3x.png",
					"img_order_signed3x.png", "img_order_closed3x.png"
				][status - 1]
			},
			getStatusText: function(status) {
				return ["等待您付款", "付款成功", "待收货", "订单已完成", "交易关闭"][status - 1]
			},
			getReason: function(status) {
				// return ["剩余时间", "等待卖家发货", "还剩X天XX小时自动确认", "", "超时未付款，订单自动取消"][status - 1]
				return ["剩余时间", "等待卖家发货", "", "", "超时未付款，订单自动取消"][status - 1]
			},
			switchStatus() {
				let status = this.status + 1
				this.status = status > 5 ? 1 : status
				this.tui.toast("状态切换成功")
			},
			logistics() {
				this.tui.href("/pages/my/logistics/logistics")
			},
			btnPay() {
				this.show = true
			},
			popupClose() {
				this.show = false
			},
			refund(item){
				this.tui.href("/pages/my/refund/refund?shopId="+item.id+'&orderId='+this.orderId);
			},
			refundList(item){
				this.tui.href("/pages/my/refundList/refundList?shopId="+item.id+'&orderId='+this.orderId+'&returnRequestStatusId='+item.returnRequestStatusId);
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 118rpx;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
		background-color: #EB0909;
	}

	.tui-img-bg {
		width: 100%;
		height: 160rpx;
	}

	.tui-header-content {
		width: 100%;
		height: 160rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 70rpx;
		box-sizing: border-box;
	}

	.tui-status-text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #FEFEFE;
	}

	.tui-reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.tui-reason-text {
		padding-right: 12rpx;
	}

	.tui-status-img {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon-img {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.tui-logistics {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 24rpx 0 20rpx;
		box-sizing: border-box;
	}

	.tui-logistics-text {
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-logistics-time {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-userinfo {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 32rpx;
		padding-top: 16rpx;
	}

	.tui-addr-tel {
		padding-left: 40rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		line-height: 28rpx;
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
	.after_sale{
		padding: 0 30rpx 20rpx 30rpx;
	}
	.after_sale button{
		margin-left: auto!important;
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
		color: #E41F19;
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
	}

	.tui-goods-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-price-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-size24 {
		padding-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #888;
	}

	.tui-size32 {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: 500;
	}

	.tui-pbtm20 {
		padding-bottom: 20rpx;
	}

	.tui-flex-shrink {
		flex-shrink: 0;
	}

	.tui-primary-color {
		color: #EB0909;
	}

	.tui-order-info {
		margin-top: 20rpx;
	}

	.tui-order-title {
		position: relative;
		font-size: 28rpx;
		line-height: 28rpx;
		padding-left: 12rpx;
		box-sizing: border-box;
	}

	.tui-order-title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border-left: 4rpx solid #EB0909;
		height: 100%;
	}

	.tui-order-content {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.tui-order-flex {
		display: flex;
		padding-top: 18rpx;
	}

	.tui-order-flex:first-child {
		padding-top: 0
	}

	.tui-item-title {
		width: 132rpx;
		flex-shrink: 0;
	}

	.tui-item-content {
		color: #666;
		line-height: 32rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 996;
	}

	.tui-btn-mr {
		margin-right: 30rpx;
	}
	.tui-contact{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}
	.tui-contact image{
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}
	.pannel{
		width: 100%;
		height: auto;
		border-radius: 20rpx;
		background: #fff;
		/* margin: 20px 0; */
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333;
	}
	.pannel .title{
		text-align: center;
		font-size: 28rpx;
		color: #333;
	}
	.pannel .box{
		padding: 10rpx 0;
	}
	.pannel .box .label{
		color: #999;
	}
	.pannel .box .val{
		font-weight: bold;
		margin-left: 20rpx;
	}
</style>

<template>
	<view class="container">
		<view class="tui-box">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					配送方式
				</view>
			</tui-list-cell>
			<radio-group @change="handleChange">
				<!-- <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view>{{item.name}}</view>
				</label> -->
				
				<tui-list-cell :arrow="true" unlined :radius="true">
					<view class="flex_cell">
						<radio :value="0" :checked="modeIdx==0"  />
						 <!-- @click="chooseAddr" -->
						<view class="tui-address" @click="chooseAddr">
							<view v-if="currenAddress.address1" style="margin-left: 50rpx;">
								<view class="tui-userinfo">
									<text class="tui-name">{{currenAddress.contactName ||''}}</text> {{currenAddress.phoneNumber || ''}}
								</view>
								<view class="tui-addr">
									<view class="tui-addr-tag">{{currenAddress.isDefault==1?'默认':'其他'}}</view>
									<text>{{currenAddress.city + currenAddress.address1 || ''}}</text>
								</view>
							</view>
							<view class="tui-none-addr" v-else>
								<image src="/static/images/index/map.png" class="tui-addr-img" mode="widthFix"></image>
								<text>选择收货地址</text>
							</view>
						</view>
						<view class="tui-bg-img"></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" unlined :radius="true">
					<label class="flex_cell">						
						<radio :value="1" :checked="modeIdx==1" />
						<view class="tui-address" @click="handleOpenSelfmention">
							<view v-if="paramsAddress.id" style="margin-left: 50rpx;">
								<!-- <view class="tui-userinfo">
									<text class="tui-name">{{paramsAddress.contactName ||''}}</text> {{paramsAddress.phoneNumber || ''}}
								</view> -->
								<view class="tui-addr">
									<!-- <view class="tui-addr-tag">{{currenAddress.isDefault==1?'默认':'其他'}}</view> -->
									<text>{{ paramsAddress.address1 }}</text>
								</view>
							</view>
							<view class="tui-none-addr" v-else>
								<image src="/static/images/index/map.png" class="tui-addr-img" mode="widthFix"></image>
								<text>自提</text>
							</view>
						</view>
						<view class="tui-bg-img"></view>
					</label>
				</tui-list-cell>
				<!-- <tui-list-cell :hover="true">
					<view class="tui-padding tui-flex">
					<radio :value="1" :checked="index === current" />
						<view>自提</view>
						<switch :checked='isExtraction' color="#19be6b" class="tui-switch-small" @change="changeExtraction" />
					</view>
				</tui-list-cell> -->
			</radio-group>
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title" style="color:#E41F19;">
					注意：如想自提，请先录入地址
				</view>
			</tui-list-cell>
			<!-- <tui-list-cell :arrow="true" unlined :radius="true" @click="chooseAddr">
				<view class="tui-address">
					<view v-if="currenAddress.address1">
						<view class="tui-userinfo">
							<text class="tui-name">{{currenAddress.contactName ||''}}</text> {{currenAddress.phoneNumber || ''}}
						</view>
						<view class="tui-addr">
							<view class="tui-addr-tag">{{currenAddress.isDefault==1?'默认':'其他'}}</view>
							<text>{{currenAddress.city + currenAddress.address1 || ''}}</text>
						</view>
					</view>
					<view class="tui-none-addr" v-else>
						<image src="/static/images/index/map.png" class="tui-addr-img" mode="widthFix"></image>
						<text>选择收货地址</text>
					</view>
				</view>
				<view class="tui-bg-img"></view>
			</tui-list-cell>
			<tui-list-cell :hover="true">
				<view class="tui-padding tui-flex">
					<view>自提</view>
					<switch :checked='isExtraction' color="#19be6b" class="tui-switch-small" @change="changeExtraction" />
				</view>
			</tui-list-cell> -->
			<view class="tui-top tui-goods-info">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						商品信息
					</view>
				</tui-list-cell>
				<block v-for="(item,index) in listData" :key="index">
					<tui-list-cell :hover="false" padding="0">
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
					</tui-list-cell>
				</block>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>商品总额</view>
						<view>￥{{totalPrice}}</view>
					</view>
				</tui-list-cell>
	<!-- 			<tui-list-cell :arrow="hasCoupon" :hover="hasCoupon" @click="couponShow=true">
					<view class="tui-padding tui-flex">
						<view>优惠券</view>
						<view :class="{'tui-color-red':hasCoupon}">{{hasCoupon?"满5减1":'没有可用优惠券'}}</view>
					</view>
				</tui-list-cell> -->
				
				<tui-list-cell :hover="true" :arrow="true" @click="invoice">
					<view class="tui-padding tui-flex">
						<view>发票</view>
						<view class="tui-invoice-text">{{isInvoice?'普通发票':'不开发票'}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>配送费</view>
						<view>￥{{ShippingFee}}.00</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>订单备注</view>
						<input type="text" class="tui-remark" @input="changeOrderNode" v-model="orderNode" placeholder="选填: 请先和商家协商一致" placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" unlined>
					<view class="tui-padding tui-flex tui-total-flex">
						<view class="tui-flex-end tui-color-red">
							<view class="tui-black">合计： </view>
							<view class="tui-size-26">￥</view>
							<view class="tui-price-large">{{totalPriceAll}}</view>
							<!-- <view class="tui-size-26">.00</view> -->
						</view>
					</view>
				</tui-list-cell>
			</view>

			<!-- <view class="tui-top">
				<tui-list-cell unlined :hover="insufficient" :radius="true" :arrow="insufficient">
					<view class="tui-flex">
						<view class="tui-balance">余额支付<text class="tui-gray">(￥2020.00)</text></view>
						<switch color="#19be6b" class="tui-scale-small" v-show="!insufficient" />
						<view class="tui-pr-30 tui-light-dark" v-show="insufficient">余额不足, 去充值</view>
					</view>
				</tui-list-cell>
			</view> -->
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar">
			<view class="tui-flex-end tui-color-red tui-pr-20">
				<view class="tui-black">实付金额: </view>
				<view class="tui-size-26">￥</view>
				<view class="tui-price-large">{{totalPriceAll}}</view>
				<!-- <view class="tui-size-26">.00</view> -->
			</view>
			<view class="tui-pr25">
				<tui-button width="200rpx" height="70rpx" :size="28" type="danger" shape="circle" @click="btnPay">确认支付</tui-button>
			</view>
		</view>
		<t-pay-way :show="show" @close="popupClose" :totalPrice='totalPriceAll' :orderId='orderId'></t-pay-way>
		<t-select-coupons :show="couponShow" @close="couponClose"></t-select-coupons>
		<!-- 底部配送自取弹层 -->
		<tui-bottom-popup :show="isExpress" @close="hideisEcpress">
			<div class="locationBox">
				<p class="title">自提地点</p>
				<div class="bd">
					<div class="right">
						<div class="box" v-if="!item.deleted" v-for="(item,index) in shopaddressList" :key="index" @click="getCheckShopaddress(item,index)">
							<div class="iconBox">
								<tui-icon name="circle-fill" :color="number==index?'#3399ff':'#ccc'" :size="26"></tui-icon>
							</div>
							<div>								
								<p class="local">
									{{item.address1}}
								</p>
								<p class="local" @click="handlePhone(item.phoneNumber)">电话：{{item.phoneNumber}}</p>
								<p class="local">营业时间：{{item.openTime}}</p>
								<p class="local">备注：{{item.description}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="btnWrap">
					<button class="btn" @click="hideisEcpress">确定</button>
				</div>
			</div>
		</tui-bottom-popup>
		<tui-alert :show="tipsShow" @click="hideAlert">
			{{tipsText}}
		</tui-alert>
	</view>
</template>

<script>
	import tPayWay from "@/components/views/t-pay-way/t-pay-way"
	import tSelectCoupons from "@/components/views/t-select-coupons/t-select-coupons"
	export default {
		components: {
			tPayWay,
			tSelectCoupons
		},
		data() {
			return {
				hasCoupon: true,
				insufficient: false,
				show: false,
				couponShow:false,
				orderId:'',
				cartIds:[], // 购物车已选择的id
				cartDataList:[], // 购物车数据
				listData:[], // 订单数据
				// totalPrice:"", // 合计金额
				addressList:[],
				// isExtraction:false,
				isExpress:false,
				shopaddressList:[], // 自提地点
				number:-1,
				paramsAddress:{
					id:''
				},
				orderNode:'', //备注
				PickupInStore:0,// 是否自提
				isInvoice:false,
				invoiceTitleId:'',
				ShippingFee:0, // 运费
				totalPriceAll: 0, // 运费+商品总金额
				tipsShow: false,
				tipsText:"",
				modeIdx:-1
			}
		},
		computed:{
			// 当前地址
			currenAddress(){
				return this.$store.state.currenAddress;
			},
			userId(){
				return this.$store.state.userId;
			},
			// 购买商品金额（不包含运费）
			totalPrice(){
				return this.$store.state.totalPrice;
			},
			// 发票id
			// invoiceTitleId(){
			// 	return this.$store.state.invoiceTitleId;
			// }
			isExtraction(){
				if(this.modeIdx==0){
					this.PickupInStore = 0;
					return false;
				}else {
					this.PickupInStore = 1;
					return true;
				}
			}
		},
		onLoad(options){
			Object.assign(this.$data, this.$options.data());
			uni.setStorageSync('invoice',false);
			uni.setStorageSync('invoiceTitleId','');
			this.orderId = options.orderId;
			if(options.cartIds){
				this.cartIds = JSON.parse(options.cartIds);
				console.log(this.cartIds,'====')
				// this.totalPrice = options.totalPrice;
				this.shopaddress();
				this.queryAddress();
				// this.queryCartData().then(res=>{
				// 	console.log('购物车商品数据',res);
				// 	this.queryFreight(res.returnValue)
				// 	// this.getSubmitOrder();
				// });
			}
			
		},
		watch:{
			invoiceTitleId(a,old){
				console.log(a,old);
			}
		},
		onShow(){
			this.isInvoice = uni.getStorageSync('invoice');
			this.invoiceTitleId = wx.getStorageSync('invoiceTitleId');
			console.log(this.invoiceTitleId,'invoiceTitleId')
			this.queryCartData().then(res=>{
				console.log('购物车商品数据',res);
				this.queryFreight(this.listData)
				// this.getSubmitOrder();
			});
		},
		methods: {
			// 订单备注
			changeOrderNode(e){
				this.orderNode = e.mp.detail.value;
			},
			// 获取自提地址
			shopaddress(){
				this.$http.shopaddress().then(res=>{
					this.shopaddressList = res.returnValue;
				})
			},
			// 选择自提地点
			getCheckShopaddress(item,index){
				this.number = index;
				this.paramsAddress = item;
			},
			handlePhone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone 
				});
			},
			hideisEcpress(){
				if(this.paramsAddress.id){
					this.isExpress = false;
					if(this.currenAddress.id){						
						this.queryCartData().then(res=>{
							console.log('购物车商品数据',res);
							this.queryFreight(this.listData)
							// this.getSubmitOrder();
						});
					}else {
						// uni.showModal({
						//     title: '个人信息',
						//     content: '请先去录入地址',
						//     success: function (res) {
						//         if (res.confirm) {
						//             console.log('用户点击确定');
						//         } else if (res.cancel) {
						//             console.log('用户点击取消');
						//         }
						//     }
						// });
					}
				}else {
					this.tui.toast('请选择自提地址')
				}
			},
			handleOpenSelfmention(){
				this.isExpress = true;
				this.PickupInStore = 1;
			},
			// 选择配送方式
			handleChange(e){
				// console.log(e);
				this.modeIdx = e.mp.detail.value;
				if(this.modeIdx==1){
					this.isExpress = true;
					this.PickupInStore = 1;
				}else {
					this.paramsAddress = {};
					this.number = -1;
					this.isExpress = false;
					this.PickupInStore = 0;
					// this.chooseAddr();
				}
				this.queryCartData().then(res=>{
					console.log('购物车商品数据',res);
					this.queryFreight(this.listData)
					// this.getSubmitOrder();
				});
			},
			// 自提开关
			changeExtraction(e){
				this.isExtraction = e.detail.value;
				if(this.isExtraction){
					this.isExpress = true;
					this.PickupInStore = 1;
				}else {
					this.paramsAddress = {};
					this.number = -1;
					this.isExpress = false;
					this.PickupInStore = 0;
				}
				this.queryCartData().then(res=>{
					console.log('购物车商品数据',res);
					this.queryFreight(this.listData)
					// this.getSubmitOrder();
				});
			},
			queryAddress(){
				this.$http.queryAddress({
					customerId:this.userId
				}).then(res=>{
					this.addressList = res.returnValue;
					if(this.addressList==''){
						this.$store.commit('setAddress',{});
					}
					this.addressList.forEach(item=>{
						if(item.isDefault==1){
							this.$store.commit('setAddress',item);
						}
					})
				})
			},
			// 获取购物车数据all
			queryCartData(){
				return new Promise((resolve,reject)=>{					
					this.$http.getShoppingCart({
						customerId:this.userId
					}).then((res)=>{
						this.listData = [];
						this.cartDataList = res.returnValue;
						this.cartDataList.forEach(item=>{
							this.cartIds.forEach(v=>{
								if(item.id==v){
									this.listData.push(item);
								}
							})
						})
						console.log('订单数据：',this.listData);
						resolve(res);
					})   
				})
			},
			// 获取运费（
			queryFreight(list){
				let obj = {};
				list.forEach(item=>{
					obj['product_'+item.productId] = item.quantity
				})
				console.log(obj,'obj')
				let provinceName = this.currenAddress.stateProvince;
				let data = '\r\n--XXX'
				for(var key in obj){
					if(obj[key]){
						data+=
							'\r\nContent-Disposition: form-data; name="'+key+'"'+
							'\r\n'+
							'\r\n'+obj[key]+
							'\r\n--XXX' 
					}
				}
				data+=
					'\r\nContent-Disposition: form-data; name="provinceName"'+
					'\r\n'+
					'\r\n'+provinceName+
					'\r\n--XXX';
				data += '--';
				let url = '/Checkout/order/ShipFee?customerId='+this.userId
				this.$http.getFreight(
					url,data
				).then(res=>{
					this.ShippingFee = 0;
					if(!this.isExtraction){
						if(res.state=='SUCCESS'){							
							this.ShippingFee = res.returnValue.shippingFee;
						}
						this.totalPriceAll = Number(this.totalPrice) + Number(this.ShippingFee);
					}else {
						this.totalPriceAll = Number(this.totalPrice);
					}
					console.log(this.totalPrice)
					console.log(this.ShippingFee)
				})
			},
			chooseAddr() {
				uni.navigateTo({
					url: "/pages/my/address/address?isAddress=1"
				})
			},
			btnPay() {
				if(this.modeIdx==-1){
					this.tui.toast('请选择配送方式!')
				}else 
				if(!this.isExtraction && (JSON.stringify(this.currenAddress)!="{}")){
					this.getSubmitOrder().then(res=>{
						if(res.state=='SUCCESS'){
							this.show = true;
						}
					});
				}else if(this.isExtraction && this.paramsAddress.id!='' && this.currenAddress.id){
					this.getSubmitOrder().then(res=>{
						if(res.state=='SUCCESS'){
							this.show = true;
						}
					});
				}else {
					this.tui.toast('请选择录入地址!')
				}
			},
			getSubmitOrder(){
				return new Promise((resolve,reject)=>{
					let obj = {
						customerId:this.userId,
						shippingAddressId:this.currenAddress.id || '',
						orderNode:this.orderNode
					}
					let ids = this.getCheckAttr();
					// console.log('id:',ids);
					var data = '\r\n--XXX'
					for(var item in ids){
						if(ids[item]){						
							data+=
								'\r\nContent-Disposition: form-data; name="'+item+'"'+
								'\r\n'+
								'\r\n'+ids[item]+
								'\r\n--XXX' 
						}
					}
					data += '\r\nContent-Disposition: form-data; name="orderNode"'+
								'\r\n'+
								'\r\n'+obj.orderNode+
								'\r\n--XXX'
					data += '\r\nContent-Disposition: form-data; name="PickupInStore"'+
								'\r\n'+
								'\r\n'+this.PickupInStore+
								'\r\n--XXX'
					data += '\r\nContent-Disposition: form-data; name="PickupAddressId"'+
								'\r\n'+
								'\r\n'+this.paramsAddress.id+
								'\r\n--XXX'
								
					data += '\r\nContent-Disposition: form-data; name="ShippingFee"'+
								'\r\n'+
								'\r\n'+this.ShippingFee+
								'\r\n--XXX'
					if(this.isInvoice){
						data += '\r\nContent-Disposition: form-data; name="invoiceTitleId"'+
									'\r\n'+
									'\r\n'+this.invoiceTitleId+
									'\r\n--XXX'
					}
					data += '--';
					uni.request({
						url: 'https://cbt.pumchit.cn/shopapi/Checkout/order/confirm?customerId='+obj.customerId+'&shippingAddressId='+obj.shippingAddressId,
						header: {
							'content-type': 'multipart/form-data; boundary=XXX', 
						},
						method:'POST',
						data:data,	
						success: (res) => {
							console.log(res,'res')
							if(res.data.state=='SUCCESS'){
								this.orderId = res.data.returnValue.id;
							}else {
								let title = res.data.error[0]||'生成订单失败';
								// uni.showToast({
								// 	title:title,
								// 	icon:'none',
								// 	duration:2000
								// })
								this.tipsText = title;
								this.tipsShow = true;
								setTimeout(()=>{
									this.tipsShow = false;
								},2000)
							}
							resolve(res.data)
						}
					});
				})
			},
			hideAlert(){
				this.tipsShow = false;
			},
			getCheckAttr(){
				var temp = {};
				var i = 0;
				this.listData.forEach(item=>{	
					i++
					temp['cartitem_id_'+i] = item.id;
				})
				return temp;
			},
			popupClose() {
				this.show = false
			},
			couponClose(){
				this.couponShow=false
			},
			invoice(){
				this.tui.href('/pages/order/invoice/invoice')
			}
		}
	}
</script>

<style>
	.flex_cell{
		display: flex;
		align-items: center;
	}
	.container {
		padding-bottom: 98rpx;
	}

	.tui-box {
		padding: 20rpx 0 118rpx;
		box-sizing: border-box;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-name {
		padding-right: 40rpx;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		padding-right: 25rpx;
	}

	.tui-addr-tag {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #EB0909;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		border-radius: 6rpx;
	}

	.tui-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		bottom: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.tui-padding {
		box-sizing: border-box;
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

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.tui-total-flex {
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-balance {
		font-size: 28rpx;
		font-weight: 500;
	}

	.tui-black {
		color: #222;
		line-height: 30rpx;
	}

	.tui-gray {
		color: #888888;
		font-weight: 400;
	}

	.tui-light-dark {
		color: #666;
	}

	.tui-goods-price {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}

	.tui-size-26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-phcolor {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	/* #ifndef H5 */
	.tui-remark-box {
		padding: 22rpx 30rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.tui-remark-box {
		padding: 26rpx 30rpx;
	}

	/* #endif */

	.tui-remark {
		flex: 1;
		font-size: 26rpx;
		padding-left: 64rpx;
	}

	.tui-scale-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-scale-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */
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

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-right: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-addr-img {
		width: 36rpx;
		height: 46rpx;
		display: block;
		margin-right: 15rpx;
	}


	.tui-pr25 {
		padding-right: 25rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}
	
	.locationBox .title{
		padding: 40rpx 0;
		text-align: center;
		border-bottom: 1rpx solid #e2e3e5;
		font-weight: bold;
	}
	.locationBox .bd{
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		font-size: 28rpx;
	}
	.locationBox .bd .left{
		width: 150rpx;
	}
	.locationBox .bd .right{
		flex: 1;
		margin-left: 10rpx;
	}
	.locationBox .bd .right .tips{
		padding-bottom: 20rpx;
	}
	.locationBox .bd .right .box:last-child{
		margin-top: 20rpx;
	}
	.locationBox .btnWrap{
		margin: 100rpx 20rpx 50rpx 20rpx;
	}
	.locationBox .btnWrap .btn{
		background: #eb0909;
		color: #fff;
	}
	.locationBox .bd .right .box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.locationBox .bd .right .box .iconBox{
		width: 80rpx;
		margin-right: 10rpx;
	}
</style>

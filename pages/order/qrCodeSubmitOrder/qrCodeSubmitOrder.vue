<template>
	<!-- 扫码提交订单 -->
	<view class="container">
		<view class="tui-box">
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
			</tui-list-cell> -->
			<view class="tui-top tui-goods-info">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						商品信息
					</view>
				</tui-list-cell>
				<block>
					<tui-list-cell :hover="false" padding="0">
						<view class="tui-goods-item">
							<image :src="shopDetail.pictureModels[0].thumbImageUrl" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{shopDetail.name}}</view>
								<!-- <view class="tui-goods-attr">黑色，50ml</view> -->
							</view>
							<view class="tui-price-right">
								<view>￥{{shopDetail.productPrice.oldPrice || ''}}</view>
								<view class="quantity">
									<tui-numberbox :disabled="shopDetail.stockQuantity==0?true:false" :max="shopDetail.stockQuantity" :min="1" :value="productNum" @change="changeQuantity"></tui-numberbox>
								</view>
								<!-- <view>x{{item.quantity}}</view> -->
							</view>
						</view>
					</tui-list-cell>
				</block>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>商品总额</view>
						<view>￥{{totalPriceAll}}</view>
					</view>
				</tui-list-cell>
				<!-- 定制化商品必填信息 -->
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view class="label">姓名</view>
						<input type="text" class="tui-remark" @change="changeInfoName" v-model="info.name" placeholder="请输入姓名" placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view class="label">手机号</view>
						<input type="number" maxlength="11" class="tui-remark" @change="changeInfoPhone" v-model="info.phone" placeholder="请输入手机号" placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view class="label">身份证号</view>
						<input type="idcard" maxlength="18" class="tui-remark" @change="changeInfoCartId" v-model="info.cardId" placeholder="请输入身份证号" placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>
				<!-- <tui-list-cell :hover="true">
					<view class="tui-padding tui-flex">
						<view>自提</view>
						<switch :checked='isExtraction==0?false:true' color="#19be6b" class="tui-switch-small" @change="changeExtraction" />
					</view>
				</tui-list-cell>
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
				</tui-list-cell> -->
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view class="label">订单备注</view>
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
						<div class="box" v-for="(item,index) in shopaddressList" :key="index" @click="getCheckShopaddress(item,index)">
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
		<tui-modal :show="loginPopup"  title="提示" content="您还未登录,请点击确定去登录!" @cancel="handleCanel" @click="handleLoginBtn"></tui-modal>
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
				isExtraction:0,
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
				// totalPriceAll: 0, // 运费+商品总金额
				totalPrice:0,
				shopDetail:{},
				productNum:1,
				info:{
					name:"",
					phone:"",
					cardId:""
				},
				loginPopup:false,
				PickupAddressId:''
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
			// totalPrice(){
			// 	return this.$store.state.totalPrice;
			// },
			totalPriceAll(){
				return this.totalPrice * this.productNum
			},
			isLogin(){
				return this.$store.state.isLogin;
			}
			// 发票id
			// invoiceTitleId(){
			// 	return this.$store.state.invoiceTitleId;
			// }
		},
		onLoad(options){
			Object.assign(this.$data, this.$options.data());
			uni.setStorageSync('invoice',false);
			uni.setStorageSync('invoiceTitleId','');
			this.orderId = options.orderId;
			this.id = options.id;
			this.getQuery();
			this.shopaddress();
		},
		watch:{
			invoiceTitleId(a,old){
				console.log(a,old);
			}
		},
		methods: {
			// 商品详情
			getQuery(){
				this.$http.getShopDetail(
					{
						itemId:this.id
					}
				).then(res=>{
					console.log('商品详情',res)
					this.shopDetail = res.returnValue;
					this.totalPrice = this.shopDetail.productPrice.oldPrice
				})
			},
			changeQuantity(e){
				this.productNum = e.value;
			},
			// 订单备注
			changeOrderNode(e){
				this.orderNode = e.mp.detail.value;
			},
			changeInfoName(e){
				this.info.name = e.mp.detail.value;
			},
			changeInfoCartId(e){
				this.info.cardId = e.mp.detail.value;
			},
			changeInfoPhone(e){
				this.info.phone = e.mp.detail.value;
			},
			// 获取自提地址
			shopaddress(){
				this.$http.shopaddress().then(res=>{
					this.shopaddressList = res.returnValue;
					this.PickupAddressId = res.returnValue[0].id; // 自提地址默认第一个id
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
				if(this.paramsAddress.id==''){
					this.tui.toast('请选择自提地址')
				}else {
					this.isExpress = false;
					this.queryCartData().then(res=>{
						console.log('购物车商品数据',res);
						this.queryFreight(this.listData)
						// this.getSubmitOrder();
					});
				}
			},
			changeExtraction(e){
				console.log(e);
				this.isExtraction = e.detail.value;
				if(this.isExtraction!=0){
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
						this.ShippingFee = res.returnValue.shippingFee;
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
			handleLoginBtn(e){
				if(e.index==0){
					this.loginPopup = false;
				}else if(e.index==1){
					uni.navigateTo({
						url:'../../index/login/login?sign='+'qrCode'+'&id='+this.id
					})
					this.loginPopup = false;
				}
			},
			async btnPay() {
				if(this.isLogin){
					let isCardId = this.isCardNo(this.info.cardId);
					let isPhone = this.validatePhoneNum(this.info.phone);
					if(this.info.name==''){
						this.tui.toast('请输入姓名');
						return false;
					}else if(this.info.phone==''&&!isPhone){
						this.tui.toast('请输入手机号');
						return false;
					}else if(this.info.cardId==''&&!isCardId){
						this.tui.toast('请输入身份证号');
						return false;
					}else if(!isPhone){
						this.tui.toast('请输入正确手机号');
						return false;
					}else if(!isCardId){
						this.tui.toast('请输入正确身份证号');
						return false;
					}else{
						var ret = await this.register();
						console.log('ret:', ret);
						var CustomerItem = ret.returnValue;
						this.getSubmitOrder(CustomerItem).then(res=>{
							if(res.state=='SUCCESS'){
								this.show = true;
							}
						});
					}
				}else {
					this.loginPopup = true;
				}
				
			},
			/**
			 * 校验身份证号格式(简单位数格式校验)
			 * @param card 身份证号
			 * @returns true格式正确，false格式错误
			 */
			isCardNo(card) {
			    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
			    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			    if (reg.test(card)) {
			        return true
			    }
			    return false
			},
			 /**
			   * @desc 校验身份证号是否合法
			   * @param {String} idCardNum 18 位身份证号
			   * @return {Boolean}
			   */
			validateIdCardNum (idCardNum) {
			    // 非法字符串
			    if (typeof idCardNum !== 'string') return false
			    // 所有身份证前两位代表的是地区
			    const city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
			    const birthday = idCardNum.substr(6, 4) + '/' + Number(idCardNum.substr(10, 2)) + '/' + Number(idCardNum.substr(12, 2))
			    const d = new Date(birthday)
			    const newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
			    const currentTime = new Date().getTime()
			    const time = d.getTime()
			    // 身份证系数列表
			    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
			    // 设定身份证通过相加运算得到值对应的身份证最后一位的列表
			    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
			    let sum = 0
			    // 非法身份证
			    if (!/^\d{17}(\d|x)$/i.test(idCardNum)) return false
			    // 非法地区 非法地区
			    if (city[idCardNum.substr(0, 2)] === undefined) return false
			    // 非法生日
			    if (time >= currentTime || birthday !== newBirthday) return false
			
			    // 计算当前身份证最后一位的值
			    for (let i = 0; i < 17; i++) {
			      sum += idCardNum.substr(i, 1) * arrInt[i]
			    }
			
			    const residue = arrCh[sum % 11]
			    // 非法身份证哦
			    if (residue !== idCardNum.substr(17, 1)) return false
			
			    return true
			  },
			  /**
			     * @desc 校验国内手机号是否合法
			     * @param {String} phoneNum 手机号
			     * @return {Boolean}
			     */
			validatePhoneNum (phoneNum) {
			  const reg = /^1[0-9]{10}$/
			  return reg.test(phoneNum)
			},
			// 定制商品购买人员登记信息
			register(){
				return new Promise((resolve,reject)=>{
					let url = '/Order/addCustomerItem?customerId='+this.userId;
					let obj = {
						str:'',
						phone:this.info.phone,
						name:this.info.name,
						cardid:this.info.cardId
					}
					let data = '';
					for(var key in obj){
							data+=
								'\r\nContent-Disposition: form-data; name="'+key+'"' +
								'\r\n' +
								'\r\n'+obj[key]+
								'\r\n--XXX'
					}
					data += '--';
					this.$http.registerInfo(url,data).then(res=>{
						console.log('定制邮票：',res);
						resolve(res);
					})
				})
			},
			getSubmitOrder(CustomerItem){
				return new Promise((resolve,reject)=>{
					let obj = {
						customerId:this.userId,
						shippingAddressId:1,
						orderNode:this.orderNode
					}
					var cartitem = 'cartitem_id_'+this.id
					var data = '\r\n--XXX'
					data += '\r\nContent-Disposition: form-data; name="'+cartitem+'"'+
								'\r\n'+
								'\r\n'+this.productNum+
								'\r\n--XXX'
					data += '\r\nContent-Disposition: form-data; name="orderNode"'+
								'\r\n'+
								'\r\n'+obj.orderNode+
								'\r\n--XXX'
					data += '\r\nContent-Disposition: form-data; name="PickupInStore"'+
								'\r\n'+
								'\r\n'+1+
								'\r\n--XXX'
					data += '\r\nContent-Disposition: form-data; name="PickupAddressId"'+
								'\r\n'+
								'\r\n'+this.PickupAddressId+
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
					data += '\r\nContent-Disposition: form-data; name="CustomerItem"'+
								'\r\n'+
								'\r\n'+CustomerItem+
								'\r\n--XXX'
					data += '--';
					uni.request({
						url: 'https://cbt.pumchit.cn/shopapi/Checkout/order/directconfirm?customerId='+obj.customerId+'&shippingAddressId='+obj.shippingAddressId,
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
								uni.showToast({
									title:title,
									icon:'none',
									duration:2000
								})
							}
							resolve(res.data)
						}
					});
				})
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
	.tui-price-right .quantity{
		margin-top: 20rpx;
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
	.label{
		width: 66px;
	}
</style>

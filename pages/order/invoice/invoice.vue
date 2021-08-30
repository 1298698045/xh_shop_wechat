<template>
	<view class="container">
		<view class="tui-invoice__box">
			<tui-list-cell :hover="false">
				<view class="tui-title tui-bold">
					<text>发票类型</text>
					<text class="tui-notice" @tap="modal = true">发票须知</text>
				</view>
				<view class="tui-attr__box">
					<view class="tui-attr-item" :class="{ 'tui-attr-active': type === 1 }" @tap="switchType(1)">普通发票</view>
					<view class="tui-attr-item" :class="{ 'tui-attr-active': type === 2 }" @tap="switchType(2)">不开发票</view>
				</view>
				<view class="tui-tips">商家将纸质发票、商品一同邮寄给用户；若商品退货，需将发票一同寄给商家</view>
			</tui-list-cell>
			<view v-if="type === 1">
				<tui-list-cell :hover="false">
					<view class="tui-title tui-bold">发票抬头</view>
					<view class="tui-attr__box tui-pbtm__0">
						<view class="tui-attr-item" :class="{ 'tui-attr-active': invoiceTitle === 1 }" @tap="switchTitle(1)">个人</view>
						<view class="tui-attr-item" :class="{ 'tui-attr-active': invoiceTitle === 2 }" @tap="switchTitle(2)">单位</view>
					</view>
					<view class="tui-form">
						<view class="tui-box__personal" v-show="invoiceTitle === 1">
							<view class="tui-input__item">
								<view class="tui-input__title">个人名称</view>
								<input placeholder="请输入个人名称" @input="changeName" v-model="personal.name" placeholder-class="tui-placeholder" />
							</view>
						</view>
						<view class="tui-box__enterprise" v-show="invoiceTitle === 2">
							<view class="tui-input__item">
								<view class="tui-input__title">单位名称</view>
								<input placeholder="请填写单位名称" @input="changeName" v-model="company.name" placeholder-class="tui-placeholder" />
							</view>
							<view class="tui-input__item">
								<view class="tui-input__title">纳税人识别码</view>
								<input placeholder="纳税人识别号/统一社会信用代码" @input="changeCode" v-model="company.taxpayerCode" placeholder-class="tui-placeholder" />
							</view>
							<view class="tui-input__item tui-between">
								<view class="tui-input__title">更多选填项</view>
								<view class="tui-more__optional" @tap="optional=!optional">
									<text>展开</text>
									<tui-icon :name="optional?'arrowup':'arrowdown'" :size="18" color="#999"></tui-icon>
								</view>
							</view>
							<view class="tui-optional__box" v-if="optional">
								<!-- <view class="tui-input__item">
									<view class="tui-input__title">注册地址</view>
									<input placeholder="请填写注册地址" placeholder-class="tui-placeholder" />
								</view>
								<view class="tui-input__item">
									<view class="tui-input__title">注册电话</view>
									<input type="number" placeholder="请填写注册电话" placeholder-class="tui-placeholder" />
								</view> -->
								<view class="tui-input__item">
									<view class="tui-input__title">开户银行</view>
									<input placeholder="请填写单位开户银行" @input="changeBankName" v-model="company.BankName" placeholder-class="tui-placeholder" />
								</view>
								<view class="tui-input__item">
									<view class="tui-input__title">银行账号</view>
									<input placeholder="请填写单位银行账号" @input="changeBankAccountNo" v-model="company.BankAccountNo" placeholder-class="tui-placeholder" />
								</view>
							</view>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" v-show="invoiceTitle === 1">
					<view class="tui-title tui-bold">收票人信息</view>
					<view class="tui-input__item">
						<view class="tui-input__title">收票人手机</view>
						<input placeholder="可通过手机号在发票服务平台查询" @input="changePhone" maxlength="11" v-model="personal.ShipToTelephone" placeholder-class="tui-placeholder" value="188****0088" />
					</view>
					<view class="tui-input__item">
						<view class="tui-input__title">收票人邮箱</view>
						<input placeholder="用来接收电子发票邮件,可选填" @input="changeEmail" v-model="personal.shipTo_Email" placeholder-class="tui-placeholder" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" v-show="invoiceTitle === 2">
					<view class="tui-title tui-bold">收票人信息</view>
					<view class="tui-input__item">
						<view class="tui-input__title">收票人手机</view>
						<input placeholder="可通过手机号在发票服务平台查询" @input="changePhone"  maxlength="11" v-model="company.ShipToTelephone" placeholder-class="tui-placeholder" value="188****0088" />
					</view>
					<view class="tui-input__item">
						<view class="tui-input__title">收票人邮箱</view>
						<input placeholder="用来接收电子发票邮件,可选填" @input="changeEmail" v-model="company.shipTo_Email" placeholder-class="tui-placeholder" />
					</view>
				</tui-list-cell>
			</view>
		</view>

		<view class="tui-btn__box">
			<tui-button type="danger" height="88rpx" shape="circle" @click="getSubmit">确定</tui-button>
		</view>

		<tui-modal :show="modal" shape="circle" padding="30rpx 40rpx" custom>
			<view class="tui-modal__title">发票须知</view>
			<view class="tui-modal__p">1.发票金额不含优惠券、红包等优惠扣减金额；</view>
			<view class="tui-modal__p">2.请确保发票抬头、纳税人识别号或统一社会信用代码的准确性，开票成功后无法更改；</view>
			<view class="tui-modal__p">3.增值税普通发票的开具不填写纳税人识别号或统一社会信用代码不得作为税收凭证。</view>
			<view class="tui-modal__btn">
				<tui-button type="danger" shape="circle" width="280rpx" height="68rpx" :size="26" @click="modal = false">我知道了</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1, //发票类型：1-电子普通发票 2-不开发票
				invoiceTitle: 1, //发票抬头：1-个人 2-企业
				optional: false,
				modal: false,
				list:[],
				personal:{
					InvoiceTitleId:'',
					invoiceTitleType:'',
					name:'',
					BankName:'',
					BankAccountNo:'',
					ShipToTelephone:'',
					ShipToEmail:'',
					description:''
				},
				company:{
					InvoiceTitleId:'',
					InvoiceTitleType:'',
					name:'',
					BankName:'',
					BankAccountNo:'',
					ShipToTelephone:'',
					ShipToEmail:'',
					description:''
				},
				invoiceTitleType:0,
				afterInvoice:'',
				orderId:'',
				invoiceTitleId:''
			};
		},
		computed:{
			userId(){
				return this.$store.state.userId;
			}
		},
		onLoad(options){
			this.afterInvoice = options.afterInvoice;
			this.orderId = options.orderId;
			this.getQuery(); 
		},
		methods: {
			changeName(e){
				if(this.invoiceTitleType==0){
					this.personal.name = e.mp.detail.value;
				}else {
					this.company.name = e.mp.detail.value;
				}
			},
			changePhone(e){
				if(this.invoiceTitleType==0){
					this.personal.shipTo_Telephone = e.mp.detail.value;
					this.personal.ShipToTelephone = e.mp.detail.value;
				}else {
					this.company.shipTo_Telephone = e.mp.detail.value;
					this.company.ShipToTelephone =  e.mp.detail.value;
				}
			},
			changeEmail(e){
				if(this.invoiceTitleType==0){
					this.personal.shipTo_Email = e.mp.detail.value;
					this.personal.ShipToEmail = e.mp.detail.value;
				}else {
					this.company.shipTo_Email = e.mp.detail.value;
					this.company.ShipToEmail = e.mp.detail.value;
				}
			},
			// 税号
			changeCode(e){
				this.company.taxpayerCode = e.mp.detail.value;
				this.company.TaxpayerCode = e.mp.detail.value;
			},
			// 开户银行
			changeBankName(e){
				this.company.BankName = e.mp.detail.value;
			},
			changeBankAccountNo(e){
				this.company.BankAccountNo = e.mp.detail.value;
			},
			switchType(type) {
				this.type = type;
			},
			switchTitle(type) {
				this.invoiceTitle = type;
				if(type==2){
					this.invoiceTitleType = 1;
				}else {
					this.invoiceTitleType = 0;
				}
				console.log(this.invoiceTitleType)
			},
			getQuery(){
				this.$http.getInvoices({
					customerId:this.userId
				}).then(res=>{
					this.list = res.returnValue;
					if(this.list!=''){
						let idx = this.list.findIndex(item=>item.invoiceTitleType==0);
						let index = this.list.findIndex(item=>item.invoiceTitleType==1);
						if(idx!=-1){							
							this.personal = res.returnValue[idx];
							this.personal.InvoiceTitleId = res.returnValue[idx].invoiceTitleId;
							this.personal.InvoiceTitleType = res.returnValue[idx].invoiceTitleType;
							this.personal.ShipToTelephone = res.returnValue[idx].shipTo_Telephone;
							this.personal.ShipToEmail = res.returnValue[idx].shipTo_Email;
						}
						if(index!=-1){							
							this.company = res.returnValue[index];
							this.company.InvoiceTitleId = res.returnValue[index].invoiceTitleId;
							this.company.InvoiceTitleType = res.returnValue[index].invoiceTitleType;
							this.company.ShipToTelephone = res.returnValue[index].shipTo_Telephone;
							this.company.ShipToEmail = res.returnValue[index].shipTo_Email;
							this.company.TaxpayerCode = res.returnValue[index].taxpayerCode;
							this.company.BankName = res.returnValue[index].bankName;
							this.company.BankAccountNo = res.returnValue[index].bankAccountNo;
						}
					}
				})
			},
			/**
			     * @desc 校验国内手机号是否合法
			     * @param {String} phoneNum 手机号
			     * @return {Boolean}
			     */
			// validatePhoneNum (phoneNum) {
			//   const reg = /^1[0-9]{10}$/
			//   return reg.test(phoneNum)
			// },
			validatePhoneNum(TEL) {
			    var strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/
			    if (strTemp.test(TEL)) {
			        return true
			    }
			    return false
			},
			// 验证邮箱
			isEmail(s){
			    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
			},
			getSubmit(){
				if(this.type==1){
					if(this.invoiceTitleType==0){
						var {InvoiceTitleId,InvoiceTitleType,name,BankName,BankAccountNo,ShipToTelephone,ShipToEmail,TaxpayerCode} = this.personal
						if(name==''){
							uni.showToast({
								title:'名称不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(ShipToTelephone==''){
							uni.showToast({
								title:'手机号不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(ShipToEmail==''){
							uni.showToast({
								title:'邮箱不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(ShipToTelephone!=''&&!this.validatePhoneNum(ShipToTelephone)){
							uni.showToast({
								title:'请输入正确手机号',
								icon:'none',
								duration:2000
							})
							return false;
						}
						else if(ShipToEmail!=''&&!this.isEmail(ShipToEmail)){
							uni.showToast({
								title:'请输入正确邮箱',
								icon:'none',
								duration:2000
							})
							return false;
						}
						// console.log(InvoiceTitleId,InvoiceTitleType,name,BankName,BankAccountNo,ShipToTelephone,ShipToEmail)
					}else {
						var {InvoiceTitleId,InvoiceTitleType,name,BankName,BankAccountNo,ShipToTelephone,ShipToEmail,TaxpayerCode} = this.company;
						if(name==''){
							uni.showToast({
								title:'名称不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(ShipToTelephone==''){
							uni.showToast({
								title:'手机号不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(ShipToEmail==''){
							uni.showToast({
								title:'邮箱不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(TaxpayerCode==''){
							uni.showToast({
								title:'税号不能为空',
								icon:'none',
								duration:2000
							})
							return false;
						}else if(ShipToTelephone!=''&&!this.validatePhoneNum(ShipToTelephone)){
							uni.showToast({
								title:'请输入正确手机号',
								icon:'none',
								duration:2000
							})
							return false;
						}
						else if(ShipToEmail!=''&&!this.isEmail(ShipToEmail)){
							uni.showToast({
								title:'请输入正确邮箱',
								icon:'none',
								duration:2000
							})
							return false;
						}
					}
					console.log(InvoiceTitleId,InvoiceTitleType,name,BankName,BankAccountNo,ShipToTelephone,ShipToEmail,'===')
					// return false;
					this.$http.invoiceEdit({
						customerId:this.userId,
						InvoiceTitleId:InvoiceTitleId,
						InvoiceTitleType:this.invoiceTitleType,
						name:name || '',
						BankName:BankName || '',
						BankAccountNo:BankAccountNo || '',
						ShipToTelephone: ShipToTelephone || '',
						ShipToEmail:ShipToEmail || '',
						TaxpayerCode:TaxpayerCode || ''
					}).then(res=>{
						console.log(res.invoiceTitleId);
						// this.$store.dispatch('setInvoice',res.invoiceTitleId);
						this.invoiceTitleId = res.invoiceTitleId;
						if(this.orderId){
							// 更新发票
							this.orderApplyInvoice();
						}else {
							uni.setStorageSync('invoiceTitleId',res.invoiceTitleId)
							wx.showToast({
								title:'添加成功',
								icon:'success',
								duration:2000,
								success:res=>{
									uni.setStorageSync('invoice',true)
									setTimeout(()=>{								
										uni.navigateBack({
											delta:1
										})
									},1000)
								}
							})
						}
					})
				}else {
					uni.setStorageSync('invoice',false);
					uni.navigateBack({
						delta:1
					})
				}
			},
			orderApplyInvoice(){
				this.$http.orderApplyInvoice({
					customerId:this.userId,
					orderId:this.orderId,
					InvoiceTitleId:this.invoiceTitleId
				}).then(res=>{
					if(res.state=='SUCCESS'){						
						wx.showToast({
							title:'添加成功',
							icon:'success',
							duration:2000,
							success:res=>{
								uni.setStorageSync('invoice',true)
								setTimeout(()=>{								
									uni.navigateBack({
										delta:1
									})
								},1000)
							}
						})
					}
				})
			}
		}
	};
</script>

<style>
	.tui-invoice__box {
		background-color: #ffffff;
		margin-top: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tui-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-notice {
		font-size: 24rpx;
		font-weight: 400;
		color: #999;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-attr__box {
		padding: 24rpx 0;
	}

	.tui-pbtm__0 {
		padding-bottom: 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 180rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: #f7f7f7;
		border: 1rpx solid #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32px;
		margin-right: 32rpx;
		font-size: 26rpx;
	}

	.tui-attr-active {
		background-color: #fcedea;
		border-color: #e41f19;
		color: #e41f19;
		font-weight: bold;
	}

	.tui-tips {
		color: #999;
		font-size: 24rpx;
		font-weight: 400;
	}

	.tui-input__item {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		padding-top: 40rpx;
	}

	.tui-input__title {
		width: 196rpx;
		flex-shrink: 0;
	}

	.tui-input__item input {
		font-size: 28rpx;
		flex: 1;
	}

	.tui-placeholder {
		color: #bfbfbf;
	}

	.tui-more__optional {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		color: #999;
	}

	.tui-between {
		justify-content: space-between;
	}

	.tui-btn__box {
		padding: 60rpx 30rpx 80rpx;
	}

	.tui-modal__title {
		text-align: center;
		font-weight: bold;
		padding-bottom: 8rpx;
	}

	.tui-modal__p {
		font-size: 26rpx;
		color: #888;
		padding-top: 20rpx;
	}

	.tui-modal__btn {
		width: 100%;
		padding: 60rpx 0 20rpx;
		display: flex;
		justify-content: center;
	}
</style>

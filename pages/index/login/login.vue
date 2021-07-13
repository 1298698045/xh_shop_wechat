<template>
	<view class="wrap">
		<image src="../../../static/images/loginBG.jpg" mode="scaleToFill" class="imgs"></image>
		<div class="box">
			<div class="boxChild">				
				<button class="btn" @tap="isRead?getUserProfile():getRead()">微信快速登陆</button>
				
				<div class="tips">
					<p class="text">登录注册后成为本商城会员</p>
					<p class="text">
						<!-- <tui-checkbox :checked="isRead" color="#f8683c"
							borderColor="#999">
						</tui-checkbox> -->
						<checkbox-group @change="changeRead">
							<checkbox :checked="isRead" value='1'></checkbox>
							您已阅读并同意
							<span @click="getHerf(1)">
								《用户协议》
							</span>
							和 
							<span @click="getHerf(2)">
								《隐私协议》
							</span>
						</checkbox-group>
						
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
				code:'',
				serverAgreement:false,
				userAgreement:false,
				isRead:false
			}
		},
		onShow(){
			this.serverAgreement =  uni.getStorageSync('serverAgreement');
			this.userAgreement = uni.getStorageSync('userAgreement');
		},
		methods: {
			changeRead(e){
				this.isRead = e.mp.detail.value[0]==1?true:false;
			},
			getHerf(i){
				switch(i){
					case 1:
						uni.navigateTo({
							url:'../../common/about/about'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'../../common/pvivacy/pvivacy'
						})
						break;
					default:
						break;
				}
			},
			getRead(){
				uni.showToast({
					title:'请先阅读用户协议和隐私协议',
					icon:'none',
					duration:2000
				})
			},
			getUserProfile() {
				let that = this;
				let code = '';
				uni.login({
					provider:'weixin',
					success:res=>{		
						// console.log(res.code,'code')
						code = res.code;
					}
				})
				uni.getUserProfile({
					desc: '登录',
					success: function(res) {
					  var userInfo = res.userInfo
					  wx.setStorageSync('info',JSON.stringify(userInfo));
					  // console.log('userInfo==>', userInfo)
					  wx.setStorageSync('storage_info', 1);//本地标记
					  //下面将userInfo存入服务器中的用户个人资料
					  //...
					  that.$http.getLogin({
						  js_code:code,
						  genderCode:userInfo.gender,
						  nickName:userInfo.nickName
					  }).then(res=>{
						  console.log(res);
						  uni.setStorageSync('openId',res.openId);
						  uni.setStorageSync('sessionKey',res.sessionKey);
						  uni.setStorageSync('userId',res.customerId);
						  that.$store.dispatch('cmtUserId',res.customerId);
						  // that.tui.toast('登陆成功')
						  uni.navigateBack({
						  	delta:1
						  })
					  })
					},
					fail() {
					  that.tui.toast('登录失败')
					}
				})
			},
		}
	}
</script>

<style>
	.wrap .imgs{
		width: 100%;
		height: 100vh;
	}
	.wrap{
		position: relative;
	}
	.wrap .box{
		width: 100%;
		position: absolute;
		bottom: 150rpx;
	}
	.boxChild{
		width: 80%;
		margin: 0 auto;
	}
	.boxChild .btn{
		color: #910619;
		font-size: 32rpx;
	}
	.boxChild .tips{
		margin-top: 30rpx;
	}
	.boxChild .tips .text{
		color: #fff;
		font-size: 24rpx;
		text-align: center;
	}
	checkbox .wx-checkbox-input {
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
	}
	/*checkbox选中后样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  background: #0394F0;
	  border-color:#0394F0;
	}
	/*checkbox选中后图标样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	  width: 20rpx;
	  height: 20rpx;  
	  line-height: 20rpx;
	  text-align: center;
	  font-size: 22rpx;
	  color: #fff;
	  background: transparent;
	  transform: translate(-50%, -50%) scale(1);
	  -webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>

<template>
	<view>
		<tui-button plain @tap="getUserProfile">微信快速登陆</tui-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:''
			}
		},
		methods: {
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
					  that.$http.getLogin({js_code:code}).then(res=>{
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

</style>

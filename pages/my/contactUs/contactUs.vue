<template>
	<div class="phone">
		咨询商品、订单问题请拨打 <span class="num" @click="makePhone">{{phoneNumber}}</span>。工作时间：8：00--17：00.
	</div>
</template>

<script>
	export default {
		data(){
			return {
				phoneNumber:'010-69159408'
			}
		},
		methods:{
			makePhone(){
				wx.makePhoneCall({
				  phoneNumber: this.phoneNumber //仅为示例，并非真实的电话号码
				})
			}
		}
	}
</script>

<style scoped>
	page{
		background: #fff;
	}
	.phone{
		padding: 20rpx;
		line-height: 1.5;
	}
	.num{
		color: #007AFF;
	}
</style>

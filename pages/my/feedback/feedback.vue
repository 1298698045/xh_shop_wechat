<template>
	<view class="container">
		<view class="title">标题</view>
		<input class="tui-input"  placeholder-class="phcolor" placeholder="请输入标题" v-model="subject"></input>
		<view class="title top64">问题描述</view>
		<view class="tui-cells">
			<textarea class="tui-textarea" placeholder="请输入问题描述" maxlength="500" placeholder-class="phcolor"
			 v-model="desc" />
			<view class="textarea-counter">{{descNum}}/500</view>
	    </view> 
	    <view class="title top64">联系电话</view>
	    <input class="tui-input"  placeholder-class="phcolor" placeholder="请输入手机号" v-model="telPhone" maxlength="11"></input>
	     <view class="tui-ptop">
			 <tui-button type="danger" shadow height="88rpx" shape="circle" @click="submit">提交反馈</tui-button>
	    </view>
	</view>

</template>

<script>
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		computed:{
			descNum:function(){
				return this.desc.length
			},
			userId(){
				return this.$store.state.userId;
			}
		},
		onLoad(options) {
			
		},
		data() {
			return {
				desc:"",
				email:"",
				subject:"",
				telPhone:""
			}
		},
		methods: {
			submit(){
				let rules = [{
					name: "subject",
					rule: ["required", "minLength:1", "maxLength:500"],
					msg: ["请输入标题", "问题描述必须1个或以上字符", "请输入正确标题"]
				},{
					name: "desc",
					rule: ["required", "minLength:8", "maxLength:500"],
					msg: ["请输入问题描述", "问题描述必须8个或以上字符", "问题描述不能超过500个字符"]
				}, {
					name: "telPhone",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}];
				let formData = {
					subject:this.subject,
					desc:this.desc,
					telPhone:this.telPhone
				}
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					// this.tui.request("/Home/AddFeedBack","POST",{
					// 	Name: this.email,
					// 	Subject: "问题反馈",
					// 	Email: this.email,
					// 	Message: this.desc
					// }).then((res)=>{
					// 	console.log(res)
					// 	if (res.code == 100) {
					// 		this.tui.toast('提交成功');
					// 		this.desc="";
					// 		this.email="";
					// 	} else {
					// 		this.tui.toast(res.message);
					// 	}
					// }).catch((res)=>{})
					let obj = {
						FeedbackTitle:this.subject,
						FeedbackContent:this.desc,
						ContactInfo:this.telPhone
					}
					let data = '';
					let url = '/AppSetting/AppSeeting/feedback?CustomerId='+this.userId
					for(var key in obj){
							data+=
								'\r\nContent-Disposition: form-data; name="'+key+'"' +
								'\r\n' +
								'\r\n'+obj[key]+
								'\r\n--XXX' 
					}
					data += '--';
					this.$http.feedbackSubmit(url,data).then(res=>{
						console.log(res)
						var that = this;
						if(res.state=='SUCCESS'){
							that.$message.toast({
								title:'提交成功',
								icon:'success',
								duration:2000,
								deltaTime:1,
								delta:1,
								success(){
									
								}
							})
						}
					})
				} else {
					this.tui.toast(checkRes)
				}
			}
		}
	}
</script>

<style>
page {
  background: #fff;
}

.container {
  background-color: #fff;
  margin-top: 22rpx;
  padding: 30rpx;
  box-sizing: border-box;
  padding-bottom: 162rpx
}

.title {
  font-size: 30rpx;
  color: #666;
  padding-bottom: 32rpx;
}

.tui-cells {
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  height: 280rpx;
  box-sizing: border-box;
  padding: 20rpx 20rpx 0 20rpx;
}

.tui-textarea {
  height: 210rpx;
  width: 100%;
  color: #666;
  font-size: 28rpx;
}

.pholder {
  color: #ccc;
}

.textarea-counter {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  height: 40rpx;
  line-height: 40rpx;
  padding-top: 4rpx;
}

.top64 {
  margin-top: 64rpx;
}

.tui-input {
  font-size: 30rpx;
  height: 88rpx;
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  padding: 0 25rpx;
  box-sizing: border-box;
}
.tui-ptop{
	padding-top: 80rpx;
}

</style>

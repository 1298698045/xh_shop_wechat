<template>
	<view class="wrap">
		<div class="pannel">
			<h3 class="title">增值税电子普通发票</h3>
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
							单位
						</span>
					</div>
					<div class="box">
						<span class="label">
							抬头名称
						</span>
						<span class="val">
							北京XXX有限公司
						</span>
					</div>
					<div class="box">
						<span class="label">
							公司税号
						</span>
						<span class="val">
							9123189023012839123
						</span>
					</div>
					<div class="box">
						<span class="label">
							开票金额
						</span>
						<span class="val">
							200.00
						</span>
					</div>
					<div class="box">
						<span class="label">
							开票时间
						</span>
						<span class="val">
							2021-07-13 12:12:00
						</span>
					</div>
					<div class="box">
						<span class="label">
							申请时间
						</span>
						<span class="val">
							2021-07-13 12:12:00
						</span>
					</div>
				</div>
				<div class="right"></div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.wrap .pannel{
		width: 100%;
		height: auto;
		border-radius: 20rpx;
		background: #fff;
		margin: 20px 0;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333;
	}
	.wrap .pannel .title{
		text-align: center;
		font-size: 28rpx;
		color: #333;
	}
	.wrap .pannel .box{
		padding: 10rpx 0;
	}
	.wrap .pannel .box .label{
		color: #999;
	}
	.wrap .pannel .box .val{
		font-weight: bold;
		margin-left: 20rpx;
	}
</style>

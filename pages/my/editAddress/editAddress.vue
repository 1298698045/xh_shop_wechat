<template>
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" v-model="setRowData.name" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" v-model="setRowData.phone" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 type="text" />
				</view>
			</tui-list-cell>
			<picker :value="value" mode="multiSelector" @change="picker" @columnchange="columnPicker" :range="multiArray">
				<tui-list-cell :arrow="true" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
						<input placeholder-class="tui-phcolor" class="tui-input tui-pr__30" disabled name="city" placeholder="请选择城市" maxlength="50"
						 type="text" v-model="text"/>
					</view>
				</tui-list-cell>
			</picker>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input placeholder-class="tui-phcolor" v-model="setRowData.address" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50"
					 type="text" />
				</view>
			</tui-list-cell>
		<!-- 	<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text v-for="(item,index) in lists" :key="index" @click="handleTab(index)" class="tui-label-item" :class="{'tui-label-active':idx==index}">{{item}}</text>
					</view>
				</view>
			</tui-list-cell> -->

			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch :checked='isDefault==0?false:true' color="#19be6b" class="tui-switch-small" @change="changeSettingDefault" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<tui-button shadow type="danger" height="88rpx" shape="circle" @click="handleSaveAddress">保存收货地址</tui-button>
			</view>
			<view class="tui-del" v-if="false">
				<tui-button shadow type="gray" height="88rpx" shape="circle">删除收货地址</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	const cityData = require('@/utils/picker.city.min.js')
	export default {
		data() {
			return {
				lists: ["公司", "家", "学校", "其他"],
				selectList: cityData,
				multiArray: [], //picker数据
				value: [0, 0, 0],
				text: "",
				address:"",
				city:"",
				setRowData:{
					idx:1,
					name:"",
					city:"",
					address:"",
					phone:"",
					province:''
				},
				idx:1,
				listData:[],
				id:0,
				isDefault:0
			}
		},
		computed:{
			userId(){
				return this.$store.state.userId;
			}
		},
		onLoad(options) {
			this.multiArray = [
				this.toArr(this.selectList),
				this.toArr(this.selectList[0].children),
				this.toArr(this.selectList[0].children[0].children)
			]
			// let addressList = JSON.parse(wx.getStorageSync('addressList'));
			// this.listData = this.listData.concat(addressList)
			if(options.params){
				let paramsData = JSON.parse(options.params);
				console.log('paramsData',paramsData)
				this.id = paramsData.id;
				this.setRowData.name = paramsData.contactName;
				this.setRowData.phone = paramsData.phoneNumber;
				this.setRowData.address = paramsData.address1;
				this.setRowData.city = paramsData.city;
				this.isDefault = paramsData.isDefault;
				this.text = paramsData.city;
				this.setRowData.province = paramsData.stateProvince; // 省份
				let arr = paramsData.city.split(' ');
				console.log(this.multiArray[0],this.selectList,arr[0])
				let provice = this.multiArray[0].findIndex((item)=>item==arr[0]);
				let city = this.multiArray[1].findIndex((item)=>item==arr[1]);
				let district = this.multiArray[2].findIndex((item)=>item==arr[2]);
				this.value = [provice,city,district];
				console.log(this.value,'===')
			}
		},
		methods: {
			picker: function(e) {
				let value = e.detail.value;
				console.log('value:',value)
				if (this.selectList.length > 0) {
					let provice = this.selectList[value[0]].text
					let city = this.selectList[value[0]].children[value[1]].text
					let district = this.selectList[value[0]].children[value[1]].children[value[2]].text
					// this.selectList[value[0]].children[value[1]].children[value[2]].value
					this.text = provice + " " + city + " " + district;
					this.setRowData.city = this.text;
					this.setRowData.province = provice;
				}
			},
			changeSettingDefault(e){
				console.log(e);
				let val = e.mp.detail.value;
				if(val){
					this.isDefault = 1;
				}else {
					this.isDefault = 0;
				}
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].text);
				}
				return arr;
			},
			columnPicker: function(e) {
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value].children),
						this.toArr(this.selectList[value].children[0].children)
					];
					this.value = [value, 0, 0]
				} else if (column === 1) {
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						this.toArr(this.selectList[this.value[0]].children[value].children)
					];
					this.value = [this.value[0], value, 0]
				}
			},
			handleTab(idx){
				this.idx = idx;
				this.setRowData.idx = idx;
			},
			handleSaveAddress(){
				let obj = {
					id:0,
					customerId:1,
					address:{
						email:this.setRowData.email,
						contactName:this.setRowData.name,
						city:this.setRowData.city,
						address1:this.setRowData.address,
						zipPostalCode:'',
						phoneNumber:this.setRowData.phone,
						stateProvince:this.setRowData.province
					}
				}
				obj = JSON.stringify(obj);
				if(this.setRowData.name == ''){
					this.tui.toast('请输入姓名');
					return false;
				}else if(this.setRowData.city == ''){
					this.tui.toast('请选择城市');
					return false;
				}else if(this.setRowData.address ==''){
					this.tui.toast('请输入地址');
					return false;
				}else if(this.setRowData.phone == ''){
					this.tui.toast('请输入手机号');
					return false;
				}else if(!/^1[34578]\d{9}$/.test(this.setRowData.phone)){
					this.tui.toast('请输入正确的手机号');
					return false;
				}
				else{
					this.$http.setAddress(
						{
							customerId:this.userId,
							id:this.id,
							contactName:this.setRowData.name,
							city:this.setRowData.city,
							address1:this.setRowData.address,
							phoneNumber:this.setRowData.phone,
							isDefault:this.isDefault,
							stateProvince:this.setRowData.province
						}
					).then(res=>{
						console.log(res);
						uni.navigateBack({
							delta:1
						})
					})
					// this.listData.push(this.setRowData);
					// let addressData = JSON.stringify(this.listData);
					// uni.setStorageSync('addressList',addressData);
					// console.log(this.setRowData,'---')
					// uni.navigateBack({
					// 	delta:1
					// })
				}
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
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
		flex-shrink: 0;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}
	.tui-pr__30{
		padding-right: 30rpx;
	}
	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.92);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx 30rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx 30rpx;
	}
</style>

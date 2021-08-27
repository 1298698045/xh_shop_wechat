import {https}  from './http.js';    // 引入刚刚封装好的https
    
class api{
	// 商品分类
    async getClassList(data) {
        const res = await https({
            method: "get", // 请求方式
            url: '/category/list', // 请求url
            data: data,// 参数
        })
        return res
    }
	// 商品列表
	async getShopList(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/Category/item/list', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 商品详情
	async getShopDetail(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/Category/item/detail', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 购物车
	async getShoppingCart(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/ShoppingCart/cart', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 地址新增
	async setAddress(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/Contact/customeraddess/add', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 地址列表
	async queryAddress(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/Contact/customeraddess/all', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 地址删除
	async deleteAddress(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/Contact/customeraddess/delete', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 单个订单
	async getSingleOrder(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/Order/detail', // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 我的-订单
	async getMyoder(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/order/all', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 加入购物车
	async setAddCart(data,obj){
		const res = await https({
			method:'post',
			url:'/ShoppingCart/addcartitem?customerId='+obj.customerId+'&productId='+obj.productId+'&quantity='+obj.quantity,
			data:data
		})
		return res;
	}
	// 改变购物车订单数量ShoppingCart/item/changequantity
	async changeQuantity(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/ShoppingCart/item/changequantity', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 获取购物车商品总数item/quantity
	async getCartNumTotal(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/ShoppingCart/item/quantity', // 请求url
			data: data,// 参数
		})
		return res
	}
	
	// 移除购物车商品ShoppingCart/remove
	async setRemoveCartShop(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/ShoppingCart/remove', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 生成订单Checkout/order/confirm
	async setGenerateorder(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/Checkout/order/confirm', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 登录
	async getLogin(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/account/wechat/login', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 首页商品
	async getQueryShops(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/Catalog/home/item/list', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 推荐商品Catalog/recommend/item/list
	async getRecommend(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/Catalog/recommend/item/list', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 生成订单/WechatPay/transaction/create
	async orderCreate(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/WechatPay/transaction/create', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 二维码页支付
	async qrCodeOrderCreate(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/WechatPay/transaction/directcreate', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 支付成功之后确认接口transaction/pay/status
	async paymentSubmit(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/WechatPay/transaction/pay/status', // 请求url
			data: data,// 参数
		})
		return res
	}
	// 获取自提地址/Customer/shopaddress/list
	async shopaddress(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/Customer/shopaddress/list', // 请求url
			data: data,// 参数
		})
		return res;
	}
	// 获取发票​/shopapi​/Contact​/invoicetitle​/list
	async getInvoices(data){
		const res = await https({
			method: "get", // 请求方式
			url: '/Inoivce/invoicetitle/list', // 请求url
			data: data,// 参数
		})
		return res;
	}
	// 发票编辑
	async invoiceEdit(data){
		const res = await https({
			method:"get",
			url:"/Inoivce/invoicetitle/edit",
			data: data,
		})
		return res;
	}
	// 确认收货/Order/delivery/confirm
	async confirmSign(data){
		const res = await https({
			method:"get",
			url:"/Order/delivery/confirm",
			data: data,
		})
		return res;
	}
	// 申请售后
	async refundSign(url,data){
		const res = await https({
			method:"post",
			url:url,
			header:{
				'content-type': 'multipart/form-data; boundary=XXX'
			},
			data: data,
		})
		return res;
	}
	// 售后列表/Order/ReturnRe/getReturnRequest
	async refundList(data){
		const res = await https({
			method:"get",
			url:"/Order/ReturnRe/getReturnRequest",
			data: data,
		})
		return res;
	}
	// 填写物流单号
	async orederNoSubmit(data){
		const res = await https({
			method:"get",
			url:"/Order/ReturnRe/submitReturnNumber",
			data: data,
		})
		return res;
	}
	//  在线反馈 feedback
	async feedbackSubmit(url,data){
		const res = await https({
			method:"post",
			url:url,
			header: {
				'content-type': 'multipart/form-data; boundary=XXX'
			},
			data: data,
		})
		return res;
	}
	// 获取运费shopapi/Checkout/order/getordershippingamount
	async getFreight(url,data){
		const res = await https({
			method:"post",
			url:url,
			header: {
				'content-type': 'multipart/form-data; boundary=XXX'
			},
			data: data,
		})
		return res;
	}
	// 购物商品登记信息 Customer/customeradd/person
	async registerInfo(url,data){
		const res = await https({
			method:"post",
			url:url,
			header: {
				'content-type': 'multipart/form-data; boundary=XXX'
			},
			data:data
		})
		return res;
	}
	// 扫码点击生成订单
	async qrCodeConfirm(url,data){
		
	}
	// /Order/verifyquantity 支付前确认库存数量
	async payConfirmQuantity(data){
		const res = await https({
			method:"get",
			url:"/Order/verifyquantity",
			data: data,
		})
		return res;
	}
	// 退单算运费/Order/isRefundShippingFee
	async refundShippingFee(data){
		const res = await https({
			method:"get",
			url:"/Order/isRefundShippingFee",
			data: data,
		})
		return res;
	}
	// 订单完成后申请发票
	// /shopapi/Order/orderApplyInvoice
	async orderApplyInvoice(data){
		const res = await https({
			method:"get",
			url:"/Order/orderApplyInvoice",
			data: data,
		})
		return res;
	}
	// /Order/getOrderInvoice
	async previewInvoice(data){
		const res = await https({
			method:"get",
			url:"/Order/getOrderInvoice",
			data: data,
		})
		return res;
	}
}

export default new api()
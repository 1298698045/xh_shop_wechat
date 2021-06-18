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
		    url: '/item/list', // 请求url
		    data: data,// 参数
		})
		return res
	}
	async getShopDetail(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: '/item/detail', // 请求url
		    data: data,// 参数
		})
		return res
	}
    // 下面可以接着写API接口集
    // 接口二
    // 接口三
    // ......
}

export default new api()
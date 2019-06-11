import axios from '@/server/public.js';

class orderFn{
	/*获取收货地址*/
	address(params){
		return axios.http({
			url:'/bwl/user/userAdddresssInfo',
			method:'post'
		},params)
	}
	// 添加修改收货地址
	addressManage(params){
		return axios.http({
			url:'/bwl/user/addressManage',
			method:'post'
		},params)
	}
	
	// 立即下单  单个订单
	immeOrder(params){
		return axios.http({
			url:'/bwl/order/createOrderImmediately',
			method:'post'
		},params)
	}
	
	// 购物车下单
	carOrder(params){
		return axios.http({
			url:'/bwl/order/createOrderByShoppingCart',
			method:'post'
		},params)
	}
	
	
	// 获取收益钱包余额
	getMoney(params){
		return axios.http({
			url:'/bwl/user/selectBalance',
			method:'post'
		},params)
	}
	// 确认下单
	confirmOrder(params){
		return axios.http({
			url:'/bwl/order/confirmOrder',
			method:'post'
		},params)
	}
	// 获取卡片明细
	getcardDetail(params){
		return axios.http({
			url:'/bwl/user/userVipWalletDetails',
			method:'post'
		},params)
	}
	// 订单支付
	orderPay(params){
		return axios.http({
			url:'/bwl/order/payOrder',
			method:'post'
		},params)
	}
	// 加入购物车、编辑购物车
	joinCar(params){
		return axios.http({
			url:'/bwl/order/editShoppingCart',
			method:'post'
		},params)
	}
	// 购物车列表
	carList(params){
		return axios.http({
			url:'/bwl/order/myShoppingCart',
			method:'post'
		},params)
	}
	// 购物车为你推荐
	carRecomm(params){
		return axios.http({
			url:'/bwl/goods/completeRecomm',
			method:'post'
		},params)
	}
	// 分类确认下单
	orderTypeComfirm(params){
		return axios.http({
			url:'/bwl/order/confirmPlaceAnOrder',
			method:'post'
		},params)
	}
	// 分类立即下单
	orderImmediate(params){
		return axios.http({
			url:'/bwl/order/specialPlaceAnOrder',
			method:'post'
		},params)
	}
	// 分类订单详情
	orderCategoryDetail(params){
		return axios.http({
			url:'/bwl/user/orderDetails',
			method:'post'
		},params)
	}
}

let order = new orderFn();
export default order;
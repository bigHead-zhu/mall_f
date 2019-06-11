import axios from '@/server/public.js';

class userFn{
    //定制发布列表
    customList(params) {
        return axios.http({
            url:"/bwl/user/customMadeList",
            method:"post"
        },params)
    }
    //产品钱包
    productWallet(params) {
        return axios.http({
            url:"/bwl/product/productCateegory",
            method:"post"
        },params)
    }
    //产品列表
    productList(params) {
        return axios.http({
            url:"/bwl/product/productList",
            method:"post"
        },params)
    }
    //产品钱包详情 
    productDetail(params) {
        return axios.http({
            url:"/bwl/product/productDetails",
            method:"post"
        },params)
    }
    //去发布
    toissue(params) {
        return axios.http({
            url:"/bwl/user/userCustomMade",
            method:"post"
        },params)
    }
    //私人定制详情
    issueDetail(params) {
        return axios.http({
            url:"/bwl/user/oneCustomMade",
            method:"post"
        },params)
    }
    //订单列表
    orderList(params) {
		return axios.http({
			url:'/bwl/user/orderListWhole',
			method:'post'
		},params)
    }
    //订单详情
    orderDetails(params) {
		return axios.http({
			url:'/bwl/user/orderDetails',
			method:'post'
		},params)
    }
    //收益钱包明细  
    IncomeDetails(params) {
		return axios.http({
			url:'/bwl/user/userIncomeDetails',
			method:'post'
		},params)
    }
    //vip钱包明细  
    IncomeVIP(params) {
		return axios.http({
			url:'/bwl/user/vipWalletDetails',
			method:'post'
		},params)
    }
    //数字钱包 优惠券
    numberWallet(params) {
		return axios.http({
			url:'/bwl/user/myCouponList',
			method:'post'
		},params)
    }
    //我的推广 
    extendlist(params) {
		return axios.http({
			url:'/bwl/user/recoUserAndMerchant',
			method:'post'
		},params)
    }
	// vip钱包
	getBag(params){
		return axios.http({
			url:'/bwl/user/userVipWalletDetails',
			method:'post'
		},params)
	}
	// 取消订单
	cancelOrder(params){
		return axios.http({
			url:'/bwl/user/cancelOrder',
			method:'post'
		},params)	
	}
	// 删除订单
	delOrder(params){
		return axios.http({
			url:'/bwl/user/deleteOrder',
			method:'post'
		},params)	
	}
	// 确认收货
	confirmOrder(params){
		return axios.http({
			url:'/bwl/user/confirmReceipt',
			method:'post'
		},params)	
	}
	// 提醒发货
	delivery(params){
		return axios.http({
			url:'/bwl/user/delivery',
			method:'post'
		},params)	
	}
}

let user = new userFn();
export default user;
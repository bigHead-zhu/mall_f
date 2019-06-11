import axios from '@/server/public.js';

class settledFn{
	/*商家登录*/
	settlLogin(params){
		return axios.http({
			url:'/bwl/merchant/mallLogin',
			method:'post'
		},params)
	}
	// 身份证上传
	uploadImg(params){
		return axios.http({
			url:'/bwl/upload/uploadImgs',
			method:'post'
		},params)
	}
	// 获取入驻类别
	settlType(params){
		return axios.http({
			url:'/bwl/merchant/categoryList',
			method:'post'
		},params)
	}
	
	// 商家入驻
	seetlRegister(params){
		return axios.http({
			url:'/bwl/merchant/mallRegister',
			method:'post'
		},params)
	}
	// 企业名录
	sentence(params){
		return axios.http({
			url:'/bwl/merchant/enterpriseEden',
			method:'post'
		},params)
	}
	// 企业服务
	comService(params){
		return axios.http({
			url:'/bwl/merchant/enterpriseService',
			method:'post'
		},params)
	}
	// 资金明细
	moneyDetail(params){
		return axios.http({
			url:'/bwl/merchant/amountDetails',
			method:'post'
		},params)
	}
}

let settled = new settledFn();
export default settled;
import axios from '@/server/public.js';

class shareF {
	// 用户分享
	share(params){
		return axios.http({
			url:'/bwl/upload/userShareUrl',
			method:'post'
		},params)
	}
}
 let share = new shareF();
 export default share;
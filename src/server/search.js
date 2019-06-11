import axios from '@/server/public.js';
class searchFn {
	/*
	*������Ʒ
	*/
	searchGoods(params){
		return axios.http({
			url:'/bwl/search/goodsSearch',
			method:'post'
		},params)
	}
	/*
	*��������
	*/
   searchShops(params){
	   return axios.http({
		   url:'/bwl/search/merchantSearch',
		   method:'post'
	   },params)
   }
   /*
   *����ס��
   */
   searchHotel(params){
	   return axios.http({
	   		   url:'/bwl/hotel/hotelSearch',
	   		   method:'post'
	   },params)
   }
   /*
   *��ʷ����
   */
  searchHistory(params){
	  return axios.http({
		  url:'/bwl/search/userHistorySearch',
		  method:'post'
	  },params)
  }
  /* ϵͳ���ѹؼ��� */
  hotCode(params){
	return axios.http({
		url:'/bwl/search/sysHotSearch',
		method:'post'
	},params)
  }
  /**
   *�û�Ϊ���Ƽ� 
   */
  forYourCode(params){
	  return axios.http({
		  url:'/bwl/search/recommendForUser',
		  method:'post'
	  },params)
  }
  /*��ҳ�������� Ϊ���Ƽ�*/
  indexAll(params){
	  return axios.http({
		  url:'/bwl/home/home',
		  method:'post'
	  },params)
  }
  /*��Ʒ�Ƽ�*/
  topGoods(params){
	  return axios.http({
		  url:'/bwl/home/modularRec',
		  method:'post'
	  },params)
  }
  // ����ʳ��
  searchFood(params){
  	   return axios.http({
  	   		   url:'/bwl/catering/cateringSearch',
  	   		   method:'post'
  	   },params)
  }
  // ��������
   searchTour(params){
  	   return axios.http({
  	   		   url:'/bwl/tourism/tourismSearch',
  	   		   method:'post'
  	   },params)
  }
  
  // ��Ӱ����
   searchFilm(params){
  	   return axios.http({
  	   		   url:'/bwl/film/filmSearch',
  	   		   method:'post'
  	   },params)
  }
}
 let search = new searchFn();
 export default search;
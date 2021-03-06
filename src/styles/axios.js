// import Vue from 'vue'
// 
// 
// import axios from 'axios'
// 
// Vue.prototype.$http = axios
 /*
 * axios配置管理
 */

import Vue from 'vue'
import axios from 'axios';
import router from '../router'
const qs = require('qs');//axios自带qs插件
import {transCode} from '../plugins/code.js'
import vuex from '../store/state.js'
const vm = new Vue();

//--------------------------------------------全局设置-------------------------------

// axios.defaults.baseURL = 'http://192.168.2.105:8080'; //配置接口基础地址
// axios.defaults.baseURL = 'http://m252t77964.wicp.vip:20211';
axios.defaults.baseURL = 'http://web.lhds.vip'; //配置接口基础地址
axios.defaults.timeout = 50000; //响应超时时间

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';


// axios.defaults.withCredentials = true; //允许携带cookie,实现跨域登录	

//-----------------在发送数据之前进行数据转换 , get不会转换,因为get走的是 parmas属性----------------------

axios.defaults.transformRequest = (_data) => { //第一个参数_data是接收过来的数据
	// if(typeof(_data) == 'object'){
	// 		let formData = new FormData(); //使用formData方式发送表单 否则程序接收不到表单变量（formData可以实现文件的异步上传）
	// 	
	// 		for(let item in _data) { //for in 遍历数据进行转换
	// 	
	// 			formData.append(item, _data[item]);
	// 	
	// 		}			
	// 		console.log('-->发送了数据:', _data);
	// 	
	// 		return formData;
	// }else{
	// 	return _data;
	// }
	
		let data = JSON.stringify(_data);
		console.log('-->发送了数据:', data);
		return data;
	
};


　	let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
	let cancelToken = axios.CancelToken;
	 
	let Cancel;
	
	let removePending = (url) => {

		for(let i in pending){
			if(pending[i].url == axios.defaults.baseURL+url) { //在当前请求在数组中存在时执行取消函数
				pending[i].f.cancel(); //执行取消操作
			}
		}
	}
			
	let delPending = (url) => {
		for(let i in pending){
			if(pending[i].url == axios.defaults.baseURL+url) { //在当前请求在数组中存在时删除
				pending.splice(i, 1);
			}
		}
		
	}


//--------------------添加一个请求拦截器,每次请求都会拦截一次,但是尽量使用全局设置,方便每次使用不同的设置--------------

axios.interceptors.request.use(
	
	_config => { //在请求发出之前对配置进行一些操作

		let config = _config;
		  removePending(config.url);
		    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
			
			config.cancelToken = new cancelToken((c) => {
				pending.push({
				    url: axios.defaults.baseURL+config.url,
				    f:c
				});
			});

		if(config.hasToken){ //是否携带token
			if(sessionStorage.token){//session如果有token
				config.headers = Object.assign(config.headers,{'token':sessionStorage.token});
			}
		}
		//如果想每次请求的时候更改配置, 在这里增加config配置项
		// config.headers.token = 'RtakHgn04eKSsFCr1+RvaN+miAV/vYtG7nwtQhJJpem8eNlFRsTrnNpPXbxRLNhrXJholRU+GQd+177S0DRWhVtnPR4SanNfP1XPV9yuoX9VLLCTnunB+am1bA/UL8DB';
		
		
		console.log('-->请求了URL(' + _config.method + '):', _config.baseURL + _config.url);
	
		return config;

	},
	
	_err => {
		console.log('请求拦截器报错');
	}
	
);

//------------------------添加一个响应拦截器----------------------
			
axios.interceptors.response.use(

	_res => { //在这里对返回的数据进行处理

		setTimeout(() => {
			let ss = _res.config.url.split(axios.defaults.baseURL);
			
			delPending(ss[ss.length-1]);
			
		}, 2000);

			
		console.log('<--返回了数据', _res);
		
		if(_res.data.code!==1){//请求不成功，报错
			if(_res.data.code ==20001){ //用户未登录
				sessionStorage.clear();
				vuex.showBar = false;
				router.push({path:'/login'});
			}else{
				let msg = transCode(_res.data.code);
				vuex.errorText.text = msg; 
				vuex.snackbar = true;
			}

		}

		return _res.data;

	},
	_err => { //处理错误
	    // let urls = _err.message.split(' ')[0];
		
		let urls =_err.config.url.split(axios.defaults.baseURL);
		
		setTimeout(() => {
				  
			delPending(urls[urls.length-1])
			
		}, 2000);

		
		console.log('>>>>>>发生了ajax错误');

		console.log('-------------------------------------------');

		if(_err.response) { //请求已经发出，但是服务器响应返回的状态码不在2xx的范围内		
			console.log('status:', _err.response.status);

			console.log('statusText:', _err.response.statusText);

		} else { //一些错误是在设置请求的时候触发		   
			console.log('设置的时候触发了错误');
		}

		console.log('url:', _err.config.url);

		console.log('method:', _err.config.method);

		console.log('data:', _err.config.data);

		console.log('headers:', _err.config.headers);

		console.log('-------------------------------------------');

		return _err;
	}
);

//get请求
export const getTestData = (url = '', data = {}, fn, config = {}, errorCallBack) => {
	axios.get(url, data, config).then(response => {
		fn && fn(response);
	}).catch(error => {
		vuex.showOverLay = false;
		errorCallBack && errorCallBack(error);
		console.log('!!!getTestData发生了错误!!!：' + error);
	});
}

/**
 * 异步函数获取axios中的数据
 */
export const getAsyncAjaxData = (url = '', data = {}, errorCallBack) => {
	return new Promise(resolve => {
		axios.post(url, data).then(response => {
			resolve(response);
		}).catch(error => {
			errorCallBack && errorCallBack(error);
			console.log('!!!async发生了错误!!!：' + error);
		});
	});
}

/**
 * axios发起单个请求
 * 
 * @param {STRING} url 请求数据的路径
 * @param {JSON} data 需要发送的数据
 * @param {Function} fn 数据响应后的回调函数
 * @param {Object} config 修改默认配置
 */
export const getAjaxData = (url = '', data = {}, fn, config = {}, errorCallBack) => {
	axios.post(url, data, config).then(response => {
		fn && fn(response);
	}).catch(error => {
		vuex.showOverLay = false;
		errorCallBack && errorCallBack(error);
		console.log('!!!single发生了错误!!!：' + error);
	});
}

/**
 * axios同时发起多个请求
 * 
 * @param {Array} paramArr 多个请求参数的数组
 * @param {Function(返回的数据1,返回的数据2...)} fn 数据响应后的回调函数
 */
export const getAllAjaxData = (paramArr = [], fn) => {
	let newArr = [];
	paramArr.forEach(item => {
		newArr.push(axios.post(item.url || '',item.data || {}));
	});
	axios.all(newArr).then(axios.spread(fn)).catch(error => console.log('发生了错误：'+error));
}
/**
 * axios同时发起多个请求 跟上述不同的地方在于 这里的回调不拆开 直接返回一组回调
 * 在响应中判断$ax.getSimult(arr, (resArr) =>{
				let length = resArr.length;
				let len = 0;
				let errArr = [];
				resArr.forEach((res,i) =>{
					if(res.code == 0){
						len++;
					}else{
						errArr.push(res.msg);
					}
				});
				if(len == length){
					this.$Message.success('修改成功！');
 * 
 * @param {Array} paramArr 多个请求参数的数组
 * @param {Function(返回的数据1,返回的数据2...)} fn 数据响应后的回调函数
 */
export const getSimult = (paramArr = [], fn) => {
	let newArr = [];
	paramArr.forEach(item => {
		newArr.push(axios.post(item.url || '',item.data || {}));
	});
	axios.all(newArr).then(fn).catch(error => console.log('发生了错误：'+error));
}
//使用qs插件序列化数据
export const QSStringify = (params={}) => {
	let str = '{'+qs.stringify(params, {encoder: function(str){
		if(typeof(str) === 'string' && typeof(str) !== 'number'){
			return '"'+ str +'"'
		}else{
			return str
		}
	}})+'}';
	let jsonStr = str.replace(/\=/g, ':').replace(/\&/g, ',');
  	let jsonData = JSON.parse(jsonStr);
  	return jsonData;
}

//使用qs插件的Ajax提交数据
export const getAjaxQsStringify = (url = '', data = {}, fn, config = {}, errorCallBack) => {
	axios.post(url, QSStringify(data), config).then(response => {
		fn && fn(response);
	}).catch(error => {
		errorCallBack && errorCallBack(error);
		console.log('!!!发生了错误!!!：' + error);
	});
}
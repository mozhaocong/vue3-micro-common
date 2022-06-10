import axios from 'axios'
import { setConfigHeaders } from '@/http/request'
import { resUestCode } from '@/http/response'
import { isString } from '@/utils'
import { messageError } from '@/utils'
// import qs from 'qs'

export function axiosInit() {
	//post请求头
	axios.defaults.baseURL = '' //正式
	if (!axios.defaults.headers) {
		axios.defaults.headers = {}
	}
	// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

	//允许跨域携带cookie信息
	// axios.defaults.withCredentials = true
	//设置超时
	axios.defaults.timeout = 10000

	axios.interceptors.request.use(
		(config) => {
			if ((config as any)['Content-Type']) {
				const ContentType = (config as any)['Content-Type']
				if (ContentType.includes('application/x-www-form-urlencoded')) {
					if (!isString(config.data)) {
						let data = ''
						for (const item in config.data) {
							data += item + '=' + config.data[item] + '&'
						}
						config.data = data
					}
				}
			}
			config.headers = {
				...setConfigHeaders(),
				...config.headers,
				// 'Content-Type': 'Content-Type: application/x-www-form-urlencoded',
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	axios.interceptors.response.use(
		(response) => {
			if (response.status == 200) {
				resUestCode(response.data)
				return Promise.resolve(response)
			} else {
				return Promise.reject(response)
			}
		},
		(error) => {
			messageError('接口请求错误')
			console.log(error)
		}
	)
}

/**
 * @param {String} url
 * @param {Object} data
 * @returns Promise
 */
export function post(url: string, data: any, options = {}) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: data,
			...options,
		})
			.then((res: any) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function get(url: string, data: any, options = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params: data,
			...options,
		})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function methodType(url: string, method: string, data: any, options = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			method: method as 'get',
			url,
			[method === 'get' ? 'data' : 'params']: data,
			...options,
		})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

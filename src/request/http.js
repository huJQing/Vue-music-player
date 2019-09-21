/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import axios from 'axios'
import QS from 'qs'

//请求超时时间
axios.defaults.timeout = 10000

//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//允许携带cookie
axios.defaults.withCredentials = true



/**
 * get方法
 * @param{String} url [请求的url]
 * @param{Object} params [请求时携带的参数]
 */

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * get方法
 * @param{String} url [请求的url]
 * @param{Object} params [请求时携带的参数]
 */

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
  })
}
import type {
  HttpError,
  HttpRequestAbstract,
  HttpRequestConfig,
  HttpResponse,
} from 'luch-request'
import { currentRoute, LOGIN_PATH } from '@/router'
import { getToken } from '@/utils/auth'
import storage from '@/utils/storage'
import { Toast } from '../modals'
import { showMessage } from './status'

// 防止重复提交
const repeatSubmit = (config: HttpRequestConfig) => {
  const requestObj = {
    url: config.url,
    data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
    time: new Date().getTime(),
  }
  const sessionObj = storage.getJSON('sessionObj')
  if (!sessionObj) {
    storage.setJSON('sessionObj', requestObj)
  }
  else {
    const s_url = sessionObj.url // 请求地址
    const s_data = sessionObj.data // 请求数据
    const s_time = sessionObj.time // 请求时间
    const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
    if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
      const message = '数据正在处理，请勿重复提交'
      console.warn(`[${s_url}]: ${message}`)
      return Promise.reject(new Error(message))
    }
    else {
      storage.setJSON('sessionObj', requestObj)
    }
  }
}

function requestInterceptors(http: HttpRequestAbstract) {
  /**
   * 请求拦截
   * @param {object} http
   */
  http.interceptors.request.use(
    (config: HttpRequestConfig) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {}
      // 自定义参数
      const custom = config?.custom

      // 是否需要设置 token
      const isToken = custom?.auth === false
      if (getToken() && !isToken && config.header) {
        // token设置
        config.header.Authorization = getToken()
      }

      // 是否显示 loading
      if (custom?.loading) {
        uni.showLoading({
          title: '加载中',
          mask: true,
        })
      }

      // 是否需要防止数据重复提交
      const isRepeatSubmit = custom?.repeatSubmit === false
      if (!isRepeatSubmit && (config.method === 'POST' || config.method === 'UPLOAD')) {
        repeatSubmit(config)
      }
      return config
    },
    (config: any) => // 可使用async await 做异步操作
      Promise.reject(config),
  )
}
function responseInterceptors(http: HttpRequestAbstract) {
  /**
   * 响应拦截
   * @param {object} http
   */
  http.interceptors.response.use((response: HttpResponse) => {
    /* 对响应成功做点什么 可使用async await 做异步操作 */
    const data = response.data
    // 配置参数
    const config = response.config
    // 自定义参数
    const custom = config?.custom

    // 登录状态失效，重新登录
    if (data.code === 401) {
      uni.redirectTo({
        url: `${LOGIN_PATH}?redirect=${encodeURIComponent(currentRoute())}`,
      })
      return Promise.reject(new Error(data.message))
    }

    // 隐藏loading
    if (custom?.loading) {
      uni.hideLoading()
    }

    // 请求成功则返回结果
    if (data.code === 200) {
      return response || {}
    }

    // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
    if (custom?.toast !== false) {
      Toast(data.message)
    }

    // 请求失败则抛出错误
    return Promise.reject(data)
  }, (response: HttpError) => {
    // 自定义参数
    const custom = response.config?.custom

    // 隐藏loading
    if (custom?.loading !== false) {
      uni.hideLoading()
    }

    // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
    if (custom?.toast !== false) {
      const message = response.statusCode ? showMessage(response.statusCode) : '网络连接异常,请稍后再试!'
      Toast(message)
    }

    return Promise.reject(response)
  })
}

export { requestInterceptors, responseInterceptors }

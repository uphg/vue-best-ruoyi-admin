import { saveAs } from 'file-saver'
import { createLoading } from '@/hooks/use-loading'
import { useNaiveDialog, useNaiveMessage, useNaiveNotification } from '@/hooks/use-message'
// import useUserStore from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import { blobValidate, tansParams } from '@/utils/ruoyi'
import { session } from '@/utils/storage'
import { Http } from './http-lite'

const errorCode = {
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  default: '系统未知错误，请反馈给管理员',
}

let downloadLoadingInstance
export const isRelogin = { show: false }

// http.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
export const http = new Http({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
})

export const request = http.instance

// 请求拦截器
http.instance.interceptors.request.use((config) => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers.Authorization = `Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = `${config.url}?${tansParams(config.params)}`
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime(),
    }
    const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
    const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
    if (requestSize >= limitSize) {
      console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
      return config
    }
    const sessionObj = session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url // 请求地址
      const s_data = sessionObj.data // 请求数据
      const s_time = sessionObj.time // 请求时间
      const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${s_url}]: ${message}`)
        return Promise.reject(new Error(message))
      } else {
        session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
http.instance.interceptors.response.use((res) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode.default
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true
      const dialog = useNaiveDialog()
      dialog.warning({
        title: '系统提示',
        content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
        positiveText: '重新登录',
        negativeText: '取消',
        onPositiveClick: () => {
          isRelogin.show = false
          // useUserStore().logOut().then(() => {
          //   location.href = '/index'
          // })
        },
        onNegativeClick: () => {
          isRelogin.show = false
        },
      })
    }
    return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
  } else if (code === 500) {
    const message = useNaiveMessage()
    message.error(msg)
    return Promise.reject(new Error(msg))
  } else if (code === 601) {
    const message = useNaiveMessage()
    message.warning(msg)
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    const notification = useNaiveNotification()
    notification.error({
      title: '错误',
      content: msg,
      duration: 4500,
    })
    return Promise.reject(new Error('error'))
  } else {
    return Promise.resolve(res.data)
  }
}, (error) => {
  console.log(`err${error}`)
  let { message: errorMessage } = error
  if (errorMessage === 'Network Error') {
    errorMessage = '后端接口连接异常'
  } else if (errorMessage.includes('timeout')) {
    errorMessage = '系统接口请求超时'
  } else if (errorMessage.includes('Request failed with status code')) {
    errorMessage = `系统接口${errorMessage.substr(errorMessage.length - 3)}异常`
  }
  const message = useNaiveMessage()
  message.error(errorMessage, { duration: 5000 })
  return Promise.reject(error)
})

// 通用下载方法
export function download(url, params, filename, config) {
  downloadLoadingInstance = createLoading({ content: '正在下载数据，请稍候' })
  return http.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    ...config,
  }).then(async (data) => {
    const isBlob = blobValidate(data)
    if (isBlob) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text()
      const rspObj = JSON.parse(resText)
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default
      const message = useNaiveMessage()
      message.error(errMsg)
    }
    downloadLoadingInstance.close()
  }).catch((r) => {
    console.error(r)
    const message = useNaiveMessage()
    message.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close()
  })
}

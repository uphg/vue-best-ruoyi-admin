/**
 * @typedef {string | number | null | boolean | JSONValue[] | {[key: string]: JSONValue}} JSONValue
 */

/**
 * @typedef {object} HTTPConfig
 * @property {string} [baseURL]
 * @property {number} [timeout]
 * @property {Record<string, string>} [headers]
 * @property {Record<string, any>} [params]
 * @property {'json' | 'text' | 'blob' | 'arrayBuffer'} [responseType]
 */

/**
 * @template T
 * @typedef {object} Interceptor
 * @property {function(T): T | Promise<T>} [onFulfilled]
 * @property {function(any): any} [onRejected]
 */

/**
 * @typedef {object} Interceptors
 * @property {Interceptor<HTTPConfig>} [request]
 * @property {Interceptor<HTTPResponse>} [response]
 */

/**
 * @template T
 * @typedef {object} HTTPResponse
 * @property {T} data
 * @property {number} status
 * @property {string} statusText
 * @property {Record<string, string>} headers
 * @property {HTTPConfig} config
 */

/**
 * @typedef {object} HTTPError
 * @property {string} message
 * @property {number} [status]
 * @property {string} [statusText]
 * @property {HTTPResponse} [response]
 * @property {HTTPConfig} config
 */

/**
 * @typedef {object} HTTPClientOptions
 * @property {string} [baseURL]
 * @property {number} [timeout]
 * @property {Record<string, string>} [headers]
 */

export class HTTPClient {
  /**
   * @param {HTTPClientOptions} options
   * @param {Interceptors} interceptors
   */
  constructor(
    { baseURL = '', timeout = 2500, headers = {} } = {},
    interceptors = {},
  ) {
    /** @type {string} */
    this.baseURL = baseURL
    /** @type {number} */
    this.timeout = timeout
    /** @type {Record<string, string>} */
    this.defaultHeaders = headers
    /** @type {Interceptors} */
    this.interceptors = interceptors
  }

  /**
   * @param {string} url
   * @param {Record<string, any>} [params]
   * @returns {string}
   */
  buildURL(url, params) {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`
    if (!params) return fullURL

    const searchParams = new URLSearchParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, String(params[key]))
      }
    })

    const queryString = searchParams.toString()
    return queryString ? `${fullURL}?${queryString}` : fullURL
  }

  /**
   * @template T
   * @param {string} method
   * @param {string} url
   * @param {any} [data]
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async request(
    method,
    url,
    data,
    config = {},
  ) {
    // 合并配置
    /** @type {HTTPConfig} */
    const finalConfig = {
      ...config,
      headers: { ...this.defaultHeaders, ...config.headers },
      timeout: config.timeout || this.timeout,
    }

    // 请求拦截器
    if (this.interceptors.request?.onFulfilled) {
      try {
        Object.assign(finalConfig, await this.interceptors.request.onFulfilled(finalConfig))
      } catch (error) {
        if (this.interceptors.request?.onRejected) {
          return this.interceptors.request.onRejected(error)
        }
        throw error
      }
    }

    const fullURL = this.buildURL(url, config.params)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout)

    try {
      /** @type {RequestInit} */
      const fetchOptions = {
        method,
        headers: finalConfig.headers,
        signal: controller.signal,
      }

      if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        if (data instanceof FormData) {
          fetchOptions.body = data
        } else {
          fetchOptions.headers = {
            ...fetchOptions.headers,
            'Content-Type': 'application/json',
          }
          fetchOptions.body = JSON.stringify(data)
        }
      }

      const response = await fetch(fullURL, fetchOptions)
      clearTimeout(timeoutId)

      // 解析响应头
      /** @type {Record<string, string>} */
      const headers = {}
      response.headers.forEach((value, key) => {
        headers[key] = value
      })

      // 解析响应数据
      let responseData
      const responseType = finalConfig.responseType || 'json'

      switch (responseType) {
        case 'json':
          responseData = await response.json()
          break
        case 'text':
          responseData = await response.text()
          break
        case 'blob':
          responseData = await response.blob()
          break
        case 'arrayBuffer':
          responseData = await response.arrayBuffer()
          break
        default:
          responseData = await response.json()
      }

      /** @type {HTTPResponse<T>} */
      const httpResponse = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers,
        config: finalConfig,
      }

      // 检查响应状态
      if (!response.ok) {
        /** @type {HTTPError} */
        const error = {
          message: `HTTP Error: ${response.status} ${response.statusText}`,
          status: response.status,
          statusText: response.statusText,
          response: httpResponse,
          config: finalConfig,
        }
        throw error
      }

      // 响应拦截器
      if (this.interceptors.response?.onFulfilled) {
        try {
          return await this.interceptors.response.onFulfilled(httpResponse)
        } catch (error) {
          if (this.interceptors.response?.onRejected) {
            return this.interceptors.response.onRejected(error)
          }
          throw error
        }
      }

      return httpResponse
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        /** @type {HTTPError} */
        const timeoutError = {
          message: `Request timeout after ${finalConfig.timeout}ms`,
          config: finalConfig,
        }
        throw timeoutError
      }

      if (this.interceptors.response?.onRejected) {
        return this.interceptors.response.onRejected(error)
      }

      throw error
    }
  }

  /**
   * @template T
   * @param {string} url
   * @param {Record<string, any>} [params]
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async get(url, params, config) {
    return this.request('GET', url, undefined, { ...config, params })
  }

  /**
   * @template T
   * @param {string} url
   * @param {Record<string, JSONValue>} [data]
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async post(url, data, config) {
    return this.request('POST', url, data, config)
  }

  /**
   * @template T
   * @param {string} url
   * @param {Record<string, JSONValue>} [data]
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async put(url, data, config) {
    return this.request('PUT', url, data, config)
  }

  /**
   * @template T
   * @param {string} url
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async delete(url, config) {
    return this.request('DELETE', url, undefined, config)
  }

  /**
   * @template T
   * @param {string} url
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async head(url, config) {
    return this.request('HEAD', url, undefined, config)
  }

  /**
   * @template T
   * @param {string} url
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async options(url, config) {
    return this.request('OPTIONS', url, undefined, config)
  }

  /**
   * @template T
   * @param {string} url
   * @param {any} [data]
   * @param {HTTPConfig} [config]
   * @returns {Promise<HTTPResponse<T>>}
   */
  async patch(url, data, config) {
    return this.request('PATCH', url, data, config)
  }
}

export const http = new HTTPClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
}, {
  request: {
    onFulfilled: (config) => {
      // 添加认证 token
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      return config
    },
    onRejected: (error) => {
      console.error('Request error:', error)
      return Promise.reject(error)
    },
  },
  response: {
    onFulfilled: (response) => {
      // 处理全局响应
      return response
    },
    onRejected: (error) => {
      console.error('Response error:', error)
      return Promise.reject(error)
    },
  },
})

/**
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {import('axios').AxiosError} AxiosError
 */

/**
 * 任意 JSON 兼容值
 * @typedef {null|boolean|number|string|JSONValue[]|{[key:string]:JSONValue}} JSONValue
 */

/**
 * GET 请求专属配置：剔除与 GET 冲突的字段
 * @typedef {Omit<AxiosRequestConfig, 'params'|'url'|'method'>} GetConfig
 */

/**
 * POST 请求专属配置：剔除与 POST 冲突的字段
 * @typedef {Omit<AxiosRequestConfig, 'url'|'data'|'method'>} PostConfig
 */

/**
 * PATCH 请求专属配置：剔除与 PATCH 冲突的字段
 * @typedef {Omit<AxiosRequestConfig, 'url'|'data'>} PatchConfig
 */

/**
 * DELETE 请求专属配置：剔除与 DELETE 冲突的字段
 * @typedef {Omit<AxiosRequestConfig, 'params'>} DeleteConfig
 */

import axios from 'axios'

/**
 * 通用 HTTP 客户端封装
 */
export class Http {
  /**
   * @type {AxiosInstance}
   */
  instance

  /**
   * @param {string} baseURL 基础路径
   */
  constructor(options) {
    this.instance = axios.create(options)
  }

  /**
   * 发送 GET 请求
   * @template R
   * @param {string} url 请求地址
   * @param {Record<string,string>} [query] URL 查询参数
   * @param {GetConfig} [config] 其他 Axios 配置
   * @returns {Promise<import('axios').AxiosResponse<R>>}
   */
  get(url, query, config) {
    return this.instance.request({
      ...config,
      url,
      params: query,
      method: 'get',
    })
  }

  /**
   * 发送 POST 请求
   * @template R
   * @param {string} url 请求地址
   * @param {Record<string,JSONValue>} [data] 请求体
   * @param {PostConfig} [config] 其他 Axios 配置
   * @returns {Promise<import('axios').AxiosResponse<R>>}
   */
  post(url, data, config) {
    return this.instance.request({
      ...config,
      url,
      data,
      method: 'post',
    })
  }

  /**
   * 发送 PATCH 请求
   * @template R
   * @param {string} url 请求地址
   * @param {Record<string,JSONValue>} [data] 请求体
   * @param {PatchConfig} [config] 其他 Axios 配置
   * @returns {Promise<import('axios').AxiosResponse<R>>}
   */
  patch(url, data, config) {
    return this.instance.request({
      ...config,
      url,
      data,
      method: 'patch',
    })
  }

  /**
   * 发送 DELETE 请求
   * @template R
   * @param {string} url 请求地址
   * @param {Record<string,string>} [query] URL 查询参数
   * @param {DeleteConfig} [config] 其他 Axios 配置
   * @returns {Promise<import('axios').AxiosResponse<R>>}
   */
  delete(url, query, config) {
    return this.instance.request({
      ...config,
      url,
      params: query,
      method: 'delete',
    })
  }
}

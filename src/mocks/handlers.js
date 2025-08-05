// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { routeDate } from './common'

/**
 * @typedef {object} LoginRequest
 * @property {string} username - 用户名
 * @property {string} password - 密码
 */

/**
 * @typedef {object} UserData
 * @property {string} id - 用户ID
 * @property {string} firstName - 用户名
 * @property {string} lastName - 用户姓氏
 */

/**
 * @typedef {object} LoginResponse
 * @property {number} code - 响应码
 * @property {object} [data] - 响应数据
 * @property {string} [data.token] - 用户令牌
 * @property {string} [message] - 错误消息
 */

/**
 * @typedef {object} UserInfo
 * @property {string} id - 用户ID
 * @property {string} name - 用户名称
 * @property {string[]} rules - 用户权限规则
 * @property {string} email - 用户邮箱
 * @property {string} token - 用户令牌
 */

/**
 * MSW 请求处理器数组
 * 定义了所有模拟 API 的处理逻辑
 * @type {import('msw').RequestHandler[]}
 */
export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
  http.post('/api/login', ({ params }) => {
    const { username, password } = params
    return HttpResponse.json(username === 'admin' && password === '123456'
      ? { code: 200, data: { token: 'admin-token' } }
      : { code: 401, message: '账号或密码错误' })
  }),
  http.get('/api/route-data', () => {
    return HttpResponse.json(routeDate)
  }),
  http.get('/api/user-info', () => {
    return HttpResponse.json({
      id: '0',
      name: 'Jacker',
      rules: [],
      email: 'jacker@qq.com',
      token: 'alsdhfioasdf',
    })
  }),
]

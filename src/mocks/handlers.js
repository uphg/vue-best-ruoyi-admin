// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import captchaImage from '../../ruoyi-api/captcha-image.json'
import userInfoData from '../../ruoyi-api/get-info.json'
import routeData from '../../ruoyi-api/get-routers.json'
import loginData from '../../ruoyi-api/login.json'
import { routeDate } from './common'

export const handlers = [
  // 获取验证码
  http.get('/dev-api/captchaImage', () => {
    return HttpResponse.json(captchaImage)
  }),

  // 登录接口
  http.post('/dev-api/login', async ({ request }) => {
    const body = await request.json()
    const { username, password } = body

    if (username === 'admin' && password === 'admin123') {
      return HttpResponse.json(loginData)
    } else {
      return HttpResponse.json({
        msg: '用户不存在/密码错误',
        code: 500,
      })
    }
  }),

  // 获取用户信息
  http.get('/dev-api/getInfo', () => {
    return HttpResponse.json(userInfoData)
  }),

  // 获取路由
  http.get('/dev-api/getRouters', () => {
    return HttpResponse.json(routeData)
  }),

  // 保持原有的mock接口用于兼容性
  http.post('/api/login', ({ params }) => {
    const { username, password } = params
    return HttpResponse.json(username === 'admin' && password === '123456'
      ? { code: 200, data: { token: 'admin-token' } }
      : { code: 401, message: '账号或密码错误' })
  }),
  http.get('/api/route-data', () => HttpResponse.json(routeDate)),
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

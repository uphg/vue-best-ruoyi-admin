// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { routeDate } from './common'

export const handlers = [

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

  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]

import { http } from '@/utils/http-lite'

export function apiGetRouteData() {
  return http.get('/api/route-data')
}

export function apiGetUserInfo() {
  return http.get('/api/user-info')
}

export function apiLogin(data) {
  return http.post('/api/login', data)
}

import { http } from '@/utils/http'

// RuoYi 格式接口
export function apiGetRouteData() {
  return http.get('/dev-api/getRouters')
}

export function apiGetUserInfo() {
  return http.get('/dev-api/getInfo')
}

export function apiLogin(data) {
  return http.post('/dev-api/login', data)
}

export function apiGetCaptchaImage() {
  return http.get('/dev-api/captchaImage')
}

// 兼容性接口（保留旧的）
// export function apiGetRouteDataLegacy() {
//   return http.get('/api/route-data')
// }

// export function apiGetUserInfoLegacy() {
//   return http.get('/api/user-info')
// }

// export function apiLoginLegacy(data) {
//   return http.post('/api/login', data)
// }

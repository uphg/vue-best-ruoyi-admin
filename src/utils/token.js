const tokenKey = 'admin-token'

/**
 * 获取存储的 token
 * @returns {string|null} 返回存储的 token 或 null
 */
export function getToken() {
  return localStorage.getItem(tokenKey)
}

/**
 * 设置 token 到本地存储
 * @param {string} value - 要存储的 token 值
 * @returns {void}
 */
export function setToken(value) {
  localStorage.setItem(tokenKey, value)
}

/**
 * 从本地存储中移除 token
 * @returns {void}
 */
export function removeToken() {
  localStorage.removeItem(tokenKey)
}

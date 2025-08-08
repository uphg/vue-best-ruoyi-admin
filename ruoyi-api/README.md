ruoyi 页面接口请求顺序：

1. 获取验证码：/dev-api/captchaImage -> captcha-image.json
2. 登录接口：/dev-api/login -> login.json（当前项目方法对应为：apiLogin：src/api/user.js）
3. 获取用户信息：/dev-api/login -> login.json（当前项目方法对应为：apiGetUserInfo：src/api/user.js）
4. 获取路由：/dev-api/getRouters -> get-routers.json (当前项目方法对应：apiGetRouteData：src/api/user.js)

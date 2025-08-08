// 测试mock服务
import { http } from '@/utils/http-lite'

async function testMockServices() {
  console.log('测试RuoYi格式mock服务...')
  
  try {
    // 测试验证码接口
    const captchaResponse = await http.get('/dev-api/captchaImage')
    console.log('✅ 验证码接口正常:', captchaResponse)
    
    // 测试登录接口
    const loginResponse = await http.post('/dev-api/login', {
      username: 'admin',
      password: 'admin123'
    })
    console.log('✅ 登录接口正常:', loginResponse)
    
    // 测试获取用户信息
    const userInfoResponse = await http.get('/dev-api/getInfo')
    console.log('✅ 用户信息接口正常:', userInfoResponse)
    
    // 测试获取路由
    const routeResponse = await http.get('/dev-api/getRouters')
    console.log('✅ 路由接口正常:', routeResponse)
    
    console.log('🎉 所有RuoYi格式mock服务测试通过！')
  } catch (error) {
    console.error('❌ Mock服务测试失败:', error)
  }
}

// 在浏览器控制台运行测试
window.testMockServices = testMockServices
import { http } from '@/utils/http-lite'

const RequestPage = defineComponent(() => {
  onMounted(async () => {
    try {
      const response = await http.get('https://api.example.com/user')
      console.log('Fetched user data:', response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }

    getData()
  })

  /**
   * 获取数据函数
   */
  async function getData() {
    try {
      const response = await http.get('products.json')
      console.log(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  return () => (
    <div>
      <h2>请求测试</h2>
      <p>查看控制台输出</p>
      <button onClick={getData}>获取数据</button>
    </div>
  )
})

export default RequestPage

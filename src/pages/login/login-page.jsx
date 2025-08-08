import { NButton, NCard, NForm, NFormItem, NInput } from 'naive-ui'
import { apiLogin } from '@/api/user'
import { setToken } from '@/utils/auth'

const LoginPage = defineComponent({
  setup() {
    const loginForm = ref({ username: 'admin', password: '123456' })
    const formRef = ref(null)
    const loading = ref(false)
    const router = useRouter()

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    }

    function handleLogin() {
      formRef.value?.validate(async (errors) => {
        if (errors) return
        loading.value = true
        try {
          const response = await apiLogin(loginForm.value)
          setToken(response?.data.token)
          router.push('/home')
        } finally {
          loading.value = false
        }
      })
    }

    return () => (
      <div class="flex h-screen items-center justify-center">
        <NCard title="Login" class="w-96">
          <NForm ref={formRef} model={loginForm.value} rules={rules}>
            <NFormItem path="username" label="Username">
              <NInput
                v-model:value={loginForm.value.username}
                placeholder="Enter your username"
              />
            </NFormItem>
            <NFormItem path="password" label="Password">
              <NInput
                v-model:value={loginForm.value.password}
                type="password"
                placeholder="Enter your password"
              />
            </NFormItem>
            <NFormItem>
              <NButton
                class="w-full"
                type="primary"
                size="large"
                loading={loading.value}
                onClick={handleLogin}
              >
                登录
              </NButton>
            </NFormItem>
          </NForm>
        </NCard>
      </div>
    )
  },
})

export default LoginPage

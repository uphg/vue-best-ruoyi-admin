# 项目开发规范

## 技术栈

- **包管理**: pnpm
- **前端框架**: Vue 3 + JSX (Composition API)
- **构建工具**: Vite
- **样式方案**: UnoCSS (Tailwind CSS v4 预设)
- **组件库**: Naive UI + Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **网络请求**: Axios
- **开发语言**: JavaScript (JSX)
- **图标**: unplugin-icons + Lucide Icons

## 开发环境要求

- Node.js >= 18
- pnpm >= 8
- 编辑器推荐: VS Code

## 项目结构

```
src/
├── api/                    # API 接口
├── assets/                 # 静态资源
│   ├── icons/              # 本地图标
│   ├── images/             # 图片资源
│   └── styles/             # 样式文件
├── components/             # 组件
│   ├── features/           # 功能组件
│   ├── layout/             # 布局组件
│   └── ui/                 # UI 基础组件
├── constants/              # 常量定义
├── hooks/                  # 组合式函数
├── pages/                  # 页面组件
├── router/                 # 路由配置
├── stores/                 # 状态管理
├── types/                  # 类型定义
├── utils/                  # 工具函数
└── main.js                 # 应用入口
```

## 代码规范

### 命名规范

1. **文件命名**: 使用 `kebab-case` (短横线连接)
   - `home-page.jsx` - 页面组件
   - `use-data-table.jsx` - 组合式函数
   - `user-api.js` - API 接口文件

2. **组件命名**: 使用 `PascalCase`

   ```jsx
   const HomePage = () => <div>首页</div>
   ```

3. **函数命名**: 使用 `camelCase`

   ```js
   function getUserInfo() {}
   function useDataTable() {}
   ```

4. **变量和属性**: 使用 `camelCase`
   ```js
   const userName = 'admin'
   const isLoading = false
   ```

### 代码风格

1. **引号**: 使用单引号

   ```js
   const message = 'Hello World'
   ```

2. **分号**: 不使用分号（仅在必要时添加）

   ```js
   const count = 0
   const name = 'vue'
   ```

3. **缩进**: 2 个空格

4. **JSX 规范**:

   ```jsx
   // 函数式组件
   const App = () => <div>Vue 3.0</div>

   // 带 setup 的组件
   const App = defineComponent({
     setup() {
       const count = ref(0)
       return () => (
         <div onClick={() => count.value++}>
           {count.value}
         </div>
       )
     }
   })
   ```

### Vue JSX 语法

1. **指令**:

   ```jsx
   <input v-show={visible} />
   <input v-model={value} />
   <input v-model:argument={value} />
   ```

2. **插槽**:

   ```jsx
   function App() {
     return (
       <Component v-slots={{
         default: () => <div>默认插槽</div>,
         header: () => <div>头部插槽</div>
       }}
       />
     )
   }
   ```

3. **事件处理**:
   ```jsx
   <button onClick={handleClick}>点击</button>
   <input onInput={(e) => setValue(e.target.value)} />
   ```

## 自动导入

项目配置了自动导入，以下 API 无需手动引入：

- **Vue APIs**: `ref`, `reactive`, `computed`, `watch`, `onMounted` 等
- **Vue Router**: `useRouter`, `useRoute` 等
- **图标**: 使用 `~icons` 前缀
  ```js
  import IconAccessibility from '~icons/lucide/accessibility'
  ```

## 组件开发规范

### 组件结构

```jsx
// 推荐的组件结构
const UserList = defineComponent({
  props: {
    users: Array,
    loading: Boolean
  },
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    // 响应式数据
    const searchValue = ref('')

    // 计算属性
    const filteredUsers = computed(() => {
      return props.users.filter(user =>
        user.name.includes(searchValue.value)
      )
    })

    // 方法
    const handleDelete = (userId) => {
      emit('delete', userId)
    }

    // 生命周期
    onMounted(() => {
      // 初始化逻辑
    })

    return () => (
      <div class="user-list">
        <input v-model={searchValue.value} placeholder="搜索用户" />
        {filteredUsers.value.map(user => (
          <div key={user.id} class="user-item">
            {user.name}
            <button onClick={() => handleDelete(user.id)}>删除</button>
          </div>
        ))}
      </div>
    )
  }
})
```

### 组合式函数

```js
// hooks/use-data-table.jsx
export function useDataTable(apiFunction) {
  const data = ref([])
  const loading = ref(false)
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    total: 0
  })

  const loadData = async () => {
    loading.value = true
    try {
      const result = await apiFunction(pagination)
      data.value = result.data
      pagination.total = result.total
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    pagination,
    loadData
  }
}
```

## API 规范

### 接口文件结构

```js
// api/user-api.js
import request from '@/utils/request'

export const userApi = {
  // 获取用户列表
  list: params => request.get('/system/user/list', { params }),

  // 获取用户详情
  detail: id => request.get(`/system/user/${id}`),

  // 创建用户
  create: data => request.post('/system/user', data),

  // 更新用户
  update: (id, data) => request.put(`/system/user/${id}`, data),

  // 删除用户
  delete: id => request.delete(`/system/user/${id}`)
}
```

## 样式规范

### UnoCSS 使用

```jsx
// 使用原子化 CSS 类
function Button({ type = 'primary' }) {
  return (
    <button
      class={clsx(
        'px-4 py-2 rounded border-none cursor-pointer transition-colors',
        type === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
        type === 'default' && 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      )}
    >
      按钮
    </button>
  )
}
```

### SCSS 变量

```scss
// assets/styles/vars.scss
$primary-color: #1890ff;
$success-color: #52c41a;
$warning-color: #faad14;
$error-color: #f5222d;
```

## 状态管理

### Pinia Store 结构

```js
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // state
  const userInfo = ref(null)
  const permissions = ref([])

  // getters
  const isAdmin = computed(() => {
    return userInfo.value?.role === 'admin'
  })

  // actions
  const login = async (credentials) => {
    const response = await userApi.login(credentials)
    userInfo.value = response.data
    return response
  }

  const logout = () => {
    userInfo.value = null
    permissions.value = []
  }

  return {
    userInfo,
    permissions,
    isAdmin,
    login,
    logout
  }
})
```

## 路由规范

```js
// router/modules/system.js
export default {
  path: '/system',
  name: 'System',
  component: () => import('@/components/layout/layout-default.jsx'),
  meta: {
    title: '系统管理',
    icon: 'Settings',
    requiresAuth: true
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      component: () => import('@/pages/system/user/index.vue'),
      meta: {
        title: '用户管理',
        permissions: ['system:user:view']
      }
    }
  ]
}
```

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 运行测试
pnpm test:unit

# 代码检查
pnpm lint

# 自动修复代码格式
pnpm lint:fix

# 预览构建结果
pnpm preview
```

# TypeScript 转 JSDoc 任务进度记录

## 项目概况

总计需要转换的文件：

- TypeScript 文件 (.ts): 21 个
- TSX 文件 (.tsx): 27 个
- **总计：48 个文件**

## 转换策略

1. 保持原有的文件结构和命名
2. 将 `.ts` 文件转换为 `.js` 文件
3. 将 `.tsx` 文件转换为 `.jsx` 文件（Vue JSX 支持）
4. 使用 JSDoc 注释替代 TypeScript 类型定义
5. 更新相关的配置文件和导入语句

## 任务分解（按目录）

### 1. 根目录配置文件 [4/4]

- [x] `env.d.ts` → 删除或转换为环境变量配置
- [x] `vite.config.ts` → `vite.config.js`
- [x] `vitest.config.ts` → `vitest.config.js`
- [x] `uno.config.ts` → `uno.config.js`

### 2. 插件目录 [1/1]

- [x] `plugins/vite-plugin-clean.ts` → `plugins/vite-plugin-clean.js`

### 3. API 目录 [1/1]

- [x] `src/api/user.ts` → `src/api/user.js`

### 4. Mocks 目录 [5/5]

- [x] `src/mocks/browser.ts` → `src/mocks/browser.js`
- [x] `src/mocks/common.ts` → `src/mocks/common.js`
- [x] `src/mocks/handlers.ts` → `src/mocks/handlers.js`
- [x] `src/mocks/mocks.ts` → `src/mocks/mocks.js`
- [x] `src/mocks/node.ts` → `src/mocks/node.js`

### 5. Router 目录 [3/3]

- [x] `src/router/router.ts` → `src/router/router.js`
- [x] `src/router/guards/guards.ts` → `src/router/guards/guards.js`
- [x] `src/router/guards/async-route.tsx` → `src/router/guards/async-route.jsx`

### 6. Stores 目录 [3/3]

- [x] `src/stores/nav-tags.ts` → `src/stores/nav-tags.js`
- [x] `src/stores/sidebar.ts` → `src/stores/sidebar.js`
- [x] `src/stores/user.ts` → `src/stores/user.js`

### 7. Types 目录 [2/2]

- [x] `src/types/intrinsic.ts` → `src/types/intrinsic.js`
- [x] `src/types/menu.ts` → `src/types/menu.js`

### 8. Utils 目录 [2/2]

- [x] `src/utils/class-merge.ts` → `src/utils/class-merge.js`
- [x] `src/utils/token.ts` → `src/utils/token.js` (已存在 .js 版本，已合并)

### 9. App 根组件 [1/1]

- [x] `src/app.tsx` → `src/app.jsx`

### 10. Pages 目录 [12/12]

- [x] `src/pages/about/about-page.tsx` → `src/pages/about/about-page.jsx`
- [x] `src/pages/error/401.tsx` → `src/pages/error/401.jsx`
- [x] `src/pages/error/404.tsx` → `src/pages/error/404.jsx`
- [x] `src/pages/home/home-page.tsx` → `src/pages/home/home-page.jsx`
- [x] `src/pages/icon/icon-page.tsx` → `src/pages/icon/icon-page.jsx`
- [x] `src/pages/login/login-page.tsx` → `src/pages/login/login-page.jsx`
- [x] `src/pages/register/register-page.tsx` → `src/pages/register/register-page.jsx`
- [x] `src/pages/request/request-page.tsx` → `src/pages/request/request-page.jsx`
- [x] `src/pages/system/system-page.tsx` → `src/pages/system/system-page.jsx`
- [x] `src/pages/system/menu/menu-page.tsx` → `src/pages/system/menu/menu-page.jsx`
- [x] `src/pages/system/role/role-page.tsx` → `src/pages/system/role/role-page.jsx`
- [x] `src/pages/system/user/user-page.tsx` → `src/pages/system/user/user-page.jsx`
- [x] `src/pages/user/user-page.tsx` → `src/pages/user/user-page.jsx`

### 11. Layout 组件 [11/11]

- [x] `src/components/layout/layout-default.tsx` → `src/components/layout/layout-default.jsx`
- [x] `src/components/layout/layout-inner-link.tsx` → `src/components/layout/layout-inner-link.jsx`
- [x] `src/components/layout/layout-parent-view.tsx` → `src/components/layout/layout-parent-view.jsx`
- [x] `src/components/layout/components/global-search/global-search.tsx` → `src/components/layout/components/global-search/global-search.jsx`
- [x] `src/components/layout/components/layout-header/header-breadcrumb.tsx` → `src/components/layout/components/layout-header/header-breadcrumb.jsx`
- [x] `src/components/layout/components/layout-header/layout-header.tsx` → `src/components/layout/components/layout-header/layout-header.jsx`
- [x] `src/components/layout/components/layout-header/notification-button.tsx` → `src/components/layout/components/layout-header/notification-button.jsx`
- [x] `src/components/layout/components/layout-nav-tags/layout-nav-tags.tsx` → `src/components/layout/components/layout-nav-tags/layout-nav-tags.jsx`
- [x] `src/components/layout/components/layout-nav-tags/nav-tag.tsx` → `src/components/layout/components/layout-nav-tags/nav-tag.jsx`
- [x] `src/components/layout/components/layout-sidebar/layout-sidebar.tsx` → `src/components/layout/components/layout-sidebar/layout-sidebar.jsx`
- [x] `src/components/layout/components/layout-sidebar/sidebar-toggle.tsx` → `src/components/layout/components/layout-sidebar/sidebar-toggle.jsx`

### 12. UI 组件 [3/3]

- [x] `src/components/ui/pure-button/pure-button.tsx` → `src/components/ui/pure-button/pure-button.jsx`
- [x] `src/components/ui/pure-input/pure-input.tsx` → `src/components/ui/pure-input/pure-input.jsx`
- [x] `src/components/ui/tag/tag.tsx` → `src/components/ui/tag/tag.jsx`

### 13. 类型定义文件处理 [1/1]

- [x] `src/auto-imports.d.ts` → 删除

### 14. 配置文件更新 [4/4]

- [x] 更新 `package.json` 中的脚本和依赖
- [x] 更新 `vite.config.js` 配置
- [x] 删除 TypeScript 相关配置文件
- [x] 更新 eslint 配置以支持 JSDoc

## 当前进度

- **总进度**: 48/48 (100%)
- **配置文件**: 9/9 (100%)
- **源代码文件**: 39/39 (100%)

## 注意事项

1. 在转换过程中，需要特别注意：
   - Vue 组件的 props 类型定义
   - 事件处理函数的参数类型
   - API 请求和响应的数据类型
   - Store 状态的类型定义

2. JSDoc 语法要点：
   - 使用 `@param {type} name description` 定义参数
   - 使用 `@returns {type} description` 定义返回值
   - 使用 `@typedef` 定义复杂类型
   - 使用 `@type {type}` 定义变量类型

3. 已存在的 .js 文件需要检查：
   - `src/main.js`
   - `src/types/base.js`
   - `src/utils/http-lite.js`
   - `src/utils/token.js`

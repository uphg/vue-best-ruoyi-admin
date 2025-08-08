import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  typescript: false, // 禁用 TypeScript 相关规则
  rules: {
    'style/brace-style': 'off', // 代码大括号风格
    'style/jsx-curly-newline': 'off', // JSX 中大括号内强制换行
    'style/jsx-one-expression-per-line': 'off', // JSX 中每行只能有一个表达式（会导致字符串拼接bug）
    'import/no-mutable-exports': 'off',
    'antfu/if-newline': 'off', // if 语句结束后强制换行
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'sort-named-imports': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'no-restricted-globals': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'off',
    // 'nonblock-statement-body-position': 'error', // 关闭 if 语句结束后强制换行
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    // vue 文件各模块顺序
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'eslint-comments/no-unlimited-disable': 'off',
    'jsdoc/require-returns-check': 'off',
    'jsdoc/require-returns-description': 'off',
  },
}, {
  files: ['*.tsx', '*.jsx'],
  rules: {
    'no-unused-vars': 'off',
  },
})

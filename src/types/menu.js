/**
 * 菜单匹配项
 * @typedef {object} MenuMatch
 * @property {string} label - 标签
 * @property {string} path - 路径
 * @property {string} name - 名称
 * @property {object} meta - 元信息
 * @property {string} meta.title - 标题
 * @property {MenuItem[]} [children] - 子菜单项
 */

/**
 * 菜单项数据结构
 * @typedef {object} MenuItem
 * @property {string} label - 菜单标签
 * @property {string} key - 菜单键值（唯一标识）
 * @property {string} [icon] - 图标名称
 * @property {MenuMatch[]} matchs - 匹配规则数组
 * @property {MenuItem[]} [children] - 子菜单项
 */

// 导出类型定义以供其他模块使用
export {}

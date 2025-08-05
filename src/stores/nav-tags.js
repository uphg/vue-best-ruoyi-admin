import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 导航标签项数据结构
 * @typedef {object} NavTagItem
 * @property {string} title - 标签标题
 * @property {string} name - 标签名称（唯一标识）
 * @property {string} path - 路由路径
 * @property {string} [icon] - 图标名称
 */

/**
 * 导航标签 Store
 * 管理页面顶部的导航标签页
 */
export const useNavTagsStore = defineStore('nav-tags', () => {
  /**
   * 标签列表
   * @type {import('vue').Ref<NavTagItem[]>}
   */
  const tags = ref([])

  /**
   * 当前激活的标签名称
   * @type {import('vue').Ref<string>}
   */
  const active = ref('')

  /**
   * 添加标签页
   * @param {NavTagItem} option - 标签页配置
   */
  function append(option) {
    const existingtag = tags.value.find(tag => tag.name === option.name)
    if (!existingtag) {
      tags.value.push(option)
    }
  }

  /**
   * 移除指定标签页
   * @param {string} name - 标签名称
   */
  function remove(name) {
    const index = tags.value.findIndex(tag => tag.name === name)
    if (index > -1) {
      tags.value.splice(index, 1)
      // 如果删除的是当前激活的标签页，需要切换到其他标签页
      if (active.value === name && tags.value.length > 0) {
        const newActiveIndex = Math.min(index, tags.value.length - 1)
        active.value = tags.value[newActiveIndex].name
      } else if (tags.value.length === 0) {
        active.value = ''
      }
    }
  }

  /**
   * 设置当前激活的标签页
   * @param {string} name - 标签名称
   */
  function setActive(name) {
    const tag = tags.value.find(tag => tag.name === name)
    if (!tag) {
      return
    }
    active.value = name
  }

  return {
    tags,
    active,
    append,
    remove,
    setActive,
  }
})

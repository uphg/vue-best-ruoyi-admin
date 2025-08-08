import { defineStore } from 'pinia'

export const useDictStore = defineStore('dict', () => {
  const dict = ref([])

  const dictMap = computed(() => {
    const map = new Map()
    dict.value.forEach((item) => {
      map.set(item.key, item.value)
    })
    return map
  })

  const getDict = (key) => {
    if (!key || key === '') {
      return null
    }
    return dictMap.value.get(key) || null
  }

  const setDict = (key, value) => {
    if (key && key !== '') {
      const existingIndex = dict.value.findIndex(item => item.key === key)
      if (existingIndex >= 0) {
        dict.value[existingIndex].value = value
      } else {
        dict.value.push({ key, value })
      }
    }
  }

  const removeDict = (key) => {
    if (!key) return false
    const index = dict.value.findIndex(item => item.key === key)
    if (index >= 0) {
      dict.value.splice(index, 1)
      return true
    }
    return false
  }

  const cleanDict = () => {
    dict.value = []
  }

  const initDict = () => {
    cleanDict()
  }

  return {
    dict,
    dictMap,
    getDict,
    setDict,
    removeDict,
    cleanDict,
    initDict,
  }
})

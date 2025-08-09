import { request } from '@/utils/request'

// 查询字典类型列表
export function listType(query) {
  return request({
    url: '/system/dict/type/list',
    method: 'get',
    params: query,
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: `/system/dict/type/${dictId}`,
    method: 'get',
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data,
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/system/dict/type',
    method: 'put',
    data,
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: `/system/dict/type/${dictId}`,
    method: 'delete',
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete',
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get',
  })
}

// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query,
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: `/system/dict/data/${dictCode}`,
    method: 'get',
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: `/system/dict/data/type/${dictType}`,
    method: 'get',
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data,
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data,
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: `/system/dict/data/${dictCode}`,
    method: 'delete',
  })
}

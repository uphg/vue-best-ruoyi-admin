import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 CSS 类名的工具函数
 * 结合了 clsx 和 tailwind-merge 的功能，用于处理条件性类名和 Tailwind CSS 类的冲突合并
 *
 * @param {...import('clsx').ClassValue} inputs - 类名参数，可以是字符串、对象、数组等
 * @returns {string} 合并后的类名字符串
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 返回 'py-1 px-4' (px-4 覆盖 px-2)
 * cn('text-red-500', { 'text-blue-500': true }) // 返回 'text-blue-500'
 * cn(['bg-white', 'text-black'], 'bg-gray-100') // 返回 'text-black bg-gray-100'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

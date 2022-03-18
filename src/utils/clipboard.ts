/**
 * @Description: 剪贴板复制
 * @Author: Neo
 * @Date: 2022-01-04
 * @LastEditTime: 2022-01-04
 * @LastEditors: Neo
 */
import Clipboard from 'clipboard'

/**
 * @param {string} text 要复制的文字
 * @return {promise} 返回promise对象
 */
export default function handleClipboard (text: string) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('div')
    const clipboard = new Clipboard(element, {
      text: () => text
    })
    clipboard.on('success', (res) => {
      clipboard.destroy()
      resolve(res)
    })
    clipboard.on('error', (err) => {
      clipboard.destroy()
      reject(err)
    })
    ;(clipboard as any).onClick({ currentTarget: element })
  })
}

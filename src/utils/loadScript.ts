/*
 * @Author: jiawei.mao
 * @Date: 2020-12-11 15:26:21
 * @Description: 
 */
const callbacks = {} as any

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
function loadScript (src: any, callback: any) {

  const existingScript = document.getElementById(src)
  const cb = callback || (() => { console.log('empty-function') })

  function stdOnEnd (script: any) {
    script.onload = () => {
      script.onerror = script.onload = null
      callbacks[src].forEach((item: any) => {
        item(null, script)
      })
      delete callbacks[src]
    }
    script.onerror = () => {
      script.onerror = script.onload = null
      cb(new Error(`Failed to load ${src}`), script)
    }
  }

  function ieOnEnd (script: any) {
    script.onreadystatechange = () => {
      if (script.readyState !== 'complete' && script.readyState !== 'loaded') return
      script.onreadystatechange = null
      callbacks[src].forEach((item: any) => {
        item(null, script)
      })
      delete callbacks[src]
    }
  }

  if (!existingScript) {
    callbacks[src] = []
    const $script = document.createElement('script') as any
    $script.src = src
    $script.id = src
    $script.async = 1
    document.body.appendChild($script)
    const onEnd = 'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script)
    onEnd($script)
  }

  callbacks[src].push(cb)


}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue (list: any, cb: any) {
  const first = list.shift()
  list.length ? loadScript(first, () => loadScriptQueue(list, cb)) : loadScript(first, cb)
}

export default loadScript

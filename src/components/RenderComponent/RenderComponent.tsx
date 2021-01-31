import Vue, { CreateElement } from 'vue'
import { deepClone } from '@/utils/index'

export default Vue.extend({
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      componentChild: {}
    } as any
  },
  methods: {
    makeDataObject () {
      // 深入数据对象：
      // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
      return {
        class: {},
        attrs: {},
        props: {},
        domProps: {},
        nativeOn: {},
        on: {},
        style: {},
        directives: [],
        scopedSlots: {},
        slot: null,
        key: null,
        ref: null,
        refInFor: true
      }
    },
    vModel (dataObject: any, defaultValue: any) {
      dataObject.props.value = defaultValue
      dataObject.on.input = (val: string) => {
        this.$emit('input', val)
      }
    },
    mountSlotFiles (h: any, confClone: any, children: any) {
      const childObjs = this.componentChild[confClone.config.tag]
      if (childObjs) {
        Object.keys(childObjs).forEach(key => {
          const childFunc = childObjs[key]
          if (confClone.scopedSlots && confClone.scopedSlots[key]) {
            children.push(childFunc(h, confClone, key))
          }
        })
      }
    },
    emitEvents (confClone: any) {
      ['on', 'nativeOn'].forEach(attr => {
        const eventKeyList = Object.keys(confClone[attr] || {})
        eventKeyList.forEach(key => {
          const val = confClone[attr][key]
          if (typeof val === 'string') {
            confClone[attr][key] = (event: HTMLElement) => this.$emit(val, event)
          }
        })
      })
    },
    clearAttrs (dataObject: any) {
      delete dataObject.attrs.config
      delete dataObject.attrs.scopedSlots
      delete dataObject.attrs.__methods__
    },
    buildDataObject (confClone: any, dataObject: any) {
      Object.keys(confClone).forEach(key => {
        const val = confClone[key]
        if (key === 'vModel') {
          this.vModel(dataObject, confClone.config.defaultValue)
        } else if (dataObject[key] !== undefined) {
          if (dataObject[key] === null
            || dataObject[key] instanceof RegExp
            || ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])) {
            dataObject[key] = val
          } else if (Array.isArray(dataObject[key])) {
            dataObject[key] = [...dataObject[key], ...val]
          } else {
            dataObject[key] = { ...dataObject[key], ...val }
          }
        } else {
          dataObject.attrs[key] = val
        }
      })

      // 清理属性
      this.clearAttrs(dataObject)
    }
  },
  created () {
    /**
     * 将./slots中的文件挂载到对象componentChild上
     * 文件名为key，对应JSON配置中的__config__.tag
     * 文件内容为value，解析JSON配置中的__slot__
     */
    const slotsFiles = require.context('./slots', false, /\.tsx$/)
    const keys = slotsFiles.keys() || []
    keys.forEach(key => {
      const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
      const value = slotsFiles(key).default
      this.componentChild[tag] = value
    })
  },
  render (createElement: CreateElement): any {
    const dataObject = this.makeDataObject()
    const confClone = deepClone(this.conf)
    const children = this.$slots.default || []

    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    this.mountSlotFiles(createElement, confClone, children)

    // 将字符串类型的事件，发送为消息
    this.emitEvents(confClone)

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    this.buildDataObject(confClone, dataObject)

    return createElement(this.conf.config.tag, dataObject, children)
  }
})
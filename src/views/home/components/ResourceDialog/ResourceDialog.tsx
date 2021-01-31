import Vue from 'vue'
import { deepClone } from '@/utils'

export default Vue.extend({
  inheritAttrs: false, // 不希望组件的根元素继承特性
  props: {
    originResource: Array
  },
  data () {
    return {
      resources: null as any
    }
  },
  methods: {
    onOpen () {
      this.resources = this.originResource.length ? deepClone(this.originResource) : ['']
    },
    onClose () {
    },
    close () {
      this.$emit('update:visible', false)
    },
    handelConfirm () {
      const results = this.resources.filter((item: any) => !!item) || []
      this.$emit('save', results)
      this.close()
      if (results.length) {
        this.resources = results
      }
    },
    deleteOne (index: any) {
      this.resources.splice(index, 1)
    },
    addOne (url: string) {
      if (this.resources.indexOf(url) > -1) {
        this.$message('资源已存在')
      } else {
        this.resources.push(url)
      }
    }
  }
})
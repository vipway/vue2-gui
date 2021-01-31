import Vue from 'vue'
import iconList from '@/utils/icon.json'

const originList = iconList.map((name: string) => `el-icon-${name}`)
export default Vue.extend({
  props: {
    current: String
  },
  data () {
    return {
      iconList: originList,
      active: '',
      key: ''
    }
  },
  watch: {
    key (val) {
      if (val) {
        this.iconList = originList.filter((name: string) => name.indexOf(val) > -1)
      } else {
        this.iconList = originList
      }
    }
  },
  methods: {
    onOpen () {
      this.active = this.current
      this.key = ''
    },
    onClose () {
      console.log('onClose')
    },
    onSelect (icon: string) {
      this.active = icon
      this.$emit('select', icon)
      this.$emit('update:visible', false)
    }
  }
})
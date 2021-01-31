import Vue from 'vue'

function isExternal (path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return `svg-icon ${this.className}`
      }
      return 'svg-icon'
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  },
  render () {
    return isExternal(this.iconClass) ? <div
      style={{
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }}
      class="svg-external-icon svg-icon"
      onClick={this.$listeners}
    /> : <svg class={this.className ? `svg-icon ${this.className}` : 'svg-icon'} aria-hidden="true" onClick={this.$listeners}>
        <use xlinkHref={`#icon-${this.iconClass}`} />
      </svg>
  }
})
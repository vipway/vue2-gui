import Vue from 'vue'

export default Vue.extend({
  name: 'app',
  mounted () {
    // 取消开始的loading动画
    const preLoader = document.querySelector('#pre-loader') as HTMLElement
    preLoader.style.display = 'none'

    // fix: firefox 下 拖拽 会新打卡一个选项卡
    // https://github.com/JakHuang/form-generator/issues/15
    document.body.ondrop = event => {
      event.preventDefault()
      event.stopPropagation()
    }
  },

  render () {
    return (
      <div>
        <router-view />
      </div>
    )
  }
})


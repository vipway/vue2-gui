export default {
  options (h: any, conf: any, key: any) {
    const list: any[] = []
    conf.scopedSlots.options.forEach((item: any) => {
      if (conf.config.optionType === 'button') {
        list.push(<el-radio-button label={item.value}>{item.label}</el-radio-button>)
      } else {
        list.push(<el-radio label={item.value} border={conf.border}>{item.label}</el-radio>)
      }
    })
    return list
  }
}

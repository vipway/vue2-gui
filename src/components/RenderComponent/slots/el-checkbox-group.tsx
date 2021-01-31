export default {
  options (h: any, conf: any, key: any) {
    const list: any[] = []
    conf.scopedSlots.options.forEach((item: any) => {
      if (conf.config.optionType === 'button') {
        list.push(<el-checkbox-button label={item.value}>{item.label}</el-checkbox-button>)
      } else {
        list.push(<el-checkbox label={item.value} border={conf.border}>{item.label}</el-checkbox>)
      }
    })
    return list
  }
}

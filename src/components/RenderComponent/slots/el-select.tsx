export default {
  options (h: any, conf: any, key: any) {
    const list: any[] = []
    conf.scopedSlots.options.forEach((item: any) => {
      list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
    })
    return list
  }
}

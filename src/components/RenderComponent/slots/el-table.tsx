export default {
  columns (h: any, conf: any, key: any) {
    const list: any[] = []
    conf.scopedSlots.columns.forEach((item: any) => {
      list.push(<el-table-column label={item.label} prop={item.label}></el-table-column>)
    })
    return list
  }
}
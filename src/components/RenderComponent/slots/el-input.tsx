export default {
  prepend (h: any, conf: any, key: any) {
    return <template slot="prepend">{conf.scopedSlots[key]}</template>
  },
  append (h: any, conf: any, key: any) {
    return <template slot="append">{conf.scopedSlots[key]}</template>
  }
}

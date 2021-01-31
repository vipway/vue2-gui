export default {
  default (h: any, conf: any, key: any) {
    return conf.scopedSlots[key]
  }
}

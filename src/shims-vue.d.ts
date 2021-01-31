declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 参考：https://www.coder.work/article/1309744, https://blog.csdn.net/ZD717822023/article/details/107226585/
export type VForm = Vue & { validate: () => boolean }


//element ui 组件
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any,
    $axios: any
  }
}
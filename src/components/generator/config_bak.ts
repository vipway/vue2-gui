// 深入数据对象：https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1

// 完整组件配置示例，其中tag，layout，document 非vue主键原生属性
const demoCompontentsConfig = {
  // 元素标签
  tag: 'el-row',
  // 布局方式
  layout: 'block',
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  class: {},
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {},
  // 普通的 HTML attribute
  attrs: {},
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    // click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    // click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [

  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    // default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  // slot: 'name-of-slot',
  // 其它特殊顶层 property
  // key: 'myKey',
  // ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true,
  document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
}

export const layoutComponents = [
  {
    __config__: {
      tag: 'el-row',
      layout: 'block',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    // 组件 prop
    props: {
      gutter: 0,
      type: 'default',
      justify: 'start',
      align: 'top',
      tag: 'div'
    },
    style: {
      height: '20px',
      width: '100%'
    }
  }
]



// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true,
  layoutTree: true
}

// 布局型组件 【左面板】
export const layoutComponents1 = [
  // {
  //   __config__: {
  //     layout: 'rowFormItem',
  //     tagIcon: 'row',
  //     label: '行容器',
  //     layoutTree: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
  //   },
  //   type: 'default',
  //   justify: 'start',
  //   align: 'top'
  // }, 
  {
    __config__: {
      layout: 'rowForm',
      label: '表单',
      tag: 'el-form',
      tagIcon: 'form',
      children: [
        {
          __config__: {
            label: '单行文本',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            document: 'https://element.eleme.cn/#/zh-CN/component/input',
            // 正则校验规则
            regList: []
          },
          // 组件的插槽属性
          __slot__: {
            prepend: '',
            append: ''
          },
          // 其余的为可直接写在组件标签上的属性
          placeholder: '请输入',
          style: { width: '100%' },
          clearable: true,
          'prefix-icon': '',
          'suffix-icon': '',
          maxlength: null,
          'show-word-limit': false,
          readonly: false,
          disabled: false
        },
        {
          __config__: {
            label: '下拉选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            layout: 'colFormItem',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/select'
          },
          __slot__: {
            options: [{
              label: '选项一',
              value: 1
            }, {
              label: '选项二',
              value: 2
            }]
          },
          placeholder: '请选择',
          style: { width: '100%' },
          clearable: true,
          disabled: false,
          filterable: false,
          multiple: false
        }
      ]
    },
    formRef: 'elForm',
    formModel: 'formData',
    size: 'medium',
    labelPosition: 'right',
    labelWidth: 100,
    formRules: 'rules',
    gutter: 15,
    disabled: false,
    span: 24,
    formBtns: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/form#form-attributes'
  },
  {
    __config__: {
      layout: 'block',
      tag: 'el-row',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    __slot__: {

    },
    custom: {
      gutter: 0,
      type: 'default',
      justify: 'start',
      align: 'top',
      tag: 'div'
    }
  },
  {
    __config__: {
      layout: 'inline',
      tag: 'el-col',
      tagIcon: 'col',
      label: '列容器',
      layoutTree: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#col-attributes'
    },
    // 组件的插槽属性
    __slot__: {

    },
    // 自定义配置
    custom: {
      span: 24,
      offset: 0,
      push: 0,
      pull: 0,
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      tag: 'div'
    }
  }
]

// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 正则校验规则
      regList: []
    },
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'password',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    'show-password': true,
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '计数器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
    },
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    disabled: false
  },
  {
    __config__: {
      label: '编辑器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'tinymce',
      tagIcon: 'rich-text',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'http://tinymce.ax-z.cn'
    },
    placeholder: '请输入',
    height: 300, // 编辑器高度
    branding: false // 隐藏右下角品牌烙印
  }
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    __config__: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/select'
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    __config__: {
      label: '级联选择',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'options',
      showLabel: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
    },
    options: [{
      id: 1,
      value: 1,
      label: '选项1',
      children: [{
        id: 2,
        value: 2,
        label: '选项1-1'
      }]
    }],
    placeholder: '请选择',
    style: { width: '100%' },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/'
  },
  {
    __config__: {
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      changeTag: true,
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/radio'
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'medium',
    disabled: false
  },
  {
    __config__: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: true,
      regList: [],
      changeTag: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox'
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  {
    __config__: {
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/switch'
    },
    style: {},
    disabled: false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false
  },
  {
    __config__: {
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/slider'
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false
  },
  {
    __config__: {
      label: '时间选择',
      tag: 'el-time-picker',
      tagIcon: 'time',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '时间范围',
      tag: 'el-time-picker',
      tagIcon: 'time-range',
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      defaultValue: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
    },
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '日期选择',
      tag: 'el-date-picker',
      tagIcon: 'date',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
    },
    placeholder: '请选择',
    type: 'date',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  {
    __config__: {
      label: '日期范围',
      tag: 'el-date-picker',
      tagIcon: 'date-range',
      defaultValue: null,
      span: 24,
      showLabel: true,
      labelWidth: null,
      required: true,
      layout: 'colFormItem',
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
    },
    style: { width: '100%' },
    type: 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  {
    __config__: {
      label: '评分',
      tag: 'el-rate',
      tagIcon: 'rate',
      defaultValue: 0,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/rate'
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false
  },
  {
    __config__: {
      label: '颜色选择',
      tag: 'el-color-picker',
      tagIcon: 'color',
      span: 24,
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/color-picker'
    },
    'show-alpha': false,
    'color-format': '',
    disabled: false,
    size: 'medium'
  },
  {
    __config__: {
      label: '上传',
      tag: 'el-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      required: true,
      span: 24,
      showTip: false,
      buttonText: '点击上传',
      regList: [],
      changeTag: true,
      fileSize: 2,
      sizeUnit: 'MB',
      document: 'https://element.eleme.cn/#/zh-CN/component/upload'
    },
    __slot__: {
      'list-type': true
    },
    action: 'https://jsonplaceholder.typicode.com/posts/',
    disabled: false,
    accept: '',
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: false
  }
]
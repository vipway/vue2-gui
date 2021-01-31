/*
 * @Author: jiawei.mao
 * @Date: 2020-12-16 10:43:57
 * @Description: element-ui 组建属性配置
 */
import ElPropsConfigNamespace from "./ElPropsConfigType"

export default class ElPropsConfig {
  static FORM_PROPS: any = [{
    checkKey: 'changeTag',
    type: 'select',
    label: '组件类型',
    vModel: 'tagIcon',
    icon: 'select',
    placeholder: '请选择组件类型',
    style: { width: '100%' },
  }, {
    checkKey: '__vModel__',
    type: 'input',
    label: '字段名',
    vModel: '__vModel__',
    placeholder: '请输入字段名（v-model）'
  }, {
    checkKey: 'componentName',
    type: 'text',
    label: '组件名'
  }, {
    checkKey: 'label',
    type: 'input',
    label: '标题',
    vModel: 'label',
    placeholder: '请输入标题',
    functionName: 'changeRenderKey'
  }, {
    checkKey: 'placeholder',
    type: 'input',
    label: '占位提示',
    vModel: 'placeholder',
    placeholder: '请输入占位提示',
    eventType: 'onInput',
    eventName: 'changeRenderKey'
  }, {
    checkKey: 'start-placeholder',
    type: 'input',
    label: '开始占位',
    vModel: 'start-placeholder',
    placeholder: '请输入占位提示'
  }, {
    checkKey: 'end-placeholder',
    type: 'input',
    label: '结束占位',
    vModel: 'end-placeholder',
    placeholder: '请输入占位提示'
  }, {
    checkKey: 'span',
    type: 'slider',
    label: '结束占位',
    vModel: 'span',
    placeholder: '请输入占位提示',
    max: 24,
    min: 1,
    marks: {
      4: '4',
      6: '6',
      8: '8',
      12: '12',
      16: '16'
    },
    eventType: 'onChange',
    functionName: 'spanChange'
  }, {
    checkKey: ['layout', 'gutter'],
    type: 'input-number',
    label: '栅格间隔',
    vModel: 'end-placeholder',
    placeholder: '栅格间隔'
  }, {
    checkKey: ['layout', 'type'],
    type: 'radio-group',
    label: '布局模式',
    vModel: 'type',
    placeholder: '栅格间隔',
    options: [{
      label: 'defalt',
    }, {
      label: 'flex',
    }]
  }, {
    checkKey: ['justify', 'type'],
    type: 'select',
    label: '水平排列',
    vModel: 'type',
    placeholder: '请选择水平排列',
    style: { width: '100%' },
    options: [{
      label: 'start',
      value: 'start'
    },
    {
      label: 'end',
      value: 'end'
    },
    {
      label: 'center',
      value: 'center'
    },
    {
      label: 'space-around',
      value: 'space-around'
    },
    {
      label: 'space-between',
      value: 'space-between'
    }]
  }, {
    checkKey: ['align', 'flex'],
    type: 'radio-group',
    label: '垂直排列',
    vModel: 'align',
    options: [{
      label: 'top',
    }, {
      label: 'middle',
    }, {
      label: 'bottom'
    }]
  }, {
    checkKey: 'labelWidth',
    type: 'input',
    label: '标签宽度',
    vModel: 'labelWidth',
    placeholder: '请输入标签宽度'
  }, {
    checkKey: ['styleWidth'], // 判断条件有调整
    type: 'input',
    label: '组件宽度',
    vModel: 'styleWidth',
    placeholder: '请输入组件宽度'
  }, {
    checkKey: ['defaultValue'], // 判断条件有调整
    type: 'input',
    label: '组件宽度',
    vModel: 'defaultValue',
    placeholder: '请输入默认值'
  }, {
    checkKey: ['min'], // 判断条件有调整
    type: 'input-number',
    label: '至少应选',
    vModel: 'min',
    placeholder: '至少应选'
  }, {
    checkKey: ['max'], // 判断条件有调整
    type: 'input-number',
    label: '最多可选',
    vModel: 'max',
    placeholder: '最多可选'
  }, {
    checkKey: ['prepend'], // 判断条件有调整
    type: 'input',
    label: '前缀',
    vModel: 'prepend',
    placeholder: '请输入前缀'
  }, {
    checkKey: ['append'], // 判断条件有调整
    type: 'input',
    label: '后缀',
    vModel: 'prepend',
    placeholder: '请输入前缀',
  }, {
    checkKey: 'prefix-icon',
    type: 'input',
    label: '前图标',
    vModel: 'prepend',
    placeholder: '请输入前缀',
    eventType: 'onClick',
    eventName: 'openIconsDialog'
  }, {
    checkKey: 'suffix-icon',
    type: 'input',
    label: '后图标',
    vModel: 'placeholder',
    placeholder: '请输入后图标名称',
    eventType: 'onClick',
    eventName: 'openIconsDialog'
  }, {
    checkKey: ['icon', 'tag'],
    type: 'input',
    label: '按钮图标',
    vModel: 'icon',
    placeholder: '请输入按钮图标名称',
    eventType: 'onClick',
    eventName: 'openIconsDialog'
  }, {
    checkKey: 'tag',
    equalKey: 'tag',
    equalValue: 'el-cascader',
    type: 'input',
    label: '选项分隔符',
    vModel: 'separator',
    placeholder: '请输入选项分隔符'
  }, {
    checkKey: 'minRows', // 判断条件有调整
    type: 'input-number',
    label: '最小行数',
    vModel: 'minRows',
    placeholder: '请输入最小行数'
  }, {
    checkKey: 'maxRows', // 判断条件有调整
    type: 'input-number',
    label: '最大行数',
    vModel: 'separator',
    placeholder: '请输入最大行数'
  }, {
    checkKey: 'tag', // 判断条件有调整
    equalKey: 'tag',
    equalValue: 'el-cascader',
    type: 'input-number',
    label: '最大行数',
    vModel: 'separator',
    placeholder: '请输入最大行数'
  }, {
    checkKey: 'minValue', // 判断条件有调整
    type: 'input-number',
    label: '最小值',
    vModel: 'minValue',
    placeholder: '最小值'
  }, {
    checkKey: 'maxValue', // 判断条件有调整
    type: 'input-number',
    label: '最大值',
    vModel: 'maxValue',
    placeholder: '最大值'
  }, {
    checkKey: 'height',
    type: 'input-number',
    label: '组件高度',
    vModel: 'height',
    placeholder: '高度'
  }, {
    checkKey: 'step',
    type: 'input-number',
    label: '步长',
    vModel: 'step',
    placeholder: '步数'
  }, {
    checkKey: 'precision',
    type: 'input-number',
    label: '精度',
    vModel: 'precision',
    placeholder: '精度'
  }, {
    checkKey: 'controls-position', // 用于 el-input-number
    type: 'radio-group',
    label: '精度',
    vModel: 'controls-position',
    placeholder: '精度',
    options: [{
      label: '',
      value: '默认'
    }, {
      label: 'right',
      value: '右侧'
    }]
  }, {
    checkKey: 'maxlength',
    type: 'input',
    label: '最多输入',
    vModel: 'maxlength',
    placeholder: '请输入字符长度'
  }, {
    checkKey: 'active-text',
    type: 'input',
    label: '开启提示',
    vModel: 'active-text',
    placeholder: '请输入开启提示'
  }, {
    checkKey: 'inactive-text',
    type: 'input',
    label: '关闭提示',
    vModel: 'inactive-text',
    placeholder: '请输入关闭提示'
  }, {
    checkKey: 'active-value',
    type: 'input',
    label: '开启值',
    vModel: 'active-value',
    placeholder: '请输入开启值',
    eventType: 'onInput',
    eventName: 'onSwitchValueInput'
  }, {
    checkKey: 'inactive-value',
    type: 'input',
    label: '关闭值',
    vModel: 'inactive-value',
    placeholder: '请输入关闭值',
    eventType: 'onInput',
    eventName: 'onSwitchValueInput'
  }, {
    checkKey: ['type', 'tag'],
    equalKey: 'tag',
    equalValue: 'el-date-picker',
    type: 'select',
    label: '时间类型',
    vModel: 'type',
    placeholder: '请选择时间类型',
    style: { width: '100%' },
    options: [

    ]
  }, {
    checkKey: 'name',
    type: 'input',
    label: '文件字段名',
    vModel: 'name',
    placeholder: '请输入上传文件字段名',
    options: [

    ]
  }, {
    checkKey: 'accept',
    type: 'select',
    label: '文件类型',
    vModel: 'name',
    placeholder: '请选择文件类型',
    style: { width: '100%' },
    options: [{
      label: '图片',
      value: 'image/*'
    }, {
      label: 'video/*',
      value: '视频'
    }, {
      label: 'audio/*',
      value: '音频'
    }, {
      label: 'excel',
      value: '.xls,.xlsx'
    }, {
      label: 'word',
      value: '.doc,.docx'
    }, {
      label: 'pdf',
      value: '.pdf'
    }, {
      label: 'txt',
      value: '.txt'
    }]
  }, {
    checkKey: 'fileSize',
    type: 'input',
    label: '文件大小',
    vModel: 'fileSize',
    placeholder: '请输入文件大小',
    options: [

    ]
  }, {
    checkKey: 'action',
    type: 'input',
    label: '上传地址',
    vModel: 'action',
    placeholder: '请输入上传地址'
  }, {
    checkKey: 'list-type',
    type: 'radio-group',
    label: '列表类型',
    vModel: 'list-type',
    placeholder: '请输入上传地址',
    options: [{
      label: 'text',
      value: 'text'
    }, {
      label: 'picture',
      value: 'picture'
    }, {
      label: 'picture-card',
      value: 'picture-card'
    }]
  }, {
    checkKey: ['type', 'tag'],
    equalKey: 'tag',
    equalValue: 'el-button',
    type: 'select',
    label: '按钮类型',
    vModel: 'list-type',
    placeholder: '请输入上传地址',
    options: [{
      label: 'primary',
      value: 'primary'
    }, {
      label: 'success',
      value: 'success'
    }, {
      label: 'warning',
      value: 'warning'
    }, {
      label: 'danger',
      value: 'danger'
    }, {
      label: 'info',
      value: 'info'
    }, {
      label: 'text',
      value: 'text'
    }]
  }]
}

// 输入型组建配置项
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
  formBtns: true
}

// 输入型组件 【左面板】
export const inputComponents = [
  {
    tag: 'el-input',
    label: '单行文本',
    labelWidth: null,
    showLabel: true,
    changeTag: true,
    tagIcon: 'input',
    defaultValue: undefined,
    required: true,
    layout: 'colFormItem',
    span: 24,
    document: 'https://element.eleme.cn/#/zh-CN/component/input',
    // 正则校验规则
    regList: [],
    // 子组件
    childConfig: {
      prepend: '',
      append: ''
    }
  },

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

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    type: 'default',
    justify: 'start',
    align: 'top'
  },
  {
    __config__: {
      label: '按钮',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-button',
      tagIcon: 'button',
      span: 24,
      layout: 'colFormItem',
      document: 'https://element.eleme.cn/#/zh-CN/component/button'
    },
    __slot__: {
      default: '主要按钮'
    },
    type: 'primary',
    icon: 'el-icon-search',
    round: false,
    size: 'medium',
    plain: false,
    circle: false,
    disabled: false
  },
  {
    __config__: {
      layout: 'colFormItem',
      tagIcon: 'table',
      tag: 'el-table',
      document: 'https://element.eleme.cn/#/zh-CN/component/table',
      span: 24,
      formId: 101,
      renderKey: 1595761764203,
      componentName: 'row101',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      label: '表格',
      dataType: 'dynamic',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'data',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/tableData',
      children: [{
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: 15957617660153
        },
        prop: 'date',
        label: '日期'
      }, {
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: 15957617660152
        },
        prop: 'address',
        label: '地址'
      }, {
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: 15957617660151
        },
        prop: 'name',
        label: '名称'
      }, {
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: 1595774496335,
          children: [
            {
              __config__: {
                label: '按钮',
                tag: 'el-button',
                tagIcon: 'button',
                layout: 'raw',
                renderKey: 1595779809901
              },
              __slot__: {
                default: '主要按钮'
              },
              type: 'primary',
              icon: 'el-icon-search',
              round: false,
              size: 'medium'
            }
          ]
        },
        label: '操作'
      }]
    },
    data: [],
    directives: [{
      name: 'loading',
      value: true
    }],
    border: true,
    type: 'default',
    justify: 'start',
    align: 'top'
  }
]


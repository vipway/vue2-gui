/*
 * @Author: jiawei.mao
 * @Date: 2020-12-16 16:32:03
 * @Description: element-ui 组件配置
 */
export default class ElComponentsConfig {
  // 布局型组件
  static EL_BASIC_COMPONENTS = [{
    tag: 'el-row',
    inputProps: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      type: 'default',
      justify: 'start',
      align: 'top'
    },
    switchProps: {
      layoutTree: true,
    },
    document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
  }, {
    tag: 'el-button',
    inputProps: {
      changeType: true,
      labelWidth: null,
      tagIcon: 'button',
      span: 24,
      layout: 'colFormItem',
      text: '主要按钮',
      type: 'primary',
      icon: 'el-icon-search',
      size: 'medium'
    },
    switchProps: {
      round: false,
      plain: false,
      circle: false,
      disabled: false
    },
    document: 'https://element.eleme.cn/#/zh-CN/component/button'
  }]

  // 布局型组件
  static EL_LAYOUT_COMPONENTS = [{
    tag: 'el-row',
    inputProps: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      type: 'default',
      justify: 'start',
      align: 'top'
    },
    switchProps: {
      layoutTree: true,
    },
    document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
  }]
  static EL_INPUT_COMPONENTS = [{
    // 组件的自定义配置
    tag: 'el-input',
    // 输入型配置
    inputProps: {
      label: '单行文本',
      labelWidth: null,
      maxlength: null,
      tagIcon: 'input',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      'prefix-icon': '',
      'suffix-icon': '',
      placeholder: '请输入',
      style: { width: '100%' },
      changeType: true
    },
    // 开关型配置
    switchProps: {
      showLabel: true,
      required: true,
      clearable: true,
      readonly: false,
      disabled: false,
      'show-word-limit': false,
    },
    // 正则校验规则
    regList: [],
    // 子组件
    child: {
      prepend: '',
      append: ''
    },
    document: 'https://element.eleme.cn/#/zh-CN/component/input'
  }, {
    tag: 'el-input',
    inputProps: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tagIcon: 'textarea',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      type: 'textarea',
      placeholder: '请输入',
      autosize: {
        minRows: 4,
        maxRows: 4
      },
      maxlength: null,
      style: { width: '100%' },
      changeType: true
    },
    switchProps: {
      required: true,
      readonly: false,
      disabled: false,
      showWordLimit: false // 输入统计
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/input',
  }, {
    tag: 'el-input-number',
    inputProps: {
      label: '计数器',
      changeType: true,
      labelWidth: null,
      tagIcon: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      min: undefined,
      max: undefined,
      step: 1,
      precision: undefined,
      controlsPosition: '', // 操作按钮位置
      placeholder: ''
    },
    switchProps: {
      showLabel: true,
      required: true,
      disabled: false,
      stepStrictly: false, // 严格步数
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
  }, {
    tag: 'tinymce',
    inputProps: {
      label: '编辑器',
      changeType: true,
      labelWidth: null,
      tagIcon: 'rich-text',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      placeholder: '请输入',
      height: 300, // 编辑器高度
      branding: false // 隐藏右下角品牌烙印
    },
    switchProps: {
      required: true,
      showLabel: true,
    },
    regList: [],
    document: 'http://tinymce.ax-z.cn'
  }]

  // 选择型组件
  static EL_SELECT_COMPONENTS = [{
    tag: 'el-select',
    inputProps: {
      label: '下拉选择',
      labelWidth: null,
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      changeType: true,
      placeholder: '请选择',
      style: { width: '100%' }
    },
    switchProps: {
      showLabel: true,
      required: true,
      multiple: false,
      disabled: false,
      filterable: false,
      clearable: true,
    },
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }],
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/select'
  }, {
    tag: 'el-cascader',
    inputProps: {
      label: '级联选择',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'options',
      labelWidth: null,
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 24,
      changeType: true,
      placeholder: '请选择',
      style: { width: '100%' },
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      },
      separator: '/'
    },
    switchProps: {
      required: true,
      showLabel: true,
      showAllLevels: true,
      disabled: false,
      clearable: true,
      filterable: false,
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
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
  }, {
    tag: 'el-radio-group',
    inputProps: {
      label: '单选框组',
      labelWidth: null,
      tagIcon: 'radio',
      changeType: true,
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      style: {},
      size: 'medium'
    },
    switchProps: {
      showLabel: true,
      required: true,
      border: false,
      disabled: false
    },
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }],
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/radio'
  }, {
    tag: 'el-radio-group',
    inputProps: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 24,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      changeType: true,
      style: {},
      size: 'medium',
      min: null,
      max: null
    },
    switchProps: {
      showLabel: true,
      required: true,
      border: false,
      disabled: false,
    },
    options: [{
      label: '选项一',
      value: 1
    }, {
      label: '选项二',
      value: 2
    }],
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/checkbox'
  }, {
    tag: 'el-switch',
    inputProps: {
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      span: 24,
      labelWidth: null,
      layout: 'colFormItem',
      changeType: true,
      style: {},
      'active-text': '',
      'inactive-text': '',
      'active-color': null,
      'inactive-color': null
    },
    switchProps: {
      showLabel: true,
      disabled: false,
      required: true,
      'active-value': true,
      'inactive-value': false
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/switch'
  }, {
    tag: 'el-slider',
    inputProps: {
      label: '滑块',
      tagIcon: 'slider',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      labelWidth: null,
      changeType: true,
      min: 0,
      max: 100,
      step: 1
    },
    switchProps: {
      showLabel: true,
      required: true,
      disabled: false,
      'show-stops': false,
      range: false
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/slider'
  }, {
    tag: 'el-time-picker',
    inputProps: {
      label: '时间选择',
      tagIcon: 'time',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      labelWidth: null,
      changeType: true,
      placeholder: '请选择',
      style: { width: '100%' },
      'picker-options': {
        selectableRange: '00:00:00-23:59:59'
      },
      format: 'HH:mm:ss',
      'value-format': 'HH:mm:ss'
    },
    switchProps: {
      showLabel: true,
      required: true,
      disabled: false,
      clearable: true,
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  }, {
    tag: 'el-time-picker',
    inputProps: {
      label: '时间范围',
      tagIcon: 'time-range',
      span: 24,
      labelWidth: null,
      layout: 'colFormItem',
      defaultValue: null,
      changeType: true,
      style: { width: '100%' },
      'range-separator': '至',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间',
      format: 'HH:mm:ss',
      'value-format': 'HH:mm:ss'
    },
    switchProps: {
      showLabel: true,
      required: true,
      disabled: false,
      clearable: true,
      'is-range': true,
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
  }, {
    tag: 'el-date-picker',
    inputProps: {
      label: '日期选择',
      tagIcon: 'date',
      defaultValue: null,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      changeType: true,
      placeholder: '请选择',
      type: 'date',
      style: { width: '100%' },
      format: 'yyyy-MM-dd',
      'value-format': 'yyyy-MM-dd',
    },
    switchProps: {
      showLabel: true,
      required: true,
      readonly: false,
      disabled: false,
      clearable: true,
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
  }, {
    tag: 'el-date-picker',
    inputProps: {
      label: '日期范围',
      tagIcon: 'date-range',
      defaultValue: null,
      span: 24,
      labelWidth: null,
      layout: 'colFormItem',
      changeType: true,
      type: 'daterange',
      'range-separator': '至',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期',
      format: 'yyyy-MM-dd',
      'value-format': 'yyyy-MM-dd',
      style: { width: '100%' },
    },
    switchProps: {
      showLabel: true,
      required: true,
      disabled: false,
      clearable: true,
      readonly: false
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
  }, {
    tag: 'el-rate',
    inputProps: {
      label: '评分',
      tagIcon: 'rate',
      defaultValue: 0,
      span: 24,
      labelWidth: null,
      layout: 'colFormItem',
      changeType: true,
      max: 5
    },
    switchProps: {
      showLabel: true,
      required: true,
      'allow-half': false,
      'show-text': false,
      'show-score': false,
      disabled: false
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/rate'
  }, {
    tag: 'el-color-picker',
    inputProps: {
      label: '颜色选择',
      tagIcon: 'color',
      span: 24,
      defaultValue: null,
      labelWidth: null,
      layout: 'colFormItem',
      changeType: true,
      'color-format': '',
      size: 'medium'
    },
    switchProps: {
      showLabel: true,
      required: true,
      'show-alpha': false,
      disabled: false,
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/color-picker'
  }, {
    tag: 'el-upload',
    inputProps: {
      label: '上传',
      tagIcon: 'upload',
      layout: 'colFormItem',
      defaultValue: null,
      labelWidth: null,
      span: 24,
      buttonText: '点击上传',
      changeType: true,
      fileSize: 2,
      sizeUnit: 'MB',
      action: 'https://jsonplaceholder.typicode.com/posts/',
      accept: '',
      name: 'file',
      'list-type': 'text'
    },
    switchProps: {
      showLabel: true,
      required: true,
      showTip: false,
      disabled: false,
      'auto-upload': true,
      multiple: false,
    },
    regList: [],
    document: 'https://element.eleme.cn/#/zh-CN/component/upload'
  }]

  // 高阶组件
  static EL_HIGHER_ORDER_COMPONENTS = [{
    tag: 'el-table',
    inputProps: {
      layout: 'colFormItem',
      tagIcon: 'table',
      span: 24,
      formId: 101,
      renderKey: 1595761764203,
      componentName: 'row101',
      showLabel: true,
      changeType: true,
      labelWidth: null,
      label: '表格',
      dataType: 'dynamic',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'data',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/tableData',
      columns: []
    },
    switchProps: {
      required: true,
      showLabel: true,
    },
    columnProps: {
      type: null,
      index: null,
      'column-key': null,
      label: '',
      prop: '',
      width: '',
      'min-width': '',
      fixed: false,
      sortable: false,
      resizable: true,
      'show-overflow-tooltip': true,
      align: 'left',

    },
    document: 'https://element.eleme.cn/#/zh-CN/component/table',
  }]
}

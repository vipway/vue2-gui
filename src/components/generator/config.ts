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
// 分页组件
export const pagination = {
  config: {
    type: 'pagination',
    tag: 'el-pagination',
    tagIcon: 'pagination',
    layout: 'block',
    label: '分页',
    document: 'https://element.eleme.cn/#/zh-CN/component/pagination#attributes',
  },
  props: {
    small: false,
    background: false,
    pageSize: 10,
    total: 0,
    // pageCount: 0,
    pagerCount: 7,
    currentPage: 1,
    layout: 'prev, pager, next, jumper, ->, total',
    pageSizes: [10, 20, 30, 40, 50, 100],
    popperClass: null,
    prevText: null,
    nextText: null,
    disabled: false,
    hideOnSinglePage: false
  }
}

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    // 私有配置
    config: {
      tag: 'el-row', // 元素标签名
      layout: 'layoutBlock', // 布局方式
      tagIcon: 'row', // 组件icon
      label: '行容器', // 组件名称
      layoutTree: true, // 是否树状, 是可嵌套子组件，否则不可嵌套组件
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    // 组件 props
    props: {
      gutter: 0,
      type: 'default',
      justify: 'start',
      align: 'top',
      tag: 'div'
    },
    class: {
      'drawing-row-item': true
    },
    style: {
      padding: '16px',
      'min-height': '80px',
      width: '100%'
    }
  },
  {
    // 私有配置
    config: {
      tag: 'el-col', // 元素标签名
      layout: 'layoutBlock', // 布局方式
      tagIcon: 'col', // 组件icon
      label: '列容器', // 组件名称
      layoutTree: true, // 是否树状, 是可嵌套子组件，否则不可嵌套组件
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    // 组件 prop
    props: {
      span: 6,
      offset: 0,
      push: 0,
      pull: 0,
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      tag: 'div'
    },
    class: {
      'drawing-row-item': true
    },
    style: {
      height: '30px',
      width: '100%'
    }
  }
]

// 组合组件
export const formComponents = [
  {
    config: {
      tag: 'el-form',
      layout: 'blockForm',
      label: '表单',
      tagIcon: 'form',
      showBtns: true,
      gutter: 12,
      span: 24,
      formBtns: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/form#form-attributes'
    },
    ref: 'elForm',
    props: {
      rules: {},
      inline: false,
      labelPosition: 'right',
      labelWidth: '100px',
      labelSuffix: '',
      hideRequiredAsterisk: false,
      showMessage: true,
      inlineMessage: false,
      statusIcon: false,
      validateOnRuleChange: true,
      size: 'medium',
      disabled: false,
    },
    children: [
      {
        config: {
          label: '单行文本',
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
        props: {
          clearable: false,
          'prefix-icon': '',
          'suffix-icon': '',
          maxlength: null,
          'show-word-limit': false,
          readonly: false,
          disabled: false,
          labelWidth: null
        },
        attrs: {
          placeholder: '请输入',
        },
        style: { width: '100%' }
      },
      {
        config: {
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
        props: {
          placeholder: '请选择',
          clearable: true,
          disabled: false,
          filterable: false,
          multiple: false
        },
        scopedSlots: {
          options: [{
            label: '选项一',
            value: 1
          }, {
            label: '选项二',
            value: 2
          }]
        },
        style: { width: '100%' }
      },
      {
        config: {
          type: 'inputNumber',
          tag: 'el-input-number',
          tagIcon: 'input',
          layout: 'colFormItem',
          label: '计数器',
          showLabel: true,
          required: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/input-number#attributes'
        },
        props: {
          min: 0,
          max: 100,
          step: 1,
          stepStrictly: false,
          precision: 0,
          size: 'large',
          disabled: false,
          controls: true,
          controlsPosition: 'right',
          name: null,
          label: null,
          placeholder: '请输入'
        },
        scopedSlots: {}
      },
      {
        config: {
          type: 'timeSelect',
          tag: 'el-time-select',
          tagIcon: 'time',
          layout: 'colFormItem',
          label: '时间选择器',
          showLabel: true,
          required: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/time-picker#attributes'
        },
        attrs: {
          name: null
        },
        props: {
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          size: 'medium',
          placeholder: '请选择时间',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          isRange: false,
          arrowControl: false,
          align: 'left',
          popperClass: null,
          pickerOptions: {},
          rangeSeparator: null,
          valueFormat: null,
          defaultValue: null,
          prefixIcon: 'el-icon-time',
          clearIcon: 'el-icon-circle-close'
        }
      },
      {
        config: {
          type: 'datePicker',
          tag: 'el-date-picker',
          tagIcon: 'date',
          layout: 'colFormItem',
          label: '日期选择器',
          showLabel: true,
          required: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/date-picker#attributes'
        },
        attrs: {
          name: null
        },
        props: {
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          size: 'medium',
          placeholder: '请选择日期',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'date',
          format: null,
          align: 'left',
          popperClass: null,
          pickerOptions: {},
          rangeSeparator: '-',
          defaultValue: null,
          defaultTime: null,
          valueFormat: null,
          unlinkPanels: false,
          prefixIcon: 'el-icon-time',
          clearIcon: 'el-icon-circle-close',
          validateEvent: true
        }
      },
      {
        config: {
          type: 'rate',
          tag: 'el-rate',
          tagIcon: 'rate',
          layout: 'colFormItem',
          label: '评分',
          showLabel: true,
          required: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/rate#attributes'
        },
        attrs: {
          name: null
        },
        props: {
          max: 5,
          disabled: false,
          allowHalf: false,
          lowThreshold: 2,
          highThreshold: 4,
          colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
          voidColor: '#C6D1DE',
          disabledVoidColor: '#EFF2F7',
          iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
          voidIconClass: 'el-icon-star-off',
          disabledVoidIconClass: 'el-icon-star-on',
          showText: false,
          showScore: false,
          textColor: '#1F2D3D',
          texts: ['极差', '失望', '一般', '满意', '惊喜']
        }
      },
      {
        config: {
          type: 'radio',
          tag: 'el-radio-group',
          tagIcon: 'radio',
          layout: 'colFormItem',
          label: '单选框组',
          showLabel: true,
          required: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes'
        },
        props: {
          size: 'medium',
          disabled: false,
          textColor: '#FFFFFF',
          fill: '#409EFF'
        },
        scopedSlots: {
          options: [{
            label: '是',
            value: 1
          }, {
            label: '否',
            value: 2
          }]
        }
      },
    ]
  },
  {
    config: {
      type: 'table',
      tag: 'el-table',
      tagIcon: 'table',
      layout: 'blockTable',
      label: '表格',
      pagination: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/table#table-attributes'
    },
    props: {
      data: [],
      height: 300,
      maxHeight: 500,
      stripe: false,
      border: true,
      size: 'medium',
      fit: true,
      showHeader: true,
      highlightCurrentRow: false,
      currentRowKey: null,
      // // rowClassName: () => ()
      // // rowStyle: () => ()
      // // cellClassName: () => ()
      // // cellStyle: () => ()
      // // headerRowClassName: () => ()
      // // headerRowStyle: () => ()
      // // headerCellClassName: () => ()
      // // headerCellStyle: () => ()
      // // rowKey: () => ()
      emptyText: '暂无数据',
      defaultExpandAll: false,
      expandRowKeys: null,
      defaultSort: null,
      tooltipEffect: 'dart',
      showSummary: false,
      sumText: '合计',
      // summaryMethod: () => ()
      // spanMethod: () => ()
      selectOnIndeterminate: false,
      indent: 16,
      lazy: false,
      // load: () => (),
      treeProps: null
    },
    scopedSlots: {
      columns: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'col2'
        },
        {
          label: '出生日期',
          prop: 'col3'
        },
        {
          label: '籍贯',
          prop: 'col5'
        },
        {
          label: '最高学历',
          prop: 'col5'
        },
        {
          label: '在职状态',
          prop: 'col6'
        },
        {
          label: '创建时间',
          prop: 'col7'
        },
        {
          label: '更新时间',
          prop: 'col8'
        }
      ]
    },
    style: {
      width: '100%'
    }
  }
]

// 基础组件
export const basicComponents = [
  {
    config: {
      type: 'input',
      tag: 'el-input',
      tagIcon: 'input',
      layout: 'block',
      label: '输入框',
      document: 'https://element.eleme.cn/#/zh-CN/component/input#input-attributes'
    },
    attrs: {
      placeholder: '请输入',
    },
    props: {
      maxlength: null,
      minlength: null,
      showWordLimit: false,
      clearable: false,
      showPassword: false,
      disabled: false,
      size: 'medium',
      prefixIcon: null,
      suffixIcon: null,
      rows: 2,
      autosize: false,
      autocomplete: 'off',
      name: null,
      readonly: false,
      max: null,
      min: null,
      step: null,
      resize: 'none',
      autofocus: false,
      form: null,
      label: null,
      tabindex: null,
      validateEvent: true
    },
    scopedSlots: {

    }
  },
  {
    config: {
      type: 'inputNumber',
      tag: 'el-input-number',
      tagIcon: 'input',
      layout: 'block',
      label: '计数器',
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number#attributes'
    },
    props: {
      min: 0,
      max: 100,
      step: 1,
      stepStrictly: false,
      precision: 0,
      size: 'large',
      disabled: false,
      controls: true,
      controlsPosition: 'right',
      name: null,
      label: null,
      placeholder: '请输入'
    },
    scopedSlots: {

    },
    style: {
      width: '100%'
    }
  },
  {
    config: {
      type: 'select',
      tag: 'el-select',
      tagIcon: 'input',
      layout: 'block',
      label: '选择器',
      document: 'https://element.eleme.cn/#/zh-CN/component/select#select-attributes'
    },
    props: {
      multiple: false,
      disabled: false,
      valueKey: null,
      size: 'medium',
      clearable: false,
      collapseTags: false,
      multipleLimit: 0,
      name: null,
      autocomplete: 'off',
      placeholder: '请选择',
      filterable: false,
      allowCreate: false,
      remote: false,
      loading: false,
      loadingText: null,
      noMatchText: null,
      noDataText: null,
      popperClass: null,
      reserveKeyword: false,
      defaultFirstOption: false,
      popperAppendToBody: true,
      automaticDropdown: false
    },
    scopedSlots: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {
      width: '100%'
    }
  },
  {
    config: {
      type: 'radio',
      tag: 'el-radio-group',
      tagIcon: 'radio',
      layout: 'block',
      label: '单选框组',
      document: 'https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes'
    },
    props: {
      size: 'medium',
      disabled: false,
      textColor: '#FFFFFF',
      fill: '#409EFF'
    },
    scopedSlots: {
      options: [{
        label: '是',
        value: 1
      }, {
        label: '否',
        value: 2
      }]
    }
  },
  {
    config: {
      type: 'checkbox',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      layout: 'block',
      label: '多选框组',
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox#duo-xuan-kuang-zu'
    },
    props: {
      size: 'medium',
      disabled: false,
      min: 0,
      max: 100,
      textColor: '#FFFFFF',
      fill: '#409EFF'
    },
    scopedSlots: {
      options: [{
        label: '选项1',
        value: 1
      }, {
        label: '选项2',
        value: 2
      }, {
        label: '选项3',
        value: 3
      }]
    }
  },
  {
    config: {
      type: 'switch',
      tag: 'el-switch',
      tagIcon: 'switch',
      layout: 'block',
      label: '开关',
      document: 'https://element.eleme.cn/#/zh-CN/component/switch#attributes'
    },
    attrs: {
      name: null,
    },
    props: {
      disabled: false,
      width: 40,
      activeIconClass: null,
      inactiveIconClass: null,
      activeText: null,
      inactiveText: null,
      activeValue: true,
      inactiveValue: false,
      activeColor: '#409EFF',
      inactiveColor: '#C0CCDA',
      validateEvent: true
    }
  },
  {
    config: {
      type: 'slider',
      tag: 'el-slider',
      tagIcon: 'slider',
      layout: 'block',
      label: '滑块',
      document: 'https://element.eleme.cn/#/zh-CN/component/slider#attributes'
    },
    props: {
      min: 0,
      max: 100,
      disabled: false,
      step: 1,
      showInput: false,
      showInputControls: true,
      inputSize: 'small',
      showStops: false,
      showTooltip: true,
      // formatTooltip: (val: string) => (),
      range: false,
      vertical: false,
      height: null,
      label: null,
      debounce: 300,
      tooltipClass: null,
      marks: { 10: '10', 50: '50', 100: '100' }
    }
  },
  {
    config: {
      type: 'timeSelect',
      tag: 'el-time-select',
      tagIcon: 'time',
      layout: 'block',
      label: '时间选择器',
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker#attributes'
    },
    attrs: {
      name: null
    },
    props: {
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      size: 'medium',
      placeholder: '请选择时间',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      isRange: false,
      arrowControl: false,
      align: 'left',
      popperClass: null,
      pickerOptions: {},
      rangeSeparator: null,
      valueFormat: null,
      defaultValue: null,
      prefixIcon: 'el-icon-time',
      clearIcon: 'el-icon-circle-close'
    }
  },
  {
    config: {
      type: 'datePicker',
      tag: 'el-date-picker',
      tagIcon: 'date',
      layout: 'block',
      label: '日期选择器',
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker#attributes'
    },
    attrs: {
      name: null
    },
    props: {
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      size: 'medium',
      placeholder: '请选择时间',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'date',
      format: null,
      align: 'left',
      popperClass: null,
      pickerOptions: {},
      rangeSeparator: '-',
      defaultValue: null,
      defaultTime: null,
      valueFormat: null,
      unlinkPanels: false,
      prefixIcon: 'el-icon-time',
      clearIcon: 'el-icon-circle-close',
      validateEvent: true
    }
  },
  {
    config: {
      type: 'rate',
      tag: 'el-rate',
      tagIcon: 'rate',
      layout: 'block',
      label: '评分',
      document: 'https://element.eleme.cn/#/zh-CN/component/rate#attributes'
    },
    attrs: {
      name: null
    },
    props: {
      max: 5,
      disabled: false,
      allowHalf: false,
      lowThreshold: 2,
      highThreshold: 4,
      colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
      voidColor: '#C6D1DE',
      disabledVoidColor: '#EFF2F7',
      iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
      voidIconClass: 'el-icon-star-off',
      disabledVoidIconClass: 'el-icon-star-on',
      showText: false,
      showScore: false,
      textColor: '#1F2D3D',
      texts: ['极差', '失望', '一般', '满意', '惊喜']
    }
  },
  {
    config: {
      type: 'colorPicker',
      tag: 'el-color-picker',
      tagIcon: 'rate',
      layout: 'block',
      label: '颜色选择器',
      document: 'https://element.eleme.cn/#/zh-CN/component/color-picker#attributes'
    },
    attrs: {
    },
    props: {
      disabled: false,
      size: 'medium',
      showAlpha: false,
      colorFormat: 'hex',
      popperClass: null,
      predefine: null
    }
  }
] 

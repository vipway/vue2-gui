/* eslint-disable max-len */
import ruleTrigger from './ruleTrigger'

let confGlobal: any
let someSpanIsNot24: any

export function dialogWrapper (str: string) {
  return `<el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
    ${str}
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>`
}

export function vueTemplate (str: string) {
  return `<template>
    <div>
      ${str}
    </div>
  </template>`
}

export function vueScript (str: string) {
  return `<script>
    ${str}
  </script>`
}

export function cssStyle (cssStr: string) {
  return `<style>
    ${cssStr}
  </style>`
}

function buildFromBtns (scheme: any, type: string) {
  let str = ''
  if (scheme.formBtns && type === 'file') {
    str = `<el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>`
    if (someSpanIsNot24) {
      str = `<el-col :span="24">
          ${str}
        </el-col>`
    }
  }
  return str
}

function buildFormTemplate (scheme: any, child: string, type: string) {
  let labelPosition = ''
  if (scheme.labelPosition !== 'right') {
    labelPosition = `label-position="${scheme.labelPosition}"`
  }
  const disabled = scheme.disabled ? `:disabled="${scheme.disabled}"` : ''
  let str = `<el-form ref="${scheme.formRef}" :model="${scheme.config.formModel}" :rules="${scheme.formRules}" size="${scheme.size}" ${disabled} label-width="${scheme.labelWidth}px" ${labelPosition}>
      ${child}
      ${buildFromBtns(scheme, type)}
    </el-form>`
  if (someSpanIsNot24) {
    str = `<el-row :gutter="${scheme.gutter}">
        ${str}
      </el-row>`
  }
  return str
}

// span不为24的用el-col包裹
function colWrapper (scheme: any, str: string) {
  if (someSpanIsNot24 || scheme.__config__.span !== 24) {
    return `<el-col :span="${scheme.__config__.span}">
      ${str}
    </el-col>`
  }
  return str
}

function attrBuilder (el: any) {
  console.log(confGlobal, 'attrBuilder')
  return {
    tag: el.config.tag,
    vModel: `v-model="${confGlobal ? `${confGlobal.config.formModel}.${el.vModel}` : el.vModel}"`,
    clearable: el.clearable ? 'clearable' : '',
    placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
    width: el.style && el.style.width ? ':style="{width: \'100%\'}"' : '',
    disabled: el.disabled ? ':disabled=\'true\'' : ''
  }
}

// el-button 子级
function buildElButtonChild (scheme: any) {
  const children = []
  const slot = scheme.__slot__ || {}
  if (slot.default) {
    children.push(slot.default)
  }
  return children.join('\n')
}

// el-input 子级
function buildElInputChild (scheme: any) {
  const children = []
  const slot = scheme.__slot__
  if (slot && slot.prepend) {
    children.push(`<template slot="prepend">${slot.prepend}</template>`)
  }
  if (slot && slot.append) {
    children.push(`<template slot="append">${slot.append}</template>`)
  }
  return children.join('\n')
}

// el-select 子级
function buildElSelectChild (scheme: any) {
  const children = []
  const slot = scheme.__slot__
  if (slot && slot.options && slot.options.length) {
    children.push(`<el-option v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`)
  }
  return children.join('\n')
}

// el-radio-group 子级
function buildElRadioGroupChild (scheme: any) {
  const children = []
  const slot = scheme.__slot__
  const config = scheme.__config__
  if (slot && slot.options && slot.options.length) {
    const tag = config.optionType === 'button' ? 'el-radio-button' : 'el-radio'
    const border = config.border ? 'border' : ''
    children.push(`<${tag} v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.label}}</${tag}>`)
  }
  return children.join('\n')
}

// el-checkbox-group 子级
function buildElCheckboxGroupChild (scheme: any) {
  const children = []
  const slot = scheme.__slot__
  const config = scheme.__config__
  if (slot && slot.options && slot.options.length) {
    const tag = config.optionType === 'button' ? 'el-checkbox-button' : 'el-checkbox'
    const border = config.border ? 'border' : ''
    children.push(`<${tag} v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.label}}</${tag}>`)
  }
  return children.join('\n')
}

// el-upload 子级
function buildElUploadChild (scheme: any) {
  const list = []
  const config = scheme.__config__
  if (scheme['list-type'] === 'picture-card') list.push('<i class="el-icon-plus"></i>')
  else list.push(`<el-button size="small" type="primary" icon="el-icon-upload">${config.buttonText}</el-button>`)
  if (config.showTip) list.push(`<div slot="tip" class="el-upload__tip">只能上传不超过 ${config.fileSize}${config.sizeUnit} 的${scheme.accept}文件</div>`)
  return list.join('\n')
}

const tags: any = {
  'el-button': (el: any) => {
    const {
      tag, disabled
    } = attrBuilder(el)
    const type = el.type ? `type="${el.type}"` : ''
    const icon = el.icon ? `icon="${el.icon}"` : ''
    const round = el.round ? 'round' : ''
    const size = el.size ? `size="${el.size}"` : ''
    const plain = el.plain ? 'plain' : ''
    const circle = el.circle ? 'circle' : ''
    let child = buildElButtonChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${type} ${icon} ${round} ${size} ${plain} ${disabled} ${circle}>${child}</${tag}>`
  },
  'el-input': (el: any) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el)
    const maxlength = el.maxlength ? `:maxlength="${el.maxlength}"` : ''
    const showWordLimit = el['show-word-limit'] ? 'show-word-limit' : ''
    const readonly = el.readonly ? 'readonly' : ''
    const prefixIcon = el['prefix-icon'] ? `prefix-icon='${el['prefix-icon']}'` : ''
    const suffixIcon = el['suffix-icon'] ? `suffix-icon='${el['suffix-icon']}'` : ''
    const showPassword = el['show-password'] ? 'show-password' : ''
    const type = el.type ? `type="${el.type}"` : ''
    const autosize = el.autosize && el.autosize.minRows
      ? `:autosize="{minRows: ${el.autosize.minRows}, maxRows: ${el.autosize.maxRows}}"`
      : ''
    let child = buildElInputChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${type} ${placeholder} ${maxlength} ${showWordLimit} ${readonly} ${disabled} ${clearable} ${prefixIcon} ${suffixIcon} ${showPassword} ${autosize} ${width}>${child}</${tag}>`
  },
  'el-input-number': (el: any) => {
    const {
      tag, disabled, vModel, placeholder
    } = attrBuilder(el)
    const controlsPosition = el['controls-position'] ? `controls-position=${el['controls-position']}` : ''
    const min = el.min ? `:min='${el.min}'` : ''
    const max = el.max ? `:max='${el.max}'` : ''
    const step = el.step ? `:step='${el.step}'` : ''
    const stepStrictly = el['step-strictly'] ? 'step-strictly' : ''
    const precision = el.precision ? `:precision='${el.precision}'` : ''

    return `<${tag} ${vModel} ${placeholder} ${step} ${stepStrictly} ${precision} ${controlsPosition} ${min} ${max} ${disabled}></${tag}>`
  },
  'el-select': (el: any) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el)
    const filterable = el.filterable ? 'filterable' : ''
    const multiple = el.multiple ? 'multiple' : ''
    let child = buildElSelectChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${placeholder} ${disabled} ${multiple} ${filterable} ${clearable} ${width}>${child}</${tag}>`
  },
  'el-radio-group': (el: any) => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const size = `size="${el.size}"`
    let child = buildElRadioGroupChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${size} ${disabled}>${child}</${tag}>`
  },
  'el-checkbox-group': (el: any) => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const size = `size="${el.size}"`
    const min = el.min ? `:min="${el.min}"` : ''
    const max = el.max ? `:max="${el.max}"` : ''
    let child = buildElCheckboxGroupChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${min} ${max} ${size} ${disabled}>${child}</${tag}>`
  },
  'el-switch': (el: any) => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const activeText = el['active-text'] ? `active-text="${el['active-text']}"` : ''
    const inactiveText = el['inactive-text'] ? `inactive-text="${el['inactive-text']}"` : ''
    const activeColor = el['active-color'] ? `active-color="${el['active-color']}"` : ''
    const inactiveColor = el['inactive-color'] ? `inactive-color="${el['inactive-color']}"` : ''
    const activeValue = el['active-value'] !== true ? `:active-value='${JSON.stringify(el['active-value'])}'` : ''
    const inactiveValue = el['inactive-value'] !== false ? `:inactive-value='${JSON.stringify(el['inactive-value'])}'` : ''

    return `<${tag} ${vModel} ${activeText} ${inactiveText} ${activeColor} ${inactiveColor} ${activeValue} ${inactiveValue} ${disabled}></${tag}>`
  },
  'el-cascader': (el: any) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el)
    const options = el.options ? `:options="${el.__vModel__}Options"` : ''
    const props = el.props ? `:props="${el.__vModel__}Props"` : ''
    const showAllLevels = el['show-all-levels'] ? '' : ':show-all-levels="false"'
    const filterable = el.filterable ? 'filterable' : ''
    const separator = el.separator === '/' ? '' : `separator="${el.separator}"`

    return `<${tag} ${vModel} ${options} ${props} ${width} ${showAllLevels} ${placeholder} ${separator} ${filterable} ${clearable} ${disabled}></${tag}>`
  },
  'el-slider': (el: any) => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const min = el.min ? `:min='${el.min}'` : ''
    const max = el.max ? `:max='${el.max}'` : ''
    const step = el.step ? `:step='${el.step}'` : ''
    const range = el.range ? 'range' : ''
    const showStops = el['show-stops'] ? `:show-stops="${el['show-stops']}"` : ''

    return `<${tag} ${min} ${max} ${step} ${vModel} ${range} ${showStops} ${disabled}></${tag}>`
  },
  'el-time-picker': (el: any) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el)
    const startPlaceholder = el['start-placeholder'] ? `start-placeholder="${el['start-placeholder']}"` : ''
    const endPlaceholder = el['end-placeholder'] ? `end-placeholder="${el['end-placeholder']}"` : ''
    const rangeSeparator = el['range-separator'] ? `range-separator="${el['range-separator']}"` : ''
    const isRange = el['is-range'] ? 'is-range' : ''
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const pickerOptions = el['picker-options'] ? `:picker-options='${JSON.stringify(el['picker-options'])}'` : ''

    return `<${tag} ${vModel} ${isRange} ${format} ${valueFormat} ${pickerOptions} ${width} ${placeholder} ${startPlaceholder} ${endPlaceholder} ${rangeSeparator} ${clearable} ${disabled}></${tag}>`
  },
  'el-date-picker': (el: any) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el)
    const startPlaceholder = el['start-placeholder'] ? `start-placeholder="${el['start-placeholder']}"` : ''
    const endPlaceholder = el['end-placeholder'] ? `end-placeholder="${el['end-placeholder']}"` : ''
    const rangeSeparator = el['range-separator'] ? `range-separator="${el['range-separator']}"` : ''
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const type = el.type === 'date' ? '' : `type="${el.type}"`
    const readonly = el.readonly ? 'readonly' : ''

    return `<${tag} ${type} ${vModel} ${format} ${valueFormat} ${width} ${placeholder} ${startPlaceholder} ${endPlaceholder} ${rangeSeparator} ${clearable} ${readonly} ${disabled}></${tag}>`
  },
  'el-rate': (el: any) => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const max = el.max ? `:max='${el.max}'` : ''
    const allowHalf = el['allow-half'] ? 'allow-half' : ''
    const showText = el['show-text'] ? 'show-text' : ''
    const showScore = el['show-score'] ? 'show-score' : ''

    return `<${tag} ${vModel} ${max} ${allowHalf} ${showText} ${showScore} ${disabled}></${tag}>`
  },
  'el-color-picker': (el: any) => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const size = `size="${el.size}"`
    const showAlpha = el['show-alpha'] ? 'show-alpha' : ''
    const colorFormat = el['color-format'] ? `color-format="${el['color-format']}"` : ''

    return `<${tag} ${vModel} ${size} ${showAlpha} ${colorFormat} ${disabled}></${tag}>`
  },
  'el-upload': (el: any) => {
    const { tag } = el.__config__
    const disabled = el.disabled ? ':disabled=\'true\'' : ''
    const action = el.action ? `:action="${el.__vModel__}Action"` : ''
    const multiple = el.multiple ? 'multiple' : ''
    const listType = el['list-type'] !== 'text' ? `list-type="${el['list-type']}"` : ''
    const accept = el.accept ? `accept="${el.accept}"` : ''
    const name = el.name !== 'file' ? `name="${el.name}"` : ''
    const autoUpload = el['auto-upload'] === false ? ':auto-upload="false"' : ''
    const beforeUpload = `:before-upload="${el.__vModel__}BeforeUpload"`
    const fileList = `:file-list="${el.__vModel__}fileList"`
    const ref = `ref="${el.__vModel__}"`
    let child = buildElUploadChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${ref} ${fileList} ${action} ${autoUpload} ${multiple} ${beforeUpload} ${listType} ${accept} ${name} ${disabled}>${child}</${tag}>`
  },
  tinymce: (el: any) => {
    const { tag, vModel, placeholder } = attrBuilder(el)
    const height = el.height ? `:height="${el.height}"` : ''
    const branding = el.branding ? `:branding="${el.branding}"` : ''
    return `<${tag} ${vModel} ${placeholder} ${height} ${branding}></${tag}>`
  }
}

const layouts: any = {

  block (scheme: any) {
    console.log('block', scheme)
  },
  blockForm (scheme: any) {
    const { children, ...formConfig } = scheme
    let labelPosition = ''
    if (scheme.labelPosition !== 'right') {
      labelPosition = `label-position="${scheme.labelPosition}"`
    }
    let child = ''
    if (Array.isArray(children)) {
      confGlobal = formConfig
      child = children.map((el: any) => layouts[el.config.layout](el)).join('\n')
      confGlobal = null
    }
    const disabled = scheme.disabled ? `:disabled="${scheme.disabled}"` : ''
    const formStr = `<el-form ref="${scheme.ref}" :model="${formConfig.config.formModel}" :rules="${scheme.rules}" size="${scheme.size}" ${disabled} label-width="${scheme.labelWidth}px" ${labelPosition}>
        ${child}
      </el-form>`
    return formStr
  },
  blockTable (scheme: any) {
    // do somtething
  },

  colFormItem (scheme: any) {
    const config = scheme.config
    const tag = scheme.config.tag
    let labelWidth = ''
    let label = `label="${config.label}"`
    console.log(confGlobal, 'confGlobal')
    if (config.labelWidth && config.labelWidth !== confGlobal.props.labelWidth) {
      labelWidth = `label-width="${config.labelWidth}px"`
    }
    if (config.showLabel === false) {
      labelWidth = 'label-width="0"'
      label = ''
    }
    const required = !(ruleTrigger as any)[tag] && config.required ? 'required' : ''
    const tagDom = tags[tag] ? tags[tag](scheme) : null
    const str = `<el-form-item ${labelWidth} ${label} prop="${scheme.vModel}" ${required}>
        ${tagDom}
      </el-form-item>`
    // str = colWrapper(scheme, str)
    return str
  },
  rowFormItem (scheme: any) {
    const config = scheme.__config__
    const type = scheme.type === 'default' ? '' : `type="${scheme.type}"`
    const justify = scheme.type === 'default' ? '' : `justify="${scheme.justify}"`
    const align = scheme.type === 'default' ? '' : `align="${scheme.align}"`
    const gutter = scheme.gutter ? `:gutter="${scheme.gutter}"` : ''
    const children = config.children.map((el: any) => layouts[el.config.layout](el))
    let str = `<el-row ${type} ${justify} ${align} ${gutter}>
      ${children.join('\n')}
    </el-row>`
    str = colWrapper(scheme, str)
    return str
  }
}

/**
 * 组装html代码。【入口函数】
 * @param {Object} configList 页面配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpHtml (configList: any[], type: any) {
  const htmlList = [] as any
  // 判断布局是否都沾满了24个栅格，以备后续简化代码结构
  // someSpanIsNot24 = configList.some((item: any) => item.config.span !== 24)
  // 遍历渲染每个组件成html
  console.log(configList, 'configList')
  configList.forEach((el: any) => {
    htmlList.push(layouts[el.config.layout](el))
  })
  let htmlStr = htmlList.join('\n')
  console.log(htmlStr, 'htmlStr')
  // 将组件代码放进form标签
  // let temp = buildFormTemplate(formConfig, htmlStr, type)
  // dialog标签包裹代码
  if (type === 'dialog') {
    htmlStr = dialogWrapper(htmlStr)
    // temp = dialogWrapper(temp)
  }
  return htmlStr
}


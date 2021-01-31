import Vue from 'vue'
import { isNumberStr } from '@/utils/index'
import { saveFormConf } from '@/utils/db'
import IconsDialog from '../IconsDialog'
import TreeNodeDialog from '../TreeNodeDialog'
// import {
//   inputComponents, selectComponents
// } from '@/components/generator/config'

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}
// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default Vue.extend({
  components: {
    TreeNodeDialog,
    IconsDialog
  },
  props: {
    showField: Boolean,
    activeData: Object,
    formConf: Object
  },
  data () {
    return {
      currentTab: 'field',
      currentNode: [] as any,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      // activeTag: '',
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
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
        }
      ],
      tagList: [
        // {
        //   label: '输入型组件',
        //   options: inputComponents
        // },
        // {
        //   label: '选择型组件',
        //   options: selectComponents
        // }
      ],
      layoutTreeProps: {
        label (data: any) {
          const config = data.__config__
          return data.componentName || `${config.label}: ${data.__vModel__}`
        }
      }
    }
  },
  computed: {
    documentLink () {
      return (
        this.activeData.__config__.document
        || 'https://element.eleme.cn/#/zh-CN/component/installation'
      )
    },
    dateOptions (): Array<any> {
      if (
        this.activeData.type !== undefined
        && this.activeData.__config__.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },

    activeTag () {
      return this.activeData.__config__.tag
    },
    isShowMin () {
      return ['el-input-number', 'el-slider'].indexOf(this.activeData.__config__.tag) > -1
    },
    isShowMax () {
      return ['el-input-number', 'el-slider', 'el-rate'].indexOf(this.activeData.__config__.tag) > -1
    },
    isShowStep () {
      return ['el-input-number', 'el-slider'].indexOf(this.activeData.__config__.tag) > -1
    }
  },
  watch: {
    formConf: {
      handler (val) {
        saveFormConf(val)
      },
      deep: true
    }
  },
  methods: {
    addReg () {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      })
    },
    addSelectItem () {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem () {
      // ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    append (data: any) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    renderContent (h: any, props: any) {
      const { node, data, store } = props
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },
    remove (node: any, data: any) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex((d: any) => d.id === data.id)
      children.splice(index, 1)
    },
    addNode (data: any) {
      this.currentNode.push(data)
    },
    setOptionValue (item: any, val: string) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue (val: string) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput (str: string) {
      if (Array.isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput (val: any, name: string) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue (val: string, type?: string) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    spanChange (val: string) {
      this.formConf.span = val
    },
    multipleChange (val: string) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
    },
    dateTypeChange (val: 'date') {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange (val: string) {
      this.$set(
        this.activeData.__config__,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange (val: string) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange (val: string) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange (val: string) {
      this.activeData.__config__.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },
    openIconsDialog (model: any) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon (val: string) {
      this.activeData[this.currentIconModel as any] = val
    },
    tagChange (tagIcon: string) {
      // let target: any = inputComponents.find((item: any) => item.__config__.tagIcon === tagIcon)
      // if (!target) {
      //   target = selectComponents.find((item: any) => item.__config__.tagIcon === tagIcon)
      // }
      // this.$emit('change-tab', target)
    },
    changeRenderKey () {
      if (needRerenderList.includes(this.activeData.__config__.tag)) {
        this.activeData.__config__.renderKey = +new Date()
      }
    }
  },
  render () {
    if (!this.activeData || typeof this.activeData !== 'object' || Object.keys(this.activeData).length < 1) {
      return <div></div>
    }
    return (
      <div class="right-board">
        <el-tabs v-model={this.currentTab} class="center-tabs">
          <el-tab-pane label="组件属性" name="field" />
          <el-tab-pane label="表单属性" name="form" />
        </el-tabs>
        <div class="field-box">
          <a class="document-link" target="_blank" href={this.documentLink} title="查看组件文档">
            <i class="el-icon-link" />
          </a>
          <el-scrollbar class="right-scrollbar">

            {/* <!-- 组件属性 --> */}
            <el-form v-show={this.currentTab === 'field' && this.showField} size="small" label-width="90px">
              {/* 动态生成组建属性 */}
              <el-form-item v-show={this.activeData.__config__.changeTag} label="组件类型">
                <el-select
                  v-model={this.activeData.__config__.tagIcon}
                  placeholder="请选择组件类型"
                  style={{ width: '100%' }}
                  onChange={this.tagChange}
                >
                  {
                    this.tagList.map((group: any) => (
                      <el-option-group key={group.label} label={group.label}>
                        {
                          group.options.map((item: any) => (
                            <el-option
                              key={item.__config__.label}
                              label={item.__config__.label}
                              value={item.__config__.tagIcon}
                            >
                              <svg-icon class="node-icon" iconClass={item.__config__.tagIcon} />
                              <span> {item.__config__.label}</span>
                            </el-option>
                          ))
                        }
                      </el-option-group>
                    ))
                  }
                </el-select>
              </el-form-item>
              {
                this.activeData.__vModel__ ? <el-form-item label="字段名">
                  <el-input v-model={this.activeData.__vModel__} placeholder="请输入字段名（v-model）" />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.componentName ? <el-form-item label="组件名">
                  {this.activeData.__config__.componentName}
                </el-form-item> : null
              }
              {
                this.activeData.__config__.label ? <el-form-item label="标题">
                  <el-input v-model={this.activeData.__config__.label} placeholder="请输入标题" onInput={this.changeRenderKey} />
                </el-form-item> : null
              }
              {
                this.activeData.placeholder ? <el-form-item label="占位提示">
                  <el-input v-model={this.activeData.placeholder} placeholder="请输入占位提示" onInput={this.changeRenderKey} />
                </el-form-item> : null
              }
              {
                this.activeData['start-placeholder'] ? <el-form-item label="开始占位">
                  <el-input v-model={this.activeData['start-placeholder']} placeholder="请输入占位提示" />
                </el-form-item> : null
              }
              {
                this.activeData['end-placeholder'] ? <el-form-item label="结束占位">
                  <el-input v-model={this.activeData['end-placeholder']} placeholder="请输入占位提示" />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.span ? <el-form-item label="表单栅格">
                  <el-slider v-model={this.activeData.__config__.span} max={24} min={1} marks={{ 12: '' }} onChange={this.spanChange} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.layout && this.activeData.gutter ? <el-form-item label="栅格间隔">
                  <el-input-number v-model={this.activeData.gutter} min={0} placeholder="栅格间隔" />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.layout === 'rowFormItem' && this.activeData.type ? <el-form-item label="布局模式">
                  <el-radio-group v-model={this.activeData.type}>
                    <el-radio-button label="default" />
                    <el-radio-button label="flex" />
                  </el-radio-group>
                </el-form-item> : null
              }
              {
                this.activeData.justify && this.activeData.type === 'flex' ? <el-form-item label="水平排列">
                  <el-select v-model={this.activeData.justify} placeholder="请选择水平排列" style={{ width: '100%' }}>
                    {
                      this.justifyOptions.map((item, index) => (
                        <el-option
                          key={index}
                          label={item.label}
                          value={item.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item> : null
              }
              {
                this.activeData.align && this.activeData.type === 'flex' ? <el-form-item label="垂直排列">
                  <el-radio-group v-model={this.activeData.align}>
                    <el-radio-button label="top" />
                    <el-radio-button label="middle" />
                    <el-radio-button label="bottom" />
                  </el-radio-group>
                </el-form-item> : null
              }
              <el-form-item v-show={this.activeData.__config__.labelWidth !== undefined} label="标签宽度">
                <el-input v-model={this.activeData.__config__.labelWidth} type="number" placeholder="请输入标签宽度" />
              </el-form-item>
              {
                this.activeData.style && this.activeData.style.width ? <el-form-item label="组件宽度">
                  <el-input v-model={this.activeData.style.width} placeholder="请输入组件宽度" clearable />
                </el-form-item> : null
              }
              {
                this.activeData.__vModel__ ? <el-form-item label="默认值">
                  <el-input
                    value={this.setDefaultValue(this.activeData.__config__.defaultValue)}
                    placeholder="请输入默认值"
                    onInput={this.onDefaultValueInput}
                  />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-checkbox-group' ? <el-form-item label="至少应选">
                  <el-input-number
                    value={this.activeData.min}
                    min={0}
                    placeholder="至少应选"
                    onInput={(e: any) => this.$set(this.activeData, 'min', e ? e : undefined)}
                  />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-checkbox-group' ? <el-form-item label="最多可选">
                  <el-input-number
                    value={this.activeData.max}
                    min={0}
                    placeholder="最多可选"
                    onInput={(e: any) => this.$set(this.activeData, 'max', e ? e : undefined)}
                  />
                </el-form-item> : null
              }
              {
                this.activeData.__slot__ && this.activeData.__slot__.prepend ? <el-form-item label="前缀">
                  <el-input v-model={this.activeData.__slot__.prepend} placeholder="请输入前缀" />
                </el-form-item> : null
              }
              {
                this.activeData.__slot__ && this.activeData.__slot__.append ? <el-form-item label="后缀">
                  <el-input v-model={this.activeData.__slot__.append} placeholder="请输入后缀" />
                </el-form-item> : null
              }
              {
                this.activeData['prefix-icon'] ? <el-form-item label="前图标">
                  <el-input v-model={this.activeData['prefix-icon']} placeholder="请输入前图标名称">
                    <el-button slot="append" icon="el-icon-thumb" onClick={this.openIconsDialog.bind('prefix-icon')}>
                      选择
                    </el-button>
                  </el-input>
                </el-form-item> : null
              }
              {
                this.activeData['suffix-icon'] ? <el-form-item label="后图标">
                  <el-input v-model={this.activeData['suffix-icon']} placeholder="请输入后图标名称">
                    <el-button slot="append" icon="el-icon-thumb" onClick={this.openIconsDialog('suffix-icon')}>
                      选择
                    </el-button>
                  </el-input>
                </el-form-item> : null
              }
              {
                this.activeData['icon'] && this.activeData.__config__.tag === 'el-button' ? <el-form-item label="按钮图标">
                  <el-input v-model={this.activeData['icon']} placeholder="请输入按钮图标名称">
                    <el-button slot="append" icon="el-icon-thumb" onClick={this.openIconsDialog('icon')}>
                      选择
                    </el-button>
                  </el-input>
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-cascader' ? <el-form-item label="选项分隔符">
                  <el-input v-model={this.activeData.separator} placeholder="请输入选项分隔符" />
                </el-form-item> : null
              }
              {
                this.activeData.autosize && this.activeData.autosize.minRows ? <el-form-item label="最小行数">
                  <el-input-number v-model={this.activeData.autosize.minRows} min={1} placeholder="最小行数" />
                </el-form-item> : null
              }
              {
                this.activeData.autosize && this.activeData.autosize.maxRows ? <el-form-item label="最大行数">
                  <el-input-number v-model={this.activeData.autosize.maxRows} min={1} placeholder="最大行数" />
                </el-form-item> : null
              }
              {
                this.isShowMin ? <el-form-item label="最小值">
                  <el-input-number v-model={this.activeData.min} placeholder="最小值" />
                </el-form-item> : null
              }
              {
                this.isShowMax ? <el-form-item label="最大值">
                  <el-input-number v-model={this.activeData.max} placeholder="最大值" />
                </el-form-item> : null
              }
              {
                this.activeData.height ? <el-form-item label="组件高度">
                  <el-input-number v-model={this.activeData.height} placeholder="高度" onInput={this.changeRenderKey} />
                </el-form-item> : null
              }
              {
                this.isShowStep ? <el-form-item label="步长">
                  <el-input-number v-model={this.activeData.step} placeholder="步数" />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-input-number' ? <el-form-item label="精度">
                  <el-input-number v-model={this.activeData.precision} min={0} placeholder="精度" />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-input-number' ? <el-form-item label="按钮位置">
                  <el-radio-group v-model={this.activeData['controls-position']}>
                    <el-radio-button label="">
                      默认
                  </el-radio-button>
                    <el-radio-button label="right">
                      右侧
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item> : null
              }
              {
                this.activeData.maxlength ? <el-form-item label="最多输入">
                  <el-input v-model={this.activeData.maxlength} placeholder="请输入字符长度">
                    <template slot="append">
                      个字符
                    </template>
                  </el-input>
                </el-form-item> : null
              }
              {
                this.activeData['active-text'] ? <el-form-item label="开启提示">
                  <el-input v-model={this.activeData['active-text']} placeholder="请输入开启提示" />
                </el-form-item> : null
              }
              {
                this.activeData['inactive-text'] ? <el-form-item label="关闭提示">
                  <el-input v-model={this.activeData['inactive-text']} placeholder="请输入关闭提示" />
                </el-form-item> : null
              }
              {
                this.activeData['active-value'] ? <el-form-item label="开启值">
                  <el-input
                    value={this.setDefaultValue(this.activeData['active-value'])}
                    placeholder="请输入开启值"
                    onInput={(e: any) => this.onSwitchValueInput(e, 'active-value')}
                  />
                </el-form-item> : null
              }
              {
                this.activeData['inactive-value'] ? <el-form-item label="关闭值">
                  <el-input
                    value={this.setDefaultValue(this.activeData['inactive-value'])}
                    placeholder="请输入关闭值"
                    onInput={(e: any) => this.onSwitchValueInput(e, 'inactive-value')}
                  />
                </el-form-item> : null
              }
              {
                this.activeData.type && 'el-date-picker' === this.activeData.__config__.tag ? <el-form-item label="时间类型">
                  <el-select
                    v-model={this.activeData.type}
                    placeholder="请选择时间类型"
                    style={{ width: '100%' }}
                    onChange={this.dateTypeChange}
                  >
                    {
                      this.dateOptions.map((item, index) => (
                        <el-option
                          key={index}
                          label={item.label}
                          value={item.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item> : null
              }
              {
                this.activeData.name ? <el-form-item label="文件字段名">
                  <el-input v-model={this.activeData.name} placeholder="请输入上传文件字段名" />
                </el-form-item> : null
              }
              {
                this.activeData.accept ? <el-form-item label="文件类型">
                  <el-select
                    v-model={this.activeData.accept}
                    placeholder="请选择文件类型"
                    style={{ width: '100%' }}
                    clearable
                  >
                    <el-option label="图片" value="image/*" />
                    <el-option label="视频" value="video/*" />
                    <el-option label="音频" value="audio/*" />
                    <el-option label="excel" value=".xls,.xlsx" />
                    <el-option label="word" value=".doc,.docx" />
                    <el-option label="pdf" value=".pdf" />
                    <el-option label="txt" value=".txt" />
                  </el-select>
                </el-form-item> : null
              }
              {
                this.activeData.__config__.fileSize ? <el-form-item label="文件大小">
                  <el-input v-model={this.activeData.__config__.fileSize} placeholder="请输入文件大小">
                    <el-select slot="append" v-model={this.activeData.__config__.sizeUnit} style={{ width: '66px' }}>
                      <el-option label="KB" value="KB" />
                      <el-option label="MB" value="MB" />
                      <el-option label="GB" value="GB" />
                    </el-select>
                  </el-input>
                </el-form-item> : null
              }
              {
                this.activeData.__config__.fileSize ? <el-form-item label="文件大小">
                  <el-input v-model={this.activeData.__config__.fileSize} placeholder="请输入文件大小">
                    <el-select slot="append" v-model={this.activeData.__config__.sizeUnit} style={{ width: '66px' }}>
                      <el-option label="KB" value="KB" />
                      <el-option label="MB" value="MB" />
                      <el-option label="GB" value="GB" />
                    </el-select>
                  </el-input>
                </el-form-item> : null
              }
              {
                this.activeData.action ? <el-form-item label="上传地址">
                  <el-input v-model={this.activeData.action} placeholder="请输入上传地址" clearable />
                </el-form-item> : null
              }
              {
                this.activeData['list-type'] ? <el-form-item label="列表类型">
                  <el-radio-group v-model={this.activeData['list-type']} size="small">
                    <el-radio-button label="text">
                      text
                    </el-radio-button>
                    <el-radio-button label="picture">
                      picture
                    </el-radio-button>
                    <el-radio-button label="picture-card">
                      picture-card
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item> : null
              }
              {
                this.activeData.type && this.activeData.__config__.tag === 'el-button' ? <el-form-item label="按钮类型">
                  <el-select v-model={this.activeData.type} style={{ width: '100%' }}>
                    <el-option label="primary" value="primary" />
                    <el-option label="success" value="success" />
                    <el-option label="warning" value="warning" />
                    <el-option label="danger" value="danger" />
                    <el-option label="info" value="info" />
                    <el-option label="text" value="text" />
                  </el-select>
                </el-form-item> : null
              }
              {
                this.activeData.__config__.buttonText ? <el-form-item v-show={'picture-card' !== this.activeData['list-type']} label="按钮文字">
                  <el-input v-model={this.activeData.__config__.buttonText} placeholder="请输入按钮文字" />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-button' ? <el-form-item label="按钮文字">
                  <el-input v-model={this.activeData.__slot__.default} placeholder="请输入按钮文字" />
                </el-form-item> : null
              }
              {
                this.activeData['range-separator'] ? <el-form-item label="分隔符">
                  <el-input v-model={this.activeData['range-separator']} placeholder="请输入分隔符" />
                </el-form-item> : null
              }
              {
                this.activeData['picker-options'] ? <el-form-item label="时间段">
                  <el-input
                    v-model={this.activeData['picker-options'].selectableRange}
                    placeholder="请输入时间段"
                  />
                </el-form-item> : null
              }
              {
                this.activeData.format ? <el-form-item label="时间格式">
                  <el-input
                    value={this.activeData.format}
                    placeholder="请输入时间格式"
                    onInput={this.setTimeValue}
                  />
                </el-form-item> : null
              }
              {
                ['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(this.activeData.__config__.tag) > -1 ? <div>
                  <el-divider>选项</el-divider>
                  <draggable
                    list={this.activeData.__slot__.options}
                    animation={340}
                    group="selectItem"
                    handle=".option-drag"
                  >
                    {
                      this.activeData.__slot__.options.map((item: any, index: number) => (
                        <div key={index} class="select-item">
                          <div class="select-line-icon option-drag">
                            <i class="el-icon-s-operation" />
                          </div>
                          <el-input v-model={item.label} placeholder="选项名" size="small" />
                          <el-input
                            placeholder="选项值"
                            size="small"
                            value={item.value}
                            onInput={(e: any) => this.setOptionValue(item, e)}
                          />
                          <div class="close-btn select-line-icon" onClick={this.activeData.__slot__.options.splice(index, 1)}>
                            <i class="el-icon-remove-outline" />
                          </div>
                        </div>
                      ))
                    }

                  </draggable>
                  <div style="margin-left: 20px;">
                    <el-button
                      style="padding-bottom: 0"
                      icon="el-icon-circle-plus-outline"
                      type="text"
                      onClick={this.addSelectItem}
                    >
                      添加选项
                            </el-button>
                  </div>
                  <el-divider />
                </div> : null
              }
              {

                ['el-cascader', 'el-table'].includes(this.activeData.__config__.tag) ? <div>
                  <el-divider>选项</el-divider>
                  {
                    this.activeData.__config__.dataType ? <el-form-item label="数据类型">
                      <el-radio-group v-model={this.activeData.__config__.dataType} size="small">
                        <el-radio-button label="dynamic">
                          动态数据
                      </el-radio-button>
                        <el-radio-button label="static">
                          静态数据
                      </el-radio-button>
                      </el-radio-group>
                    </el-form-item> : null
                  }
                  {
                    this.activeData.__config__.dataType === 'dynamic' ? <div>
                      <el-form-item label="接口地址">
                        <el-input
                          v-model={this.activeData.__config__.url}
                          title={this.activeData.__config__.url}
                          placeholder="请输入接口地址"
                          clearable
                          onBlur={this.$emit('fetch-data', this.activeData)}
                        >
                          <el-select
                            slot="prepend"
                            v-model={this.activeData.__config__.method}
                            style={{ width: '85px' }}
                            onChange={this.$emit('fetch-data', this.activeData)}
                          >
                            <el-option label="get" value="get" />
                            <el-option label="post" value="post" />
                            <el-option label="put" value="put" />
                            <el-option label="delete" value="delete" />
                          </el-select>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="数据位置">
                        <el-input
                          v-model={this.activeData.__config__.dataPath}
                          placeholder="请输入数据位置"
                          onBlur={this.$emit('fetch-data', this.activeData)}
                        />
                      </el-form-item>
                      {
                        this.activeData.props && this.activeData.props.props ? <div>
                          <el-form-item label="标签键名">
                            <el-input v-model={this.activeData.props.props.label} placeholder="请输入标签键名" />
                          </el-form-item>
                          <el-form-item label="值键名">
                            <el-input v-model={this.activeData.props.props.value} placeholder="请输入值键名" />
                          </el-form-item>
                          <el-form-item label="子级键名">
                            <el-input v-model={this.activeData.props.props.children} placeholder="请输入子级键名" />
                          </el-form-item>
                        </div> : null
                      }
                    </div> : null
                  }
                  {
                    this.activeData.__config__.dataType === 'static' ? <el-tree
                      draggable
                      data={this.activeData.options}
                      node-key="id"
                      expand-on-click-node={false}
                      render-content={this.renderContent}
                    /> : null
                  }
                  {
                    this.activeData.__config__.dataType === 'static' ? <div style="margin-left: 20px">
                      <el-button
                        style="padding-bottom: 0"
                        icon="el-icon-circle-plus-outline"
                        type="text"
                        onClick={this.addTreeItem}
                      >
                        添加父级
                    </el-button>
                    </div> : null
                  }
                  <el-divider />
                </div> : null
              }
              {
                this.activeData.__config__.optionType ? <el-form-item label="选项样式">
                  <el-radio-group v-model={this.activeData.__config__.optionType}>
                    <el-radio-button label="default">
                      默认
                </el-radio-button>
                    <el-radio-button label="button">
                      按钮
                </el-radio-button>
                  </el-radio-group>
                </el-form-item> : null
              }
              {
                this.activeData.__config__.optionType ? <el-form-item label="选项样式">
                  <el-radio-group v-model={this.activeData.__config__.optionType}>
                    <el-radio-button label="default">
                      默认
                            </el-radio-button>
                    <el-radio-button label="button">
                      按钮
                            </el-radio-button>
                  </el-radio-group>
                </el-form-item> : null
              }
              {
                this.activeData['active-color'] ? <el-form-item label="开启颜色">
                  <el-color-picker v-model={this.activeData['active-color']} />
                </el-form-item> : null
              }
              {
                this.activeData['inactive-color'] ? <el-form-item label="关闭颜色">
                  <el-color-picker v-model={this.activeData['inactive-color']} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.showLabel && this.activeData.__config__.labelWidth ? <el-form-item label="显示标签">
                  <el-switch v-model={this.activeData.__config__.showLabel} />
                </el-form-item> : null
              }
              {
                this.activeData.branding ? <el-form-item label="品牌烙印">
                  <el-switch v-model={this.activeData.branding} onInput={this.changeRenderKey} />
                </el-form-item> : null
              }
              {
                this.activeData['allow-half'] ? <el-form-item label="允许半选">
                  <el-switch v-model={this.activeData['allow-half']} />
                </el-form-item> : null
              }
              {
                this.activeData['show-text'] ? <el-form-item label="辅助文字">
                  <el-switch v-model={this.activeData['show-text']} onChange={this.rateTextChange} />
                </el-form-item> : null
              }
              {
                this.activeData['show-score'] ? <el-form-item label="显示分数">
                  <el-switch v-model={this.activeData['show-score']} onChange={this.rateScoreChange} />
                </el-form-item> : null
              }
              {
                this.activeData['show-stops'] ? <el-form-item label="显示间断点">
                  <el-switch v-model={this.activeData['show-stops']} />
                </el-form-item> : null
              }
              {
                this.activeData.range ? <el-form-item label="范围选择">
                  <el-switch v-model={this.activeData.range} onChange={this.rangeChange} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.border && this.activeData.__config__.optionType === 'default' ? <el-form-item label="是否带边框">
                  <el-switch v-model={this.activeData.__config__.border} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.border && this.activeData.__config__.optionType === 'default' ? <el-form-item label="是否带边框">
                  <el-switch v-model={this.activeData.__config__.border} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-color-picker' ? <el-form-item label="颜色格式">
                  <el-select
                    v-model={this.activeData['color-format']}
                    placeholder="请选择颜色格式"
                    style={{ width: '100%' }}
                    clearable
                    onChange={this.colorFormatChange}
                  >
                    {
                      this.colorFormatOptions.map((item, index) => (
                        <el-option
                          key={index}
                          label={item.label}
                          value={item.value}
                        />
                      ))
                    }
                  </el-select>
                </el-form-item> : null
              }
              {
                this.activeData.size !== undefined &&
                  (this.activeData.__config__.optionType === 'button' ||
                    this.activeData.__config__.border ||
                    this.activeData.__config__.tag === 'el-color-picker' ||
                    this.activeData.__config__.tag === 'el-button') ? <el-form-item

                      label="组件尺寸"
                    >
                    <el-radio-group v-model={this.activeData.size}>
                      <el-radio-button label="medium">
                        中等
                      </el-radio-button>
                      <el-radio-button label="small">
                        较小
                    </el-radio-button>
                      <el-radio-button label="mini">
                        迷你
                      </el-radio-button>
                    </el-radio-group>
                  </el-form-item> : null
              }
              {
                this.activeData['show-word-limit'] ? <el-form-item label="输入统计">
                  <el-switch v-model={this.activeData['show-word-limit']} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-input-number' ? <el-form-item label="严格步数">
                  <el-switch v-model={this.activeData['step-strictly']} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-cascader' ? <el-form-item label="任选层级">
                  <el-switch v-model={this.activeData.props.props.checkStrictly} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-cascader' ? <el-form-item label="是否多选">
                  <el-switch v-model={this.activeData.props.props.multiple} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-cascader' ? <el-form-item label="展示全路径">
                  <el-switch v-model={this.activeData['show-all-levels']} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-cascader' ? <el-form-item label="可否筛选">
                  <el-switch v-model={this.activeData.filterable} />
                </el-form-item> : null
              }
              {
                this.activeData.clearable ? <el-form-item label="能否清空">
                  <el-switch v-model={this.activeData.clearable} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.showTip ? <el-form-item label="显示提示">
                  <el-switch v-model={this.activeData.__config__.showTip} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-upload' ? <el-form-item label="多选文件">
                  <el-switch v-model={this.activeData.multiple} />
                </el-form-item> : null
              }
              {
                this.activeData['auto-upload'] ? <el-form-item label="自动上传">
                  <el-switch v-model={this.activeData['auto-upload']} />
                </el-form-item> : null
              }
              {
                this.activeData.readonly ? <el-form-item label="是否只读">
                  <el-switch v-model={this.activeData.readonly} />
                </el-form-item> : null
              }
              {
                this.activeData.disabled ? <el-form-item label="是否禁用">
                  <el-switch v-model={this.activeData.disabled} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-select' ? <el-form-item label="能否搜索">
                  <el-switch v-model={this.activeData.filterable} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.tag === 'el-select' ? <el-form-item label="是否多选">
                  <el-switch v-model={this.activeData.multiple} onChange={this.multipleChange} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.required ? <el-form-item label="是否必填">
                  <el-switch v-model={this.activeData.__config__.required} />
                </el-form-item> : null
              }
              {
                this.activeData.__config__.layoutTree ? <div>
                  <el-divider>布局结构树</el-divider>
                  <el-tree
                    data={[this.activeData.__config__]}
                    props={this.layoutTreeProps}
                    node-key="renderKey"
                    default-expand-all
                    draggable
                  >
                  </el-tree>
                </div> : null
              }
              {
                this.activeData.__config__.layoutTree ? <div>
                  <el-divider>布局结构树</el-divider>
                  <el-tree
                    data={[this.activeData.__config__]}
                    props={this.layoutTreeProps}
                    node-key="renderKey"
                    default-expand-all
                    draggable
                  >
                  </el-tree>
                </div> : null
              }
              {
                Array.isArray(this.activeData.__config__.regList) ? <div>
                  <el-divider>正则校验</el-divider>
                  {
                    this.activeData.__config__.regList.map((item: any, index: any) => (
                      <div
                        key={index}
                        class="reg-item"
                      >
                        <span class="close-btn" onClick={this.activeData.__config__.regList.splice(index, 1)}>
                          <i class="el-icon-close" />
                        </span>
                        <el-form-item label="表达式">
                          <el-input v-model={item.pattern} placeholder="请输入正则" />
                        </el-form-item>
                        <el-form-item label="错误提示" style="margin-bottom:0">
                          <el-input v-model={item.message} placeholder="请输入错误提示" />
                        </el-form-item>
                      </div>
                    ))
                  }
                  <div style="margin-left: 20px">
                    <el-button icon="el-icon-circle-plus-outline" type="text" onClick={this.addReg}>添加规则</el-button>
                  </div>
                </div> : null
              }
            </el-form>
            {/* <!-- 表单属性 --> */}
            <el-form v-show={this.currentTab === 'form'} size="small" label-width="90px">
              <el-form-item label="表单名">
                <el-input v-model={this.formConf.formRef} placeholder="请输入表单名（ref）" />
              </el-form-item>
              <el-form-item label="表单模型">
                <el-input v-model={this.formConf.formModel} placeholder="请输入数据模型" />
              </el-form-item>
              <el-form-item label="校验模型">
                <el-input v-model={this.formConf.formRules} placeholder="请输入校验模型" />
              </el-form-item>
              <el-form-item label="表单尺寸">
                <el-radio-group v-model={this.formConf.size}>
                  <el-radio-button label="medium">
                    中等
              </el-radio-button>
                  <el-radio-button label="small">
                    较小
              </el-radio-button>
                  <el-radio-button label="mini">
                    迷你
              </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="标签对齐">
                <el-radio-group v-model={this.formConf.labelPosition}>
                  <el-radio-button label="left">
                    左对齐
              </el-radio-button>
                  <el-radio-button label="right">
                    右对齐
              </el-radio-button>
                  <el-radio-button label="top">
                    顶部对齐
              </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="标签宽度">
                <el-input v-model={this.formConf.labelWidth} type="number" placeholder="请输入标签宽度" />
              </el-form-item>
              <el-form-item label="栅格间隔">
                <el-input-number v-model={this.formConf.gutter} min={0} placeholder="栅格间隔" />
              </el-form-item>
              <el-form-item label="禁用表单">
                <el-switch v-model={this.formConf.disabled} />
              </el-form-item>
              <el-form-item label="表单按钮">
                <el-switch v-model={this.formConf.formBtns} />
              </el-form-item>
              <el-form-item label="显示未选中组件边框">
                <el-switch v-model={this.formConf.unFocusedComponentBorder} />
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
      </div >
    )
  }
})
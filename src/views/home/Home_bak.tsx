import Vue from 'vue'
import ClipboardJS from 'clipboard'
import draggable from 'vuedraggable'
import { saveAs } from 'file-saver'
import { debounce } from 'throttle-debounce'
import FormDrawer from './components/FormDrawer'
import JsonDrawer from './components/JsonDrawer'
import RightPanel from './components/RightPanel'
import LeftPanel from './components/LeftPanel'
import {
  layoutComponents, formConf
} from '@/components/generator/config'
import { beautifierConf, titleCase, deepClone } from '@/utils/index'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import drawingDefalut from '@/components/generator/drawingDefalut'
import logo from '@/assets/logo.png'
import CodeTypeDialog from './components/CodeTypeDialog'
import DraggableItem from './components/DraggableItem'
import {
  getDrawingList, saveDrawingList, getIdGlobal, saveIdGlobal, getFormConf
} from '@/utils/db'

let beautifier: any
let oldActiveId: any
let tempActiveData: any
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const idGlobal = getIdGlobal()


export default Vue.extend({
  components: {
    draggable,
    FormDrawer,
    JsonDrawer,
    LeftPanel,
    RightPanel,
    CodeTypeDialog,
    DraggableItem
  },
  data () {
    return {
      logo,
      idGlobal,
      formConf,
      layoutComponents,
      labelWidth: 100,
      drawingList: [] as any,
      drawingData: {},
      activeId: 0,
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null as any,
      showFileName: false,
      operationType: '',
      activeData: {} as any,
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      componentList: [
        // {
        //   title: '基础组件',
        //   list: basicComponents
        // },
        {
          title: '布局型组件',
          list: layoutComponents
        },
        // {
        //   title: '输入型组件',
        //   list: inputComponents
        // },
        // {
        //   title: '选择型组件',
        //   list: selectComponents
        // }
      ]
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    'activeData.__config__.label': function (val, oldVal) {
      if (
        this.activeData.placeholder === undefined
        || !this.activeData.__config__.tag
        || oldActiveId !== this.activeId
      ) {
        return
      }
      this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val
    },
    activeId: {
      handler (val) {
        oldActiveId = val
      },
      immediate: true
    },
    drawingList: {
      handler (val) {
        this.saveDrawingListDebounce(val)
        if (val.length === 0) this.idGlobal = 100
      },
      deep: true
    },
    idGlobal: {
      handler (val) {
        this.saveIdGlobalDebounce(val)
      },
      immediate: true
    }
  },
  methods: {
    setObjectValueByStringKeys (obj: any, strKeys: string, val: string) {
      const arr = strKeys.split('.')
      arr.reduce((pre, item, i) => {
        if (arr.length === i + 1) {
          pre[item] = val
        } else if (Object.prototype.toString.call(pre[item]) !== '[Object Object]') {
          pre[item] = {}
        }
        return pre[item]
      }, obj)
    },
    setRespData (component: any, respData: any) {
      const { dataPath, renderKey, dataConsumer } = component.__config__
      if (!dataPath || !dataConsumer) return
      const data = dataPath.split('.').reduce((pre: any, item: any) => pre[item], respData)
      this.setObjectValueByStringKeys(component, dataConsumer, data)
      const i = this.drawingList.findIndex((item: any) => item.__config__.renderKey === renderKey)
      if (i > -1) this.$set(this.drawingList, i, component)
    },
    fetchData (component: any) {
      const { dataType, method, url } = component.__config__
      if (dataType === 'dynamic' && method && url) {
        this.setLoading(component, true)
        this.$axios({
          method,
          url
        }).then((resp: any) => {
          this.setLoading(component, false)
          this.setRespData(component, resp.data)
        })
      }
    },
    setLoading (component: any, val: boolean) {
      const { directives } = component
      if (Array.isArray(directives)) {
        const t = directives.find(d => d.name === 'loading')
        if (t) t.value = val
      }
    },
    activeItem (currentItem: any) {
      console.log(currentItem, 'activeItem')
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
    },
    onEnd (obj: any) {
      if (obj.from !== obj.to) {
        this.fetchData(tempActiveData)
        this.activeData = tempActiveData
        this.activeId = this.idGlobal as number
      }
    },
    addComponent (item: any) {
      const clone = this.cloneComponent(item)
      // 远程获取数据
      this.fetchData(clone)
      // 画板添加组件
      this.drawingList.push(clone)
      // 选中当前组件
      this.activeItem(clone)
    },
    cloneComponent (origin: any) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.span = this.formConf.span // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone)
      clone.placeholder !== undefined && (clone.placeholder += config.label)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey (item: any) {
      const config = item.__config__
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map((childItem: any) => this.createIdAndKey(childItem))
      }
      return item
    },
    AssembleFormData () {
      this.formData = {
        fields: deepClone(this.drawingList),
        ...this.formConf
      }
    },
    generate (data: any) {
      const func = (this as any)[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    execRun (data: any) {
      this.AssembleFormData()
      this.drawerVisible = true
    },
    execDownload (data: any) {
      const codeStr = this.generateCode()
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, data.fileName)
    },
    execCopy (data: any) {
      (document.getElementById('copyNode') as HTMLElement).click()
    },
    empty () {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          this.drawingList = []
          this.idGlobal = 100
        }
      )
    },
    drawingItemCopy (item: any, list: any) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeItem(clone)
    },
    drawingItemDelete (index: number, list: any) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeItem(this.drawingList[len - 1])
        }
      })
    },
    generateCode () {
      const { type } = this.generateConf
      this.AssembleFormData()
      const script = vueScript(makeUpJs(this.formData, type))
      const html = vueTemplate(makeUpHtml([], type))
      const css = cssStyle(makeUpCss([]))
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    showJson () {
      this.AssembleFormData()
      this.jsonDrawerVisible = true
    },
    download () {
      this.dialogVisible = true
      this.showFileName = true
      this.operationType = 'download'
    },
    run () {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'run'
    },
    copy () {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'copy'
    },
    tagChange (newTag: any) {
      newTag = this.cloneComponent(newTag)
      const config = newTag.__config__
      newTag.__vModel__ = this.activeData.__vModel__
      config.formId = this.activeId
      config.span = this.activeData.__config__.span
      this.activeData.__config__.tag = config.tag
      this.activeData.__config__.tagIcon = config.tagIcon
      this.activeData.__config__.document = config.document
      if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.__config__.defaultValue
      }
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList (newTag: any, list: any) {
      const index = list.findIndex((item: any) => item.__config__.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach((item: any) => {
          if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children)
        })
      }
    },
    refreshJson (data: any) {
      this.drawingList = deepClone(data.fields)
      delete data.fields
      this.formConf = data
    }
  },
  mounted () {
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      // this.drawingList = drawingListInDB
    } else {
      this.drawingList = drawingDefalut
    }
    this.activeItem(this.drawingList[0])
    if (formConfInDB) {
      this.formConf = formConfInDB
    }
    const clipboard = new ClipboardJS('#copyNode', {
      text: trigger => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  },
  render () {
    return (
      <div class="home-container">
        <div class="left-board">
          <div class="logo-wrapper">
            <div class="logo">
              VIP-GUI
            </div>
          </div>
          <left-panel
            componentList={this.componentList}
            clone={this.cloneComponent}
            onEnd={this.onEnd}
            onItemClick={this.addComponent}
          />
        </div>
        <div class="center-board">
          <div class="action-bar">
            <el-button icon="el-icon-video-play" type="text" onClick={this.run}>
              运行
            </el-button>
            <el-button icon="el-icon-view" type="text" onClick={this.showJson}>
              查看json
            </el-button>
            <el-button icon="el-icon-download" type="text" onClick={this.download}>
              导出vue文件
            </el-button>
            <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" onClick={this.copy}>
              复制代码
            </el-button>
            <el-button class="delete-btn" icon="el-icon-delete" type="text" onClick={this.empty}>
              清空
            </el-button>
          </div>
          <el-scrollbar class="center-scrollbar">
            <el-row class="center-board-row" gutter={this.formConf.gutter}>
              <draggable class="drawing-board" list={this.drawingList} animation={340} group="componentsGroup">
                {
                  this.drawingList.map((item: any, index: number) => (
                    <draggable-item
                      key={item.renderKey}
                      drawing-list={this.drawingList}
                      current-item={item}
                      index={index}
                      active-id={this.activeId}
                      form-conf={this.formConf}
                      onActiveItem={this.activeItem}
                      onCopyItem={this.drawingItemCopy}
                      onDeleteItem={this.drawingItemDelete}
                    />
                  ))
                }
              </draggable>
              <div v-show={!this.drawingList.length} class="empty-info">
                从左侧拖入或点选组件进行表单设计
              </div>
            </el-row>
          </el-scrollbar>
        </div>

        <right-panel
          active-data={this.activeData}
          form-conf={this.formConf}
          show-field={!!this.drawingList.length}
          tag-change={this.tagChange}
          fetch-data={this.fetchData}
        />

        <form-drawer
          visible={this.drawerVisible}
          form-data={this.formData}
          size="100%"
          generate-conf={this.generateConf}
          on={{ ['update:close']: (visible: boolean) => { this.drawerVisible = visible } }}
        />
        <json-drawer
          size="60%"
          visible={this.jsonDrawerVisible}
          json-str={JSON.stringify(this.formData)}
          refresh={this.refreshJson}
          on={{ ['update:close']: (visible: boolean) => { this.jsonDrawerVisible = visible } }}
        />
        <code-type-dialog
          visible={this.dialogVisible}
          title="选择生成类型"
          showFileName={this.showFileName}
          onConfirm={this.generate}
          on={{ ['update:close']: (visible: boolean) => { this.dialogVisible = visible } }}
        />
        <input id="copyNode" type="hidden" />
      </div>
    )
  }
})
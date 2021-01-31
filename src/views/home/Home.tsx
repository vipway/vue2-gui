import Vue from 'vue'
import { saveAs } from 'file-saver'
import ClipboardJS from 'clipboard'
import draggable from 'vuedraggable'
import { debounce } from 'throttle-debounce'
import FormDrawer from './components/FormDrawer'
import JsonDrawer from './components/JsonDrawer'
import RightPanel from './components/RightPanel'
import LeftPanel from './components/LeftPanel'
import {
  basicComponents,
  layoutComponents, formComponents
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
      formConf: {},
      drawingList: [] as any,
      drawingData: {},
      activeId: 0,
      drawerVisible: false,
      configList: [],
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null as any,
      showFileName: false,
      operationType: '',
      activeData: {} as any,
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      componentList: [
        {
          title: '基础组件',
          list: basicComponents
        },
        {
          title: '布局型组件',
          list: layoutComponents
        },
        {
          title: '表单组件',
          list: formComponents
        }
      ],
      vModelTypes: [
        'input',
        'inputNumber',
        'select',
        'radio',
        'checkbox',
        'switch',
        'slider',
        'timeSelect',
        'datePicker',
        'rate',
        'colorPicker'
      ]
    }
  },
  methods: {
    assembleFormData () {
      this.configList = deepClone(this.drawingList)
    },
    run () {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'run'
    },
    showJson () {
      this.assembleFormData()
      this.jsonDrawerVisible = true
    },
    // 导出页面
    download () {
      // do something
    },
    // 复制代码
    copy () {
      // do something
    },
    // 清空布局
    clear () {
      // do something
    },
    createIdAndKey (item: any) {
      const config = item.config
      config.id = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      config.componentName = `${config.tag}-${this.idGlobal}`
      if (config.layout === 'blockForm') {
        this.formConf = item
        item.config.formModel = `formModel_${config.id}`
        if (Array.isArray(item.children)) {
          for (const child of item.children) {
            child.config.id = ++this.idGlobal
            child.vModel = `field${this.idGlobal}`
          }
        }
        console.log('blockForm', item)
      } else if (config.layout === 'layoutBlock') {
        !Array.isArray(item.children) && (item.children = [])
        item.children = item.children.map((childItem: any) => this.createIdAndKey(childItem))
      }
      if (this.vModelTypes.includes(config.type)) {
        item.vModel = `${config.type}-field${this.idGlobal}`
      }
      return item
    },
    // 克隆组件配置
    cloneComponent (props: any) {
      const deepProps = deepClone(props)
      const config = deepProps.config
      this.createIdAndKey(deepProps)
      config.placeholder !== undefined && (config.placeholder += config.label)
      return deepProps

    },
    // 添加组件
    addComponent (props: any) {
      // do something
      console.log('addComponent')
    },
    // 拖拽完成触发
    onDragEnd (obj: any) {
      if (obj.from !== obj.to) {
        this.activeData = {}
        this.activeId = this.idGlobal
      }

    },
    // 选中组件
    activeItem (data: any) {
      this.activeData = data
      this.activeId = this.idGlobal
      // do something
      console.log('activeItem', data)
    },
    // 复制组件
    copyDrawingItem () {
      // do something
    },
    // 删除组件
    deleteDrawingItem () {
      // do something
    },
    // 切换属性tab
    changeTab () {
      // do something
    },
    // 获取远程数据
    fetchData () {
      // do something
    },
    // 刷新json配置
    refreshJson () {
      // do something
    },
    generateCode () {
      const { type } = this.generateConf
      this.assembleFormData()
      const script = vueScript(makeUpJs(this.configList, type))
      const html = vueTemplate(makeUpHtml(this.configList, type))
      const css = cssStyle(makeUpCss(this.configList))
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    execRun (data: any) {
      this.assembleFormData()
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
    // 生成页面
    generatePage (data: any) {
      // do something
      const func = (this as any)[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    }

  },
  mounted () {
    // do something
  },
  render () {
    return (
      <div class="home-container">
        <div class="left-board">
          <div class="logo-wrapper">
            <div class="logo">VIP-GUI</div>
          </div>
          <left-panel
            componentList={this.componentList}
            clone={this.cloneComponent}
            onItemClick={this.addComponent}
            onEnd={this.onDragEnd}
          />
        </div>
        <div class="center-board">
          <div class="action-bar">
            <el-button icon="el-icon-video-play" type="text" onClick={this.run}>运行</el-button>
            <el-button icon="el-icon-view" type="text" onClick={this.showJson}>查看json</el-button>
            <el-button icon="el-icon-download" type="text" onClick={this.download}>导出vue文件</el-button>
            <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" onClick={this.copy}>复制代码</el-button>
            <el-button class="delete-btn" icon="el-icon-delete" type="text" onClick={this.clear}>清空</el-button>
          </div>
          <el-scrollbar class="center-scrollbar">
            <el-row class="center-board-row">
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
                      onCopyItem={this.copyDrawingItem}
                      onDeleteItem={this.deleteDrawingItem}
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
          change-tab={this.changeTab}
          fetch-data={this.fetchData}
        />

        <form-drawer
          visible={this.drawerVisible}
          data-list={this.configList}
          size="100%"
          generate-conf={this.generateConf}
          on={{ ['update:close']: (visible: boolean) => { this.drawerVisible = visible } }}
        />
        <json-drawer
          size="60%"
          visible={this.jsonDrawerVisible}
          json-str={JSON.stringify(this.configList)}
          refresh={this.refreshJson}
          on={{ ['update:close']: (visible: boolean) => { this.jsonDrawerVisible = visible } }}
        />
        <code-type-dialog
          title="选择生成类型"
          visible={this.dialogVisible}
          showFileName={this.showFileName}
          onConfirm={this.generatePage}
          on={{ ['update:close']: (visible: boolean) => { this.dialogVisible = visible } }}
        />
        <input id="copyNode" type="hidden" />
      </div>
    )
  }
})
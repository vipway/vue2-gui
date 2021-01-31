import Vue from 'vue'
import { parse } from '@babel/parser'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import { exportDefault, beautifierConf } from '@/utils'
import * as monaco from 'monaco-editor';
import loadBeautifier from '@/utils/loadBeautifier'

const editorObj: any = {
  html: null,
  js: null,
  css: null
}
const mode: any = {
  html: 'html',
  js: 'javascript',
  css: 'css'
}
let beautifier: any

export default Vue.extend({
  name: 'form-drawer',
  props: {
    dataList: Array,
    generateConf: Object,
    visible: Boolean,
    size: String
  },
  data () {
    return {
      activeTab: 'html',
      htmlCode: '',
      jsCode: '',
      cssCode: '',
      codeFrame: '',
      isIframeLoaded: false,
      isInitcode: false, // 保证open后两个异步只执行一次runcode
      isRefreshCode: false, // 每次打开都需要重新刷新代码
      resourceVisible: false,
      scripts: [],
      links: []
    }
  },
  computed: {
    resources (): Array<any> {
      return (this.scripts as Array<any>).concat(this.links)
    }
  },
  mounted () {
    window.addEventListener('keydown', this.preventDefaultSave)
    const clipboard = new ClipboardJS('.copy-btn', {
      text: () => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', () => {
      this.$message.error('代码复制失败')
    })
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.preventDefaultSave)
  },
  methods: {
    preventDefaultSave (e: any) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    },
    onOpen () {
      const { type } = this.generateConf
      this.htmlCode = makeUpHtml(this.dataList, type)
      // this.jsCode = makeUpJs(this.dataList, type)
      this.cssCode = makeUpCss(this.dataList)

      loadBeautifier((btf: any) => {
        beautifier = btf
        this.htmlCode = beautifier.html(this.htmlCode, beautifierConf.html)
        this.jsCode = beautifier.js(this.jsCode, beautifierConf.js)
        this.cssCode = beautifier.css(this.cssCode, beautifierConf.html)
        this.setEditorValue('editorHtml', 'html', this.htmlCode)
        this.setEditorValue('editorJs', 'js', this.jsCode)
        this.setEditorValue('editorCss', 'css', this.cssCode)
        if (!this.isInitcode) {
          this.isRefreshCode = true
          this.isIframeLoaded && (this.isInitcode = true) && this.runCode()
        }
      })
    },
    onClose () {
      this.isInitcode = false
      this.isRefreshCode = false
      this.$emit('update:close', false)
    },
    iframeLoad () {
      if (!this.isInitcode) {
        this.isIframeLoaded = true
        this.isRefreshCode && (this.isInitcode = true) && this.runCode()
      }
    },
    setEditorValue (id: string, type: any, codeStr: any) {
      if (editorObj[type]) {
        editorObj[type].setValue(codeStr)
      } else {
        editorObj[type] = monaco.editor.create(document.getElementById(id) as HTMLElement, {
          value: codeStr,
          theme: 'vs-dark',
          language: mode[type],
          automaticLayout: true
        })
      }
      // ctrl + s 刷新
      editorObj[type].onKeyDown((e: any) => {
        if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
          this.runCode()
        }
      })
    },
    runCode () {
      const jsCodeStr = editorObj.js.getValue()
      try {
        const ast = parse(jsCodeStr, { sourceType: 'module' })
        const astBody = ast.program.body
        if (astBody.length > 1) {
          this.$confirm(
            'js格式不能识别，仅支持修改export default的对象内容',
            '提示',
            {
              type: 'warning'
            }
          )
          return
        }
        if (astBody[0].type === 'ExportDefaultDeclaration') {
          const postData = {
            type: 'refreshFrame',
            data: {
              generateConf: this.generateConf,
              html: editorObj.html.getValue(),
              js: jsCodeStr.replace(exportDefault, ''),
              css: editorObj.css.getValue(),
              scripts: this.scripts,
              links: this.links
            }
          }
          const previewPage = this.$refs.previewPage as Vue & { contentWindow: { postMessage: Function } }
          previewPage.contentWindow.postMessage(
            postData,
            location.origin
          )
        } else {
          this.$message.error('请使用export default')
        }
      } catch (err) {
        this.$message.error(`js错误：${err}`)
        console.error(err)
      }
    },
    generateCode () {
      const html = vueTemplate(editorObj.html.getValue())
      const script = vueScript(editorObj.js.getValue())
      const css = cssStyle(editorObj.css.getValue())
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    exportFile () {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.vue`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then((res: any) => {
        if (!res.value) res.value = `${+new Date()}.vue`
        const codeStr = this.generateCode()
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, res.value)
      })
    },
    showResource () {
      this.resourceVisible = true
    },
    setResource (arr: any) {
      const scripts = [] as any
      const links = [] as any
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          if (item.endsWith('.css')) {
            links.push(item)
          } else {
            scripts.push(item)
          }
        })
        this.scripts = scripts
        this.links = links
      } else {
        this.scripts = []
        this.links = []
      }
    }
  },
  render () {
    return (
      <el-drawer class="form-drawer" size={this.size} visible={this.visible} onOpened={this.onOpen} onClose={this.onClose}>
        <div style="height:100%">
          <el-row style="height:100%;overflow:auto">
            <el-col md={24} lg={12} class="left-editor">
              <div class="setting" title="资源引用" onClick={this.showResource}>
                <el-badge is-dot={!!this.resources.length} class="item">
                  <i class="el-icon-setting" />
                </el-badge>
              </div>
              <el-tabs v-model={this.activeTab} type="card" class="editor-tabs">
                <el-tab-pane name="html">
                  {
                    this.activeTab === 'html'
                      ? <span slot="label">
                        <i class="el-icon-edit" />
                          template
                        </span>
                      : <span slot="label">
                        <i class="el-icon-edit" />
                          template
                        </span>
                  }
                </el-tab-pane>
                <el-tab-pane name="js">
                  {
                    this.activeTab === 'js'
                      ? <span slot="label">
                        <i class="el-icon-edit" />
                          script
                        </span>
                      : <span slot="label">
                        <i class="el-icon-edit" />
                          script
                        </span>
                  }
                </el-tab-pane>
                <el-tab-pane name="css">
                  {
                    this.activeTab === 'css'
                      ? <span slot="label">
                        <i class="el-icon-edit" />
                          css
                        </span>
                      : <span slot="label">
                        <i class="el-icon-edit" />
                          css
                        </span>
                  }
                </el-tab-pane>
              </el-tabs>
              <div v-show={this.activeTab === 'html'} id="editorHtml" class="tab-editor" />
              <div v-show={this.activeTab === 'js'} id="editorJs" class="tab-editor" />
              <div v-show={this.activeTab === 'css'} id="editorCss" class="tab-editor" />
            </el-col>

            <el-col md={24} lg={12} class="right-preview">
              <div class="action-bar" style={{ 'text-align': 'left' }}>
                <span class="bar-btn" onClick={this.runCode}>
                  <i class="el-icon-refresh" />
                    刷新
                  </span>
                <span class="bar-btn" onClick={this.exportFile}>
                  <i class="el-icon-download" />
                    导出vue文件
                  </span>
                <span ref="copyBtn" class="bar-btn copy-btn">
                  <i class="el-icon-document-copy" />
                    复制代码
                  </span>
                <span class="bar-btn delete-btn" onClick={this.onClose}>
                  <i class="el-icon-circle-close" />
                    关闭
                  </span>
              </div>
              <iframe
                v-show={this.isIframeLoaded}
                ref="previewPage"
                class="result-wrapper"
                frameborder="0"
                src="preview.html"
                onLoad={this.iframeLoad}
              />
              <div v-show={!this.isIframeLoaded} v-loading={true} class="result-wrapper" />
            </el-col>
          </el-row>
        </div>
      </el-drawer>
    )
  }
})
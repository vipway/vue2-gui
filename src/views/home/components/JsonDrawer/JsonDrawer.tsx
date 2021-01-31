import Vue from 'vue'

import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import { beautifierConf } from '@/utils'
import * as monaco from 'monaco-editor';
import loadBeautifier from '@/utils/loadBeautifier'

let beautifier: any

export default Vue.extend({
  props: {
    jsonStr: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: false
    },
    size: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      beautifierJson: '',
      jsonEditor: null as any
    }
  },
  mounted () {
    window.addEventListener('keydown', this.preventDefaultSave)
    const clipboard = new ClipboardJS('.copy-json-btn', {
      text: () => {
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return this.beautifierJson
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
      loadBeautifier((btf: any) => {
        beautifier = btf
        this.beautifierJson = beautifier.js(this.jsonStr, beautifierConf.js)
        this.setEditorValue('editorJson', this.beautifierJson)
      })
    },
    onClose () {
      this.$emit('update:close', false)
    },
    setEditorValue (id: string, codeStr: string) {
      if (this.jsonEditor) {
        this.jsonEditor.setValue(codeStr)
      } else {
        this.jsonEditor = monaco.editor.create(document.getElementById(id) as HTMLElement, {
          value: codeStr,
          theme: 'vs-dark',
          language: 'json',
          automaticLayout: true
        })
        // ctrl + s 刷新
        this.jsonEditor.onKeyDown((e: any) => {
          if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
            this.refresh()
          }
        })
      }
    },
    exportJsonFile () {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.json`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then((res: any) => {
        if (!res.value) res.value = `${+new Date()}.json`
        const codeStr = this.jsonEditor.getValue()
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, res.value)
      })
    },
    refresh () {
      try {
        this.$emit('refresh', JSON.parse(this.jsonEditor.getValue()))
      } catch (error) {
        this.$notify({
          title: '错误',
          message: 'JSON格式错误，请检查',
          type: 'error'
        })
      }
    }
  },
  render () {
    return (
      <el-drawer class="json-drawer" size={this.size} visible={this.visible} onOpened={this.onOpen} onClose={this.onClose}>
        <div class="action-bar" style={{ 'text-align': 'left' }}>
          <span class="bar-btn" onClick={this.refresh}>
            <i class="el-icon-refresh" />
              刷新
            </span>
          <span ref="copyBtn" class="bar-btn copy-json-btn">
            <i class="el-icon-document-copy" />
              复制JSON
            </span>
          <span class="bar-btn" onClick={this.exportJsonFile}>
            <i class="el-icon-download" />
              导出JSON文件
            </span>
          <span class="bar-btn delete-btn" onClick={this.onClose}>
            <i class="el-icon-circle-close" />
              关闭
            </span>
        </div>
        <div id="editorJson" class="json-editor" />
      </el-drawer>
    )
  }
})
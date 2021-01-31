import Vue from 'vue'

export default Vue.extend({
  name: 'code-type-dialog',
  props: {
    showFileName: Boolean,
    visible: Boolean
  },

  data () {
    return {
      formData: {
        fileName: '',
        type: 'file'
      },
      rules: {
        fileName: [{
          required: true,
          message: '请输入文件名',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '生成类型不能为空',
          trigger: 'change'
        }]
      },
      typeOptions: [{
        label: '页面',
        value: 'file'
      }, {
        label: '弹窗',
        value: 'dialog'
      }]
    }
  },

  methods: {
    onOpen () {
      if (this.showFileName) {
        this.formData.fileName = `${+new Date()}.vue`
      }
    },
    close () {
      this.$emit('update:close', false)
    },
    handelConfirm () {
      const elForm = this.$refs.elForm as Vue & { validate: Function }
      elForm.validate((valid: boolean) => {
        if (valid) {
          this.$emit('confirm', { ...this.formData })
          this.close()
        }
      })
      // this.$emit('confirm', { ...this.formData })
      // this.close()
    }
  },

  mounted () {
    // 取消开始的loading动画
    const preLoader = document.querySelector('#pre-loader') as HTMLElement
    preLoader.style.display = 'none'

    // fix: firefox 下 拖拽 会新打卡一个选项卡
    // https://github.com/JakHuang/form-generator/issues/15
    document.body.ondrop = event => {
      event.preventDefault()
      event.stopPropagation()
    }
  },

  render () {
    return <el-dialog
      width="500px"
      title={this.$attrs.title}
      visible={this.visible}
      close-on-click-modal={false}
      modal-append-to-body={false}
      on={this.$listeners}
      onOpen={this.onOpen}
      onClose={this.close}
    >
      <el-row gutter={15}>
        <el-form
          ref="elForm"
          props={{ model: this.formData }}
          rules={this.rules}
          size="medium"
          label-width="100px"
        >
          <el-col span={24}>
            <el-form-item label="生成类型" prop="type">
              <el-radio-group v-model={this.formData.type}>
                {
                  this.typeOptions.map((item: any, index: number) => (
                    <el-radio-button
                      key={index}
                      label={item.value}
                      disabled={item.disabled}
                    >
                      { item.label}
                    </el-radio-button>
                  ))
                }
              </el-radio-group>
            </el-form-item>
            {
              this.showFileName ? <el-form-item label="文件名" prop="fileName">
                <el-input v-model={this.formData.fileName} clearable placeholder="请输入文件名" />
              </el-form-item> : null
            }
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer">
        <el-button onClick={this.close}>
          取消
          </el-button>
        <el-button type="primary" onClick={this.handelConfirm}>
          确定
          </el-button>
      </div>
    </el-dialog>
  }
})
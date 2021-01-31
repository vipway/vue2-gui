import Vue from 'vue'
import { isNumberStr } from '@/utils'
import { getTreeNodeId, saveTreeNodeId } from '@/utils/db'

export default Vue.extend({
  components: {},
  inheritAttrs: false,
  props: [],
  data () {
    return {
      id: getTreeNodeId(),
      formData: {
        label: undefined,
        value: undefined
      } as any,
      rules: {
        label: [
          {
            required: true,
            message: '请输入选项名',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          }
        ]
      },
      dataType: 'string',
      dataTypeOptions: [
        {
          label: '字符串',
          value: 'string'
        },
        {
          label: '数字',
          value: 'number'
        }
      ]
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    'formData.value': function (val) {
      this.dataType = isNumberStr(val) ? 'number' : 'string'
    },
    id (val) {
      saveTreeNodeId(val)
    }
  },
  methods: {
    onOpen () {
      this.formData = {
        label: undefined,
        value: undefined
      }
    },
    onClose () {
      console.log('onClose')
    },
    close () {
      this.$emit('update:visible', false)
    },
    handelConfirm () {
      const elForm = this.$refs.elForm as Vue & { validate: Function }
      elForm.validate((valid: boolean) => {
        if (!valid) return
        if (this.dataType === 'number') {
          this.formData.value = parseFloat(this.formData.value)
        }
        this.formData.id = this.id++
        this.$emit('commit', this.formData)
        this.close()
      })
    }
  },
  render () {
    return (
      <div>
        <el-dialog
          v-bind={this.$attrs}
          close-on-click-modal={false}
          modal-append-to-body={false}
          v-on={this.$listeners}
          onOpen={this.onOpen}
          onClose={this.onClose}
        >
          <el-row gutter={0}>
            <el-form
              ref="elForm"
              model={this.formData}
              rules={this.rules}
              size="small"
              label-width="100px"
            >
              <el-col span={24}>
                <el-form-item
                  label="选项名"
                  prop="label"
                >
                  <el-input
                    v-model={this.formData.label}
                    placeholder="请输入选项名"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col span={24}>
                <el-form-item
                  label="选项值"
                  prop="value"
                >
                  <el-input
                    v-model={this.formData.value}
                    placeholder="请输入选项值"
                    clearable
                  >
                    <el-select
                      slot="append"
                      v-model={this.dataType}
                      style={{ width: '100px' }}
                    >
                      {
                        this.dataTypeOptions.map((item: any, index: number) => <el-option key={index} label={item.label} value={item.value} disabled={item.disabled} />)
                      }
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div slot="footer">
            <el-button type="primary" onClick={this.handelConfirm}>
              确定
            </el-button>
            <el-button onClick={this.close}>取消</el-button>
          </div>
        </el-dialog >
      </div >
    )
  }
})
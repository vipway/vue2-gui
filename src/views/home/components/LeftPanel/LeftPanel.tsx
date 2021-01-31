import Vue from 'vue'
import draggable from 'vuedraggable'

export default Vue.extend({
  components: {
    draggable
  },
  props: {
    // 组件列表
    componentList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 拖拽组件克隆
    clone: {
      type: Function,
      default: () => {
        // do nothing.
      }
    },
    //  
    onItemClick: {
      type: Function,
      default: (element: any) => {
        // do nothing.
      }
    }
  },
  methods: {
    // form组件clone回调
    onLeftPanelClone (props: any) {
      console.log('onLeftPanelClone', props)
    },
    onLeftPanelMove (data: any) {
      console.log('onLeftPanelMove', data)
    },
    onLeftPanelChange (data: any) {
      console.log('onLeftPanelChange', data)
    },
    onLeftPanelStart (data: any) {
      console.log('onLeftPanelStart', data)
    },
    onLeftPanelUpdate (data: any) {
      console.log('onLeftPanelUpdate', data)
    },
    onLeftPanelChoose (data: any) {
      console.log('onLeftPanelChoose', data)
    },
    onLeftPanelUnChoose (data: any) {
      console.log('onLeftPanelUnChoose', data)
    },
    onLeftPanelSort (data: any) {
      console.log('onLeftPanelSort', data)
    },
    onLeftPanelFilter (data: any) {
      console.log('onLeftPanelFilter', data)
    },
    onLeftPanelRemove (data: any) {
      console.log('onLeftPanelRemove', data)
    },
    onLeftPanelAdd (data: any) {
      console.log('onLeftPanelAdd', data)
    },
    onEnd (e: any) {
      this.$emit('end', e)
    }
  },
  render () {
    return <el-scrollbar class="left-scrollbar">
      <div class="components-list">
        {
          this.componentList.map((item: any, listIndex: number) => (
            <div key={listIndex}>
              <div class="components-title">
                <svg-icon iconClass="component" />
                {item.title}
              </div>
              <draggable
                class="components-draggable"
                list={item.list}
                group={{ name: 'componentsGroup', pull: 'clone', put: false }}
                clone={this.clone}
                draggable=".components-item"
                sort={false}
                onEnd={this.onEnd}
                move={this.onLeftPanelMove}
                change={this.onLeftPanelChange}
                onStart={this.onLeftPanelStart}
                update={this.onLeftPanelUpdate}
                choose={this.onLeftPanelChoose}
                unchoose={this.onLeftPanelUnChoose}
                filter={this.onLeftPanelFilter}
                remove={this.onLeftPanelRemove}
                onAdd={this.onLeftPanelAdd}
              >
                {
                  item.list.map((element: any, index: number) => (
                    <div
                      key={index}
                      class="components-item"
                      onClick={(() => (this.onItemClick as Function)(element))}
                    >
                      <div class="components-body">
                        <svg-icon iconClass={element.config.tagIcon} />
                        {element.config.label}
                      </div>
                    </div>
                  ))
                }
              </draggable>
            </div>
          ))
        }
      </div>
    </el-scrollbar>
  }
})
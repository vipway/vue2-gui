import Vue, { CreateElement } from 'vue'
import draggable from 'vuedraggable'
import { pagination } from '@/components/generator/config'
import RenderComponent from '@/components/RenderComponent/RenderComponent'


export default Vue.extend({
  name: 'drawing-item',
  components: {
    draggable,
    RenderComponent
  },
  props: {
    currentItem: Object,
    index: Number,
    drawingList: Array,
    activeId: Number,
    formConf: Object
  },
  methods: {
    onFormAdd (data: any, data1: any) {
      console.log('onFormAdd', data.to, data1)
    },
    convertFormItem (list: any) {
      const res = list.find((item: any) => (item.config && item.config.layout === 'colFormItem'))
      if (res) {
        for (const iterator of list) {
          if ([
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
          ].includes(iterator.config.type)) {
            iterator.config.layout === 'colFormItem'
            iterator.config.showLabel = true
          }
        }
      }
    },

    // 渲染块级组件
    layoutBlock (h: CreateElement, currentItem: any, index: number, list: Array<any>) {
      const config = currentItem.config
      const child = this.renderChildren(h, currentItem)
      return <render-component key={config.renderKey} conf={currentItem}
        onInput={(event: any) => {
          this.$set(config, 'defaultValue', event)
        }}
      >
        <span class="component-name">{config.componentName}</span>
        <draggable list={currentItem.children || []} animation={340} group="componentsGroup" class="drag-wrapper">
          {child}
        </draggable>
        {this.itemBtns(h, currentItem, index, list)}
      </render-component>
    },
    // 渲染块级组件
    block (h: CreateElement, currentItem: any, index: number, list: Array<any>) {
      this.convertFormItem(list)
      const config = currentItem.config
      const child = this.renderChildren(h, currentItem)
      return <render-component key={config.renderKey} conf={currentItem} onInput={(event: any) => {
        this.$set(config, 'defaultValue', event);
        event && event.stopPropagation()
      }}>
        {child}
      </render-component>
    },

    // 渲染表单
    blockForm (h: CreateElement, currentItem: any, index: number, list: Array<any>) {
      const { config } = currentItem
      const { activeItem } = this.$listeners as any
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item'
      const child = this.renderChildren(h, currentItem)
      return <render-component class={className} key={config.renderKey} conf={currentItem}>
        <el-row gutter={config.gutter}>
          <draggable
            list={currentItem.children || []}
            animation={340}
            group="componentsGroup"
            onAdd={(e: any) => this.onFormAdd(e, currentItem.children)}
          >
            {child}
          </draggable>
        </el-row>
        {this.itemBtns(h, currentItem, index, list)}
      </render-component >
    },

    // 渲染表格
    blockTable (h: CreateElement, currentItem: any, index: number, list: Array<any>) {
      const config = currentItem.config
      const conf = { ...currentItem }
      Object.keys(conf.props).forEach(key => {
        if (conf.props[key] === null) {
          delete conf.props[key]
        }
      })
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item'
      return <el-row class={className}>
        <render-component key={config.renderKey} conf={conf} onInput={(event: any) => {
          this.$set(config, 'defaultValue', event);
          event && event.stopPropagation()
        }}>
        </render-component>
        {config.pagination ? <render-component conf={{ ...pagination }} /> : null}
        {this.itemBtns(h, currentItem, index, list)}
      </el-row>

    },

    layoutIsNotFound () {
      return <div>{`没有与${this.currentItem.config.layout}匹配的layout`}</div>
      // throw new Error(`没有与${this.currentItem.config.layout}匹配的layout`)
    },
    itemBtns (h: any, currentItem: any, index: number, list: Array<any>) {
      const { copyItem, deleteItem } = this.$listeners as any
      return [
        <span class="drawing-item-copy" title="复制" onClick={(event: any) => {
          copyItem(currentItem, list);
          event.stopPropagation()
        }}>
          <i class="el-icon-copy-document" />
        </span>,
        <span class="drawing-item-delete" title="删除" onClick={(event: any) => {
          deleteItem(index, list);
          event.stopPropagation()
        }}>
          <i class="el-icon-delete" />
        </span>
      ]
    },
    renderChildren (h: any, currentItem: any) {
      if (!Array.isArray(currentItem.children)) return null
      return currentItem.children.map((el: any, i: number) => {
        const layout = (this as any)[el.config.layout]
        if (layout) {
          return layout(h, el, i, currentItem.children)
        }
        return this.layoutIsNotFound()
      })
    },
    colFormItem (h: any, currentItem: any, index: number, list: Array<any>) {
      const { activeItem } = this.$listeners as any
      const config = currentItem.config
      const child = this.renderChildren(h, currentItem)
      let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
      if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
      let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
      if (config.showLabel === false) labelWidth = '0'
      return (
        <el-col span={config.span} class={className}
          nativeOnClick={(event: any) => {
            activeItem(currentItem);
            event.stopPropagation()
          }}>
          <el-form-item label-width={labelWidth}
            label={config.showLabel ? config.label : ''} required={config.required}>
            <render-component key={config.renderKey} conf={currentItem} onInput={(event: any) => {
              this.$set(config, 'defaultValue', event)
            }}>
              {child}
            </render-component>
          </el-form-item>
          {this.itemBtns(h, currentItem, index, list)}
        </el-col>
      )
    },

    rowFormItem (h: any, currentItem: any, index: number, list: Array<any>) {
      const { activeItem } = this.$listeners as any
      const config = currentItem.config
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item'
      let child = this.renderChildren(h, currentItem)
      if (currentItem.type === 'flex') {
        child = <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
          {child}
        </el-row>
      }
      return (
        <el-col span={config.span}>
          <el-row gutter={config.gutter} class={className}
            nativeOnClick={(event: any) => { activeItem(currentItem); event.stopPropagation() }}>
            <span class="component-name">{config.componentName}</span>
            <draggable list={currentItem.children || []} animation={340} group="componentsGroup" class="drag-wrapper">
              {child}
            </draggable>
            {this.itemBtns(h, currentItem, index, list)}
          </el-row>
        </el-col>
      )
    },
    raw (h: any, currentItem: any) {
      const config = currentItem.config
      const child = this.renderChildren(h, currentItem)
      return <render-component key={config.renderKey} conf={currentItem} onInput={(event: any) => {
        this.$set(config, 'defaultValue', event)
      }}>
        {child}
      </render-component>
    }
  },
  render (h: CreateElement) {
    const self = this as any
    const layout = self[this.currentItem.config.layout]
    if (layout) {
      const element: JSX.Element = layout(h, this.currentItem, this.index, this.drawingList)
      return element
    }
    return (<div>{`没有与${this.currentItem.config.layout}匹配的layout`}</div>)
  }
})
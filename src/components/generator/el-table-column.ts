export default {
  config: {
    type: 'table',
    tag: 'el-table-column',
    tagIcon: 'tableColumn',
    layout: 'block',
    label: '表格列',
    isPagination: true,
    document: 'https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes'
  },
  props: {
    type: null,
    index: null,
    columnKey: null,
    label: null,
    prop: null,
    width: null,
    minWidth: null,
    fixed: null,
    // renderHeader: () => (),
    sortable: false,
    // sortMethod: () => (),
    // sortBy: () => (),
    // sortOrders: () => (),
    resizable: true,
    // formatter: () => (),
    showOverflowTooltip: true,
    align: 'left',
    headerAlign: null,
    className: null,
    labelClassName: null,
    // selectable: () => (),
    reserveSelection: false
  }
}
<template>
  <table
    :class="{
      'm-table__border': border
    }"
    :style="{
      width: width
    }"
    class="m-table m-table-head"
  >
    <colgroup>
      <col v-for="(column, index) in columns" :key="column.label + index" :width="column.width" />
      <col v-if="hasGutter" :width="gutterWidth" name="gutter" />
    </colgroup>
    <thead ref="thead">
      <th
        v-for="(column, index) in columns"
        :key="column.label + index"
        :style="{
          width: column.width,
          height: headHeight
        }"
        :class="cellClass(column, index)"
        class="m-table-column"
        colspan="1"
        rowspan="1"
        @mousemove="thMouseMove"
        @mousedown="thMouseDown($event, index)"
      >
        {{ column.label }}
      </th>
      <th v-if="hasGutter" class="gutter"></th>
    </thead>
  </table>
</template>
<script>
export default {
  name: 'MTableHeader',
  props: {
    columns: Array,
    width: [String, Number],
    border: Boolean,
    headHeight: [String, Number],
    hasGutter: Boolean,
    gutterWidth: [String, Number]
  },
  updated() {
    if (this.__updated__) return
    this.setCol()
    this.__updated__ = true
  },
  mounted() {
    this.setCol()
  },
  methods: {
    cellClass(col, index) {
      let name = ''
      switch (col.align) {
        case 'center':
          name = 'is-center'
          break
        case 'right':
          name = 'is-right'
          break
        default:
          name = col.index ? 'is-center' : 'is-left'
      }
      const thClass =
        typeof col.labelClassName === 'function'
          ? col.labelClassName({ column: { ...col }, index })
          : col.labelClassName
      return [name, thClass]
    },
    thMouseMove(e) {
      const offsetRight = e.target.offsetWidth - e.offsetX
      if (offsetRight < 10) {
        e.target.style.cursor = 'col-resize'
      } else {
        e.target.style.cursor = ''
      }
    },
    thMouseDown(e, index) {
      const offsetRight = e.target.offsetWidth - e.offsetX
      if (offsetRight > 10) return null
      this.$emit('col-resize', {
        event: e,
        column: this.columns[index]
      })
    },
    setCol() {
      const childs = this.$el.querySelectorAll('thead > th')
      if (!childs.length) return
      for (let i = 0, len = childs.length; i < len; i++) {
        const th = childs[i]
        if (th.className.indexOf('gutter') === -1) {
          this.columns[i].width = th.offsetWidth
        }
      }
    }
  }
}
</script>

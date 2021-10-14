<template>
  <div
    ref="column"
    :style="{
      flex: toFlexVal(width, minWidth),
      textAlign: align
    }"
    class="single-column tooltip"
  >
    <el-tooltip
      v-if="String(toolTip) && showToolTip"
      :content="String(toolTip)"
      visible-arrow
      effect="dark"
      placement="top-start"
    >
      <span ref="columnSpan">
        <slot></slot>
      </span>
    </el-tooltip>
    <slot v-else></slot>
  </div>
</template>
<script>
import { toFlexVal } from '@/utils/table'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: 'TableColumn',
  props: {
    width: [Number, String],
    minWidth: [Number, String],
    label: {
      type: String,
      default: () => ''
    },
    align: {
      type: String,
      default: () => ''
    },
    toolTip: {
      type: [String, Number],
      default: () => ''
    }
  },
  data() {
    return {
      parent: null,
      column: null,
      toFlexVal: toFlexVal,
      showToolTip: false
    }
  },
  watch: {
    width(val) {
      this.column.width = val
    },
    minWidth(val) {
      this.column.minWidth = val
    },
    label(val) {
      this.column.label = val
    },
    align(val) {
      this.column.align = val
    },
    toolTip() {
      // 分页时resize()直接调用el.scrollWidth值不正确，需要这样处理
      this.$nextTick(this.resize)
    }
  },
  created() {
    const column = {
      ...this.$props
    }
    this.parent = this.getParent('Table')
    this.column = column
  },
  mounted() {
    this.parent.columns.push(this.column)
    this.resize()
  },
  methods: {
    getParent(name) {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== name) {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return null
    },
    // 监听某个div的宽度变化
    resize() {
      const erd = elementResizeDetectorMaker()
      erd.listenTo(this.$refs.column, el => {
        if (el.scrollWidth > el.offsetWidth) {
          this.showToolTip = true
        } else {
          this.showToolTip = false
        }
      })
    }
  }
}
</script>
<style scoped>
.single-column {
  padding: 18px 10px;
  flex: 1 0 100px;
  cursor: pointer;
  line-height: 24px;
}
.el-tooltip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

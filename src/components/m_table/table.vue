<template>
  <div class="list">
    <div class="table-header">
      <div
        v-for="item in headers"
        :key="item.label"
        :style="{
          flex: toFlexVal(item.width, item.minWidth),
          textAlign: item.align
        }"
        class="tooltip"
      >
        {{ item.label }}
      </div>
    </div>
    <div
      v-for="(item, index) in data"
      :key="item.userId"
      :class="[
        isEdit && index === current && (item[currentRowNoEdit] || !currentRowNoEdit) ? 'current' : '',
        isEdit ? 'column-edit' : 'column'
      ]"
      style="position: relative"
      @click.stop="clickCurrent(item, index)"
      @mouseenter.stop="enterDelete(item, index)"
      @mouseleave.stop="leaveDelete()"
    >
      <slot :item="item" :edit="current === index && (item[currentRowNoEdit] || !currentRowNoEdit)"> </slot>
      <div
        v-show="isDelete && hoverCurrent === index && index !== current && isEdit"
        class="delete"
        @click.stop="clickDelete(item, index)"
      >
        <i title="删除" class="iconfont icon-a-shanchubeifen2"></i>
      </div>
    </div>
    <div v-if="!data.length" class="dashboard">
      <img class="fire-arrow" src="@/assets/svg/fire-arrow.svg" alt="fire arrow" />
      <div class="text">暂无数据</div>
    </div>
  </div>
</template>
<script>
import { toFlexVal } from '@/utils/table'
export default {
  name: 'Table',
  componentName: 'Table',
  components: {},
  props: {
    // 整个列表的数据
    data: {
      type: Array,
      default: () => []
    },
    // 是否点击可编辑
    isEdit: {
      type: Boolean,
      default: true
    },
    // 是否hover删除
    isDelete: {
      type: Boolean,
      default: false
    },
    // 当前行不可编辑，该值为item的某个属性，item[currentRowNoEdit] = 1(可编辑)/0(不可编辑) (true/false)
    currentRowNoEdit: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      columns: [],
      headers: [],
      current: false, // 当前点击行
      hoverCurrent: false, // 当前hover行
      toFlexVal: toFlexVal
    }
  },
  watch: {
    columns(val) {
      // 处理表头数据
      const info = []
      this.headers = val.filter(d => {
        if (info.indexOf(d.label) === -1) {
          info.push(d.label)
          return d
        }
      })
    }
  },
  methods: {
    // 鼠标点击某一项
    clickCurrent(item, index) {
      if (item[this.currentRowNoEdit] || !this.currentRowNoEdit) {
        this.current = index
        this.$emit('currentClick', item, index)
      } else {
        this.closeE()
      }
    },
    // 鼠标悬浮事件
    enterDelete(item, index) {
      this.hoverCurrent = index
    },
    // 鼠标移出事件
    leaveDelete() {
      this.hoverCurrent = false
    },
    // 点击hover删除
    clickDelete(item, index) {
      this.$emit('clickDelete', item, index)
    },
    toCssVal(val) {
      if (!val) return null
      if (/(px|rem|rem)/.test(val.toString())) return val
      else return val + 'px'
    },
    closeE() {
      this.current = false
    }
  }
}
</script>
<style scoped>
.list {
  padding: 10px 10px;
}
/* 当前行选中样式 */
.current {
  box-shadow: 0px 0px 6px 1px rgba(89, 126, 247, 0.29);
  border-radius: 8px;
  background: #fff;
}

/* 当前行悬浮样式 下面两个样式得一起改 */
.column-edit:hover {
  box-shadow: 0px 0px 6px 1px rgba(89, 126, 247, 0.29);
  border-radius: 8px;
  background: #fff;
}
.column:hover {
  box-shadow: 0px 0px 6px 1px rgba(89, 126, 247, 0.29);
  border-radius: 8px;
  background: #fff;
}

/* 表头 */
.table-header {
  width: 100%;
  height: 46px;
  font-size: 14px;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
}
.table-header::-webkit-scrollbar {
  display: none;
}
.table-header > div {
  line-height: 46px;
  padding: 0 10px;
  flex: 1 0 100px;
}

/* 下面两个样式得一起改！！！！！ */
.column-edit > .content {
  width: 100%;
  height: 64px;
  color: #86888e;
  background: #fff;
  font-size: 14px;
  border-radius: 8px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
}
.column {
  width: 100%;
  height: 64px;
  color: #86888e;
  background: #fff;
  font-size: 14px;
  border-radius: 8px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
}
/* ********** end ************* */

/* 下面两个样式得一起改！！！！！ */
.column-edit > .content::-webkit-scrollbar {
  display: none;
}
.column-edit::-webkit-scrollbar {
  display: none;
}
/* ********** end ************* */

/* 下面两个样式得一起改！！！！！ */
.column-edit > .edit {
  width: 100%;
  height: 64px;
  padding: 14px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.column > .edit {
  width: 100%;
  height: 64px;
  padding: 14px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/* 暂无数据 */
.dashboard {
  display: flex;
  padding-top: 130px;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 270px);
  flex: 1;
}
.dashboard .fire-arrow {
  height: 51px;
  widows: 51px;
}
.dashboard .text {
  margin-top: 10px;
  color: #597ef7;
  font-size: 16px;
}
/* hover删除 */
.delete {
  position: absolute;
  top: 20px;
  right: 10px;
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
}
</style>

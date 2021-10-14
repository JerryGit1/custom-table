<template>
  <div>
    <!--
      Table 编辑 钩子函数：
          currentClick 点击某一行触发的事件
            @param item 当前行数据
            @param index 当前条index

      Table Methods:
            closeE() 关闭编辑状态，确认/取消 编辑

      Table组件参数:
          isEdit 是否点击编辑 默认true
            true:
                <Table :data="tableData">
                    <template v-slot:default="{ item, edit }">
                      <div v-if="edit" class="edit">编辑状态</div>
                      <div v-else class="content">
                        <table-column>{{ item.name }}</table-column>
                        <table-column>{{ item.user }}</table-column>
                        ......
                      </div>
                    </template>
                </Table>
            false:
                <Table :isEdit="false" :data="tableData">
                  <template v-slot:default="{ item }">
                    <table-column>{{ item.name }}</table-column>
                    <table-column>{{ item.user }}</table-column>
                    ......
                  < /template>
                </Table>

          data 传入的列表数据

      column参数:
          width 设置列固定宽度
          min-width 最小宽度 多余空间自适应
          label 表头信息
          align 对齐方式
     -->
    <Table :isEdit="true" :data="tableData">
      <template v-slot:default="{ item, edit }">
        <div v-if="edit" class="edit">
          <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div v-else class="content">
          <table-column width="200" label="图标">
            {{ item.title }}
          </table-column>
          <table-column width="200" label="系统标题">{{ item.name }}</table-column>
          <table-column width="200" label="系统名称">{{ item.name }}</table-column>
          <table-column width="200" label="描述">{{ item.name }}</table-column>
          <table-column width="200" label="状态">{{ item.name }}</table-column>
          <table-column width="200" label="操作">{{ item.name }}</table-column>
          <table-column width="200" label="???">{{ item.name }}</table-column>
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
// 我的
import Table from '@/components/m_table/table.vue'
import tableColumn from '@/components/m_table/table-column.vue'

/**
 *
 * 列表的分页好像有问题
 *
 * 删除某行传的id
 *
 */

export default {
  components: { Table, tableColumn },
  data() {
    return {
      tableData: []
    }
  },
  watch: {},
  created() {
    this.tableData = [
      {
        systemId: 132,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: null,
        theme: null,
        basepath: '',
        status: 1,
        name: '222',
        title: '11',
        description: '',
        ctime: 1631696224667,
        orders: 1631696224667
      },
      {
        systemId: 131,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: null,
        theme: null,
        basepath: '',
        status: 1,
        name: '丁大姐管理系统1',
        title: 'svg？？？',
        description: '这是一个伟大的管理系统',
        ctime: 1631684977430,
        orders: 1631684977430
      },
      {
        systemId: 129,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: null,
        theme: null,
        basepath: null,
        status: 1,
        name: 'test_gqr_01',
        title: '测试',
        description: null,
        ctime: 1631670020646,
        orders: 1631670020646
      },
      {
        systemId: 104,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: 1,
        name: 'ehr_front',
        title: 'EHR-前端系统',
        description: '',
        ctime: 1626405296652,
        orders: 1626405296652
      },
      {
        systemId: 102,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: -1,
        name: '权限系统',
        title: '权限系统11111',
        description: '',
        ctime: 1625042482160,
        orders: 1625042482160
      },
      {
        systemId: 18,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: 1,
        name: '报销系统',
        title: '报销系统111',
        description: '',
        ctime: 1623979569393,
        orders: 1623979569393
      },
      {
        systemId: 17,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: -1,
        name: 'test14',
        title: '安全保障',
        description: '',
        ctime: 1623912251498,
        orders: 1623912251498
      },
      {
        systemId: 15,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: 1,
        name: 'daka',
        title: '打卡系统',
        description: '',
        ctime: 1623912166832,
        orders: 1623912166832
      },
      {
        systemId: 14,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: 1,
        name: '报销',
        title: '报销系统',
        description: '',
        ctime: 1623912143577,
        orders: 1623912143577
      },
      {
        systemId: 13,
        icon: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg',
        banner: '',
        theme: '#000000',
        basepath: '',
        status: 1,
        name: 'finance',
        title: '财务系统',
        description: '',
        ctime: 1623912116634,
        orders: 1623912116634
      }
    ]
  },
  methods: {}
}
</script>
<style scoped></style>

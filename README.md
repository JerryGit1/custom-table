# 自定义el-table组件
------

遇到比较有设计感的列表，<el-table>很难实现复杂的样式
主要提供自定义样式，还能保留我们使用<el-table>的习惯

## 使用文档
### 1. Table Attributes
| 参数            | 说明       |  类型   | 可选值  |默认值
| --------        | ----      | ----  |---|------|
| data            |显示的数据 | Array   | -       |-|
| isEdit          |是否支持点击编辑  |   Boolean   |-|true
| isDelete        |是否支持hover删除    |  Boolean  |-|false
| currentRowNoEdit|限制某一行不可编辑，该值传入item的某个属性|string/Boolean|-|-

### 2. Table Events
| 事件名       | 说明              |  参数
| --------     | -----             | ----  |
| currentClick | 点击某一行触发的事件 | row，index
| clickDelete  | 点击hover删除触发的事件（ isDelete为true可用 )|row，index  |-|true

### 3. Table Methods
| 方法名       | 说明              |  参数
| --------     | -----             | ----  |
| closeE | 关闭当前行编辑状态 |-

### 4. Table Events
| 参数     | 说明       |  类型   | 可选值  |默认值
| --------        | ----------     | ----  |---|------|
| width            |对应列的宽度 | string   | -       |-|
| min-width          |对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给没设置 width 的列  |   string   |80-px|-
| label        |显示的标题   |  string  |-|-
| align|对齐方式|string|left/center/right|left
| toolTip|当内容过长被隐藏时显示 tooltip|Boolean|-|false

## 在线文档
https://blog.csdn.net/jerryJJYY/article/details/120758054

## 运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

// 提交格式：git commit -m <type>[optional scope]: <description>
/**
 * type类型
  upd：更新某功能（不是 feat, 不是 fix）
  feat：新功能（feature）
  fix：修补bug
  perf: 优化相关，比如提升性能、体验
  docs：文档（documentation）
  style： 格式（不影响代码运行的变动）
  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  test：增加测试
  chore：构建过程或辅助工具的变动
 */
// optional scope ：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
// description：一句话描述此次提交的主要内容，做到言简意赅。
// 0为disable，1为warning，2为error
// subject是 commit 目的的简短描述，可以做一些配置，如最大长度限制
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['upd', 'feat', 'fix', 'perf', 'refactor', 'docs', 'chore', 'style', 'revert']],
    'type-case': [0], //type大小写
    'type-empty': [0],
    'scope-empty': [0], //作用域
    'subject-case': [0], //条件说明不能为空
    'scope-case': [0], //作用域不区分大小写
    'subject-full-stop': [0, 'never'], // 条件可以以 .结尾
    'header-max-length': [0, 'always', 72] // header有value或更少的字符
  }
}

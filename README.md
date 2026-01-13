## 🚀 简介

`geeking Admin` 是一款 完全免费 且可商用的中后台解决方案，基于 🌟 `Vue3.x` 🌟、🚀 `Vite` 🚀、✨ [Naive UI](https://www.naiveui.com/) ✨ 和 🎉 `TypeScript` 🎉。
它融合了最新的前端技术栈，提炼了典型的业务模型和页面，包括二次封装组件、动态菜单、权限校验等功能，助力快速搭建企业级中后台项目

## 🌈 特性

🌱 使用 Vue3/Vite2，开箱即用的前端框架
🎨 规范的代码结构，良好的代码注释，便于阅读与二次开发
📦 二次封装的实用高扩展性组件
🎨 响应式、多主题、多配置，快速集成，开箱即用
🚀 强大的鉴权系统，支持 三种鉴权模式，满足多样业务需求
🌐 持续更新的实用性页面模板和交互设计，简化页面构建

## 📚 文档

## 🛠 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [NaiveUi](https://www.naiveui.com/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 🏗️ 使用

- 获取项目代码

```bash
git clone https://github.com/geek-tim/geeking-admin.git
```

- 安装依赖

```bash
cd geeking-admin

pnpm install

```

- 运行

```bash
pnpm run dev
```

- 单元测试

```bash
pnpm run test:unit
```

- 代码格式检查

```bash
pnpm run lint
```

- 提交代码(规范化)

```bash
pnpm run commit
```

- 打包

```bash
pnpm build
```

## 📜 更新日志

[CHANGELOG](./CHANGELOG.md)

## 🤝 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/geek-tim/geeking-admin/issues) 或者提交一个 `Pull Request`

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## 📋 Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))
    - `feat` 增加新功能
    - `fix` 修复问题/BUG
    - `style` 代码风格相关无影响运行结果的
    - `perf` 优化/性能提升
    - `refactor` 重构
    - `revert` 撤销修改
    - `test` 测试相关
    - `docs` 文档/注释
    - `chore` 依赖更新/脚手架配置修改等
    - `workflow` 工作流改进
    - `ci` 持续集成
    - `types` 类型定义文件更改
    - `wip` 开发中

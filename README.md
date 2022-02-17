## 一、简介
（项目逐步完善中...）

react后台管理系统，基于create-react-app搭建，供学习参考。
+ 主技术栈：react 17 + react-router 6 + mobx 6 + antd 4
+ 代码校验：eslint + stylelint + husky
+ csdn个人博客：https://blog.csdn.net/u010059669?type=blog

## 二、命令
``` bash
# 安装依赖
npm i

# 本地启动
npm start

# 打包
npm run build
```

## 三、lint配置
+ vscode安装扩展`ESlint`和`Stylelint`
+ vscode设置文件settings.json里配置：
```json
// eslint插件配置
"eslint.validate": [
  "html",
  "vue",
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
],
// stylelint插件配置
"css.validate": false,
"less.validate": false,
"scss.validate": false,
"stylelint.validate": [
  "css",
  "less",
  "postcss"
],
// 配置保存时自动修复
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.fixAll.stylelint": true
},
```

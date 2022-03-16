## 一、简介
react后台管理系统，基于create-react-app搭建，供学习参考。
+ 主技术栈：react 17 + react-router 6 + mobx 6 + antd 4
+ 代码校验：eslint + stylelint + husky

TS版分支：[typescript](https://github.com/neohan666/react-antd-mobx-admin/tree/typescript)

## 二、功能
+ 界面排版简介高效。
+ 侧边栏菜单根据路由配置自动生成。
+ 前端自主可控的权限管理方案，配置简单，扩展方便。（[权限设计方案](https://blog.csdn.net/u010059669/article/details/123112335)）
+ 路由统一管理，以及实现路由拦截。（[具体方案实现](https://blog.csdn.net/u010059669/article/details/122359412)）
+ 使用mobx状态管理工具，配置简单。（[具体配置方式](https://blog.csdn.net/u010059669/article/details/122476596)）

![image](/src/assets/img/preview.png)

## 三、命令
``` bash
# 安装依赖
npm i

# 本地启动
npm start

# 打包
npm run build
```

## 三、代码编写
+ 统一使用 react hook 代码组织方式。
+ 页面和组件统一使用 jsx 文件后缀名。
+ 组件命名：
  - `组件文件夹`命名使用首字母大写驼峰；
  - `组件文件`命名使用首字母小写驼峰。
+ 样式隔离：less样式文件通过不同的根类名包裹来实现隔离效果。根类名的命名规则：根据文件目录来拼接，`src/views/`目录下以`v`开头，`src/components/`目录下以`c`开头。
  - 示例1：文件`src/views/test/index.less`，命名`.v-test-index {}`
  - 示例2：文件`src/components/PageLayout/index.less`，命名`.c-PageLayout-index {}`
+ store状态管理：在页面/组件中使用`src/hooks/storeHook`来获取/同步store数据。

## 四、lint配置
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

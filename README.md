# @hrbbeer/create-cli

一个简洁高效的前端项目脚手架工具，内置了一些功能模板，帮助开发者快速创建 Vue3 和 React 的初始项目，将精力主要放在之后的业务开发上。

## ✨ 特性

- 🎯 **多框架支持**：Vue3、React
- 📝 **多语言支持**：JavaScript、TypeScript
- 🎨 **项目类型**：Admin 管理系统、Screen 数据大屏
- 🔧 **可选功能**：
  - 代码混淆
  - 国际化（i18n）
  - 权限管理
  - 主题切换

## 📦 安装

```bash
npm install -g @hrbbeer/create-cli
```

或使用本地链接（开发调试时）：

```bash
npm link
```

## 🚀 使用

```bash
create-fy-cli <project-name>
```

执行命令后，按提示选择：

1. **前端框架**：vue3 / react
2. **项目类型**：admin / screen
3. **编程语言**：js / ts
4. **功能选项**：代码混淆、国际化、权限管理、主题切换

## 📋 示例

```bash
# 创建 Vue3 + TypeScript + Admin 项目
create-fy-cli my-admin-project

# 创建 React + JavaScript + Screen 项目
create-fy-cli my-screen-project
```

## 🛠️ 技术栈

### Vue3 模板
- Vue 3 + Vite
- Pinia（状态管理）
- Vue Router（路由）
- Element Plus（UI 组件库）
- Tailwind CSS（样式）

### React 模板
- React + Vite
- Redux Toolkit（状态管理）
- React Router（路由）
- Ant Design（UI 组件库）

## 📝 功能说明

### 代码混淆
生产环境代码混淆，提升代码安全性。

### 国际化
支持多语言切换，默认提供中文和英文。

### 权限管理
完整的权限控制系统，支持角色和权限验证。

### 主题切换
支持浅色/深色主题切换。

## 📄 License

[MIT](LICENSE)

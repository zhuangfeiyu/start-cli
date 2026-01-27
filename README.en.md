# @fy/create-cli

A concise and efficient frontend project scaffolding tool with built-in feature templates, helping developers quickly create initial Vue3 and React projects, allowing them to focus on business development.

## ✨ Features

- 🎯 **Multi-framework Support**: Vue3, React
- 📝 **Multi-language Support**: JavaScript, TypeScript
- 🎨 **Project Types**: Admin Management System, Screen Data Dashboard
- 🔧 **Optional Features**:
  - Code Obfuscation
  - Internationalization (i18n)
  - Permission Management
  - Theme Switching

## 📦 Installation

```bash
npm install -g @fy/create-cli
```

Or use local link (for development and debugging):

```bash
npm link
```

## 🚀 Usage

```bash
create-fy-cli <project-name>
```

After executing the command, follow the prompts to select:

1. **Frontend Framework**: vue3 / react
2. **Project Type**: admin / screen
3. **Programming Language**: js / ts
4. **Features**: Code Obfuscation, Internationalization, Permission Management, Theme Switching

## 📋 Examples

```bash
# Create Vue3 + TypeScript + Admin project
create-fy-cli my-admin-project

# Create React + JavaScript + Screen project
create-fy-cli my-screen-project
```

## 🛠️ Tech Stack

### Vue3 Template
- Vue 3 + Vite
- Pinia (State Management)
- Vue Router (Routing)
- Element Plus (UI Components)
- Tailwind CSS (Styling)

### React Template
- React + Vite
- Redux Toolkit (State Management)
- React Router (Routing)
- Ant Design (UI Components)

## 📝 Feature Description

### Code Obfuscation
Production code obfuscation for enhanced security.

### Internationalization
Multi-language support with Chinese and English by default.

### Permission Management
Complete permission control system supporting role and permission verification.

### Theme Switching
Support for light/dark theme switching.

## 📄 License

[MIT](LICENSE)

import path from 'path';
import { fileURLToPath } from 'url';
import { featuresChoices } from './prompts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 将featuresChoices转换为对象，value为key，name为value
 */
const features = featuresChoices.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

/**
 * 配置文件
 */
export const config = {
  // 项目信息
  name: '@hrbbeer/create-cli',
  version: '1.0.2',
  description: '自定义前端项目脚手架',

  // 模板路径
  templates: {
    root: path.join(__dirname, '../templates'),
    common: path.join(__dirname, '../templates/common'),
    deploy: path.join(__dirname, '../templates/common/deploy')
  },

  // 支持的框架
  frameworks: ['vue3', 'react'],

  // 支持的项目类型
  projectTypes: ['screen', 'admin'],

  // 支持的编程语言
  languages: ['js', 'ts'],

  // 功能选项
  features: features,

  // create-vue 配置
  createVue: {
    packageName: 'create-vue',
    installCommand: ['npm', 'create', 'vue@latest'],
    createCommand: 'npm',
    defaultPreset: 'default'
  },

  // 文件扩展名映射
  extensions: {
    js: '.js',
    ts: '.ts',
    vue: '.vue',
    react: '.jsx'
  },

  // 默认配置
  defaults: {
    framework: 'vue3',
    type: 'admin',
    language: 'js',
    features: ['deploy']
  }
};

/**
 * 获取模板路径
 */
export function getTemplatePath(framework, type, language) {
  return path.join(config.templates.root, framework, type, language);
}

/**
 * 获取部署文件路径
 */
export function getDeployPath() {
  return config.templates.deploy;
}

/**
 * 验证配置
 */
export function validateConfig(answers) {
  const errors = [];

  if (!config.frameworks.includes(answers.framework)) {
    errors.push(`不支持的框架: ${answers.framework}`);
  }

  if (!config.projectTypes.includes(answers.type)) {
    errors.push(`不支持的项目类型: ${answers.type}`);
  }

  if (!config.languages.includes(answers.language)) {
    errors.push(`不支持的编程语言: ${answers.language}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

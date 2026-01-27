import inquirer from 'inquirer';

/**
 * 功能选项
 */
export const featuresChoices = [
  { name: '代码混淆', value: 'obfuscate' },
  // { name: '生成部署文件', value: 'deploy' },
  { name: '国际化', value: 'international' },
  { name: '权限管理', value: 'permission' },
  { name: '主题切换', value: 'theme' },
];

/**
 * 交互式提示配置
 */
export const prompts = [
  {
    type: 'list',
    name: 'framework',
    message: '选择前端框架:',
    choices: ['vue3', 'react']
  },
  {
    type: 'list',
    name: 'type',
    message: '选择项目类型:',
    choices: ['screen', 'admin']
  },
  {
    type: 'list',
    name: 'language',
    message: '选择编程语言:',
    choices: ['js', 'ts']
  },
  {
    type: 'checkbox',
    name: 'features',
    message: '选择功能:',
    choices: featuresChoices,
    default: featuresChoices.map(item => item.value)
  }
];

/**
 * 获取用户输入
 */
export async function getUserInput() {
  return await inquirer.prompt(prompts);
}

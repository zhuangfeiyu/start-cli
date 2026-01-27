#!/usr/bin/env node

/**
 * 入口文件
 */

// 命令行工具
import { Command } from 'commander';
// 核心业务逻辑方法，集中抽取到lib下管理
import { ProjectGenerator, getUserInput, Utils, validateConfig } from '../lib/index.js';

const program = new Command();

program
  .name('create-fy-cli')
  .description('😸😸自定义前端项目脚手架😸😸')
  .version('1.0.0','-v, --version', '显示版本号')
  .helpOption('-h, --help', '显示帮助信息');

program
  .argument('<project-name>', '项目名称')
  .action(async (projectName) => {
    try {
      // 1.验证项目名称
      const nameValidation = Utils.validateProjectName(projectName);
      if (!nameValidation.valid) {
        console.error(`❌ ${nameValidation.message}`);
        return;
      }

      // 2.获取用户输入
      const answers = await getUserInput();

      // 3.验证配置
      const configValidation = validateConfig(answers);
      if (!configValidation.valid) {
        console.error('❌ 配置验证失败:');
        configValidation.errors.forEach(error => console.error(`  - ${error}`));
        return;
      }

      // 4.创建项目生成器并生成项目
      const generator = new ProjectGenerator(projectName, answers);
      await generator.generate();

    } catch (error) {
      console.error('❌ 发生错误:', error.message);
    }
  });

program.parse(process.argv);
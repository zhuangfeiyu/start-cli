import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import ora from 'ora';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

/**
 * 项目生成器类
 */
export class ProjectGenerator {
  constructor(projectName, answers) {
    this.projectName = projectName;
    this.answers = answers;
    this.targetDir = path.join(process.cwd(), projectName);
  }

  /**
   * 检查 create-vue 是否可用
   */
  async checkCreateVue() {
    try {
      await execa('npm', ['create', 'vue@latest', '--help'], { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 使用 create-vue 创建项目
   */
  async createWithCreateVue() {
    const spinner = ora('正在使用 create-vue 创建项目...').start();
    
    try {
      // 构建 npm create vue 命令
      const args = ['create', 'vue@latest', this.projectName];
      
      // create-vue 使用交互式选择，不需要额外参数
      // 它会自动提示用户选择 TypeScript、Router、Pinia 等选项
      
      await execa('npm', args, { 
        stdio: 'inherit', // 使用 inherit 让用户看到交互式选择
        cwd: process.cwd()
      });
      
      spinner.succeed('项目创建成功');
      
      // 如果选择了部署文件，拷贝到目标目录
      if (this.answers.features.includes('deploy')) {
        await this.addDeployFiles();
      }
      
      return true;
    } catch (error) {
      spinner.fail('项目创建失败');
      console.error(chalk.red(error.message));
      return false;
    }
  }

  /**
   * 使用静态模板创建项目
   */
  async createWithTemplate() {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      console.log('+++++__dirname >>>>> ',__dirname);
      const templateDir = path.join(__dirname, '../templates', this.answers.framework, this.answers.language);
      
      console.log('+++++templateDir >>>>> ',templateDir);
      
      // 拷贝模板，排除 node_modules,.git, dist等目录
      await fs.copy(templateDir, this.targetDir, {
        filter: (src, dest) => {
          // 获取相对路径
          const relativePath = path.relative(templateDir, src);
          
          const shouldExclude = relativePath.split(path.sep).some(part => {
            return ['node_modules', '.git', 'dist', '.DS_Store', 'cli-template'].includes(part);
          });
          
          return !shouldExclude;
        }
      });
      
      // 根据类型处理不同的模板文件
      await this.handleTypeSpecificFiles();
      
      // 替换模板中的变量
      await this.replaceTemplateVariables();
      
      // 如果选择了代码混淆，根据模板文件来控制功能
      // 如果选择了部署文件，拷贝到目标目录
      if (this.answers.features.includes('deploy')) {
        await this.addDeployFiles();
      }
      // 如果选择了国际化，拷贝到目标目录
      if (this.answers.features.includes('international')) {
        await this.addInternationalFiles();
      }
      // 如果选择了主题，拷贝到目标目录
      if (this.answers.features.includes('theme')) {
        await this.addThemeFiles();
      }
      // 如果选择了权限管理，拷贝到目标目录
      if (this.answers.features.includes('permission')) {
        await this.addPermissionFiles();
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 清除生成项目内容
   */
  async clearOutputFiles() {
    await fs.remove(this.targetDir);
  }

  /**
   * 处理类型特定的文件
   */
  async handleTypeSpecificFiles() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cliTemplateDir = path.join(
      __dirname, 
      '../templates', 
      this.answers.framework, 
      this.answers.language,
      'cli-template'
    );
    
    if (this.answers.type === 'admin') {
      // admin 类型：复制相关的视图和路由文件
      const adminDir = path.join(cliTemplateDir, 'admin');
      
      // 复制 layout 到 src
      const layoutSource = path.join(adminDir, 'layout');
      const layoutTarget = path.join(this.targetDir, 'src', 'layout');
      if (await fs.pathExists(layoutSource)) {
        await fs.copy(layoutSource, layoutTarget);
      }
      
      // 复制 test-info 到 src/views
      const testInfoSource = path.join(adminDir, 'test-info');
      const testInfoTarget = path.join(this.targetDir, 'src', 'views', 'test-info');
      if (await fs.pathExists(testInfoSource)) {
        await fs.copy(testInfoSource, testInfoTarget);
      }
      
      // 替换路由文件 根据框架与语言不同，路由文件后缀不同
      // 路由文件现在是 .ejs 格式，会在 replaceTemplateVariables 中处理
      const { routerSourceFile, routerTargetFile } = this.getRouterFileNames('admin');
      const routerSource = path.join(cliTemplateDir, `${routerSourceFile}.ejs`);
      const routerTargetDir = path.join(this.targetDir, 'src', 'router');
      const routerTarget = path.join(routerTargetDir, `${routerTargetFile}.ejs`);
      if (await fs.pathExists(routerSource)) {
        await fs.ensureDir(routerTargetDir);
        await fs.copy(routerSource, routerTarget);
      }
    } else if (this.answers.type === 'screen') {
      // screen 类型：复制相关的视图和路由文件
      const screenDir = path.join(cliTemplateDir, 'screen');

      // 复制 screen 到 src/views
      const screenSource = path.join(screenDir, 'screen');
      const screenTarget = path.join(this.targetDir, 'src', 'views', 'screen');
      if (await fs.pathExists(screenSource)) {
        await fs.copy(screenSource, screenTarget);
      }
      
      // 复制 images 到 src/assets/images
      const imagesSource = path.join(screenDir, 'images');
      const imagesTarget = path.join(this.targetDir, 'src', 'assets', 'images');
      if (await fs.pathExists(imagesSource)) {
        await fs.copy(imagesSource, imagesTarget);
      }
      
      // 替换路由文件
      // 路由文件现在是 .ejs 格式，会在 replaceTemplateVariables 中处理
      const { routerSourceFile, routerTargetFile } = this.getRouterFileNames('screen');
      const routerSource = path.join(cliTemplateDir, `${routerSourceFile}.ejs`);
      const routerTargetDir = path.join(this.targetDir, 'src', 'router');
      const routerTarget = path.join(routerTargetDir, `${routerTargetFile}.ejs`);
      if (await fs.pathExists(routerSource)) {
        await fs.ensureDir(routerTargetDir);
        await fs.copy(routerSource, routerTarget);
      }
    }
  }

  /**
   * 根据框架与语言获取路由模板与目标文件名
   */
  getRouterFileNames() {
    const isVue = this.answers.framework === 'vue3';
    const isTs = this.answers.language === 'ts';

    if (isVue) {
      return {
        routerSourceFile: isTs ? 'router.ts' : 'router.js',
        routerTargetFile: isTs ? 'index.ts' : 'index.js',
      };
    }

    // 默认 React
    return {
      routerSourceFile: isTs ? 'router.tsx' : 'router.jsx',
      routerTargetFile: isTs ? 'index.tsx' : 'index.jsx',
    };
  }

  /**
   * 代码混淆
   * 安装混淆插件依赖（插件配置已在模板中通过 ejs 处理）
   */
  async obfuscateCode() {
    const spinner = ora('正在安装代码混淆插件...').start();
    
    try {
      const args = ['install', '--save-dev', 'vite-plugin-javascript-obfuscator'];
      await execa('npm', args, { 
        stdio: 'pipe',
        cwd: this.targetDir 
      });
      
      spinner.succeed('代码混淆插件已安装');
    } catch (error) {
      spinner.fail('代码混淆插件安装失败');
      console.error(chalk.red(error.message));
    }
  }

  /**
   * 添加部署文件
   */
  async addDeployFiles() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const deployDir = path.join(__dirname, '../templates/common/deploy');
    await fs.copy(deployDir, this.targetDir);
    console.log(chalk.green('✅ 部署文件已添加'));
  }

  /**
   * 添加国际化文件
   */
  async addInternationalFiles() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const langDir = path.join(
      __dirname, 
      '../templates',
      this.answers.framework,
      this.answers.language,
      'cli-template',
      'lang'
    );
    const langTargetDir = path.join(this.targetDir, 'src', 'lang');
    await fs.copy(langDir, langTargetDir);

    const assetsImagesDir = path.join(this.targetDir, 'src', 'assets', 'images');
    await fs.ensureDir(assetsImagesDir);
    const languageSvgSource = path.join(__dirname, '../templates/common/assets/images/language.svg');
    const languageSvgTarget = path.join(assetsImagesDir, 'language.svg');
    await fs.copy(languageSvgSource, languageSvgTarget);
    
    // 如果同时选择了主题功能，复制深色主题的语言图标
    if (this.answers.features.includes('theme')) {
      const languageDarkSvgSource = path.join(__dirname, '../templates/common/assets/images/language-dark.svg');
      const languageDarkSvgTarget = path.join(assetsImagesDir, 'language-dark.svg');
      // 如果深色图标存在，则复制
      if (await fs.pathExists(languageDarkSvgSource)) {
        await fs.copy(languageDarkSvgSource, languageDarkSvgTarget);
      }
    }
    
    console.log(chalk.green('✅ 国际化文件已添加'));
  }

  /**
   * 添加主题文件（useTheme、useThemeIcon 等 hooks/composables）
   * React 使用 hooks，Vue 使用 composables
   */
  async addThemeFiles() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // React 使用 hooks，Vue 使用 composables
    const hooksDirName = this.answers.framework === 'react' ? 'hooks' : 'composables';
    const hooksDir = path.join(
      __dirname,
      '../templates',
      this.answers.framework,
      this.answers.language,
      'cli-template',
      hooksDirName
    );
    const hooksTargetDir = path.join(this.targetDir, 'src', hooksDirName);
    
    await fs.ensureDir(hooksTargetDir);
    const themeHooks = ['useTheme.ts', 'useThemeIcon.ts'];
    for (const name of themeHooks) {
      const src = path.join(hooksDir, name);
      const dest = path.join(hooksTargetDir, name);
      if (await fs.pathExists(src)) {
        await fs.copy(src, dest);
      }
    }
    
    console.log(chalk.green('✅ 主题文件已添加'));
  }

  /**
   * 添加权限管理文件
   * Vue3 使用 directive，React 使用 components 和 hooks
   */
  async addPermissionFiles() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cliTemplateDir = path.join(
      __dirname,
      '../templates',
      this.answers.framework,
      this.answers.language,
      'cli-template'
    );
    
    if (this.answers.framework === 'vue3') {
      // Vue3: 复制 directive/permission
      const directiveDir = path.join(cliTemplateDir, 'directive');
      const directiveTargetDir = path.join(this.targetDir, 'src', 'directive');
      
      await fs.ensureDir(directiveTargetDir);
      const permissionFile = this.answers.language === 'ts' ? 'permission.ts' : 'permission.js';
      const src = path.join(directiveDir, permissionFile);
      const dest = path.join(directiveTargetDir, permissionFile);
      if (await fs.pathExists(src)) {
        await fs.copy(src, dest);
      }
    } else if (this.answers.framework === 'react') {
      // React: 复制 components/Permission 和 hooks/usePermission
      const componentsDir = path.join(cliTemplateDir, 'components');
      const hooksDir = path.join(cliTemplateDir, 'hooks');
      const componentsTargetDir = path.join(this.targetDir, 'src', 'components');
      const hooksTargetDir = path.join(this.targetDir, 'src', 'hooks');
      
      // 复制 Permission 组件
      await fs.ensureDir(componentsTargetDir);
      const permissionComponent = this.answers.language === 'ts' ? 'Permission.tsx' : 'Permission.jsx';
      const componentSrc = path.join(componentsDir, permissionComponent);
      const componentDest = path.join(componentsTargetDir, permissionComponent);
      if (await fs.pathExists(componentSrc)) {
        await fs.copy(componentSrc, componentDest);
      }
      
      // 复制 usePermission hook
      await fs.ensureDir(hooksTargetDir);
      const permissionHook = this.answers.language === 'ts' ? 'usePermission.ts' : 'usePermission.js';
      const hookSrc = path.join(hooksDir, permissionHook);
      const hookDest = path.join(hooksTargetDir, permissionHook);
      if (await fs.pathExists(hookSrc)) {
        await fs.copy(hookSrc, hookDest);
      }
    }
    
    console.log(chalk.green('✅ 权限管理文件已添加'));
  }

  /**
   * 替换模板中的变量
   * 支持 EJS 风格的模板变量语法 <%= variableName %>
   * 支持 EJS 条件语法 <% if (condition) { %>
   */
  async replaceTemplateVariables() {
    const spinner = ora('正在替换模板变量...').start();
    
    try {
      // 定义要替换的变量
      const variables = {
        projectName: this.projectName,
        type: this.answers.type,
        needObfuscator: this.answers.features.includes('obfuscate'),
        needInternational: this.answers.features.includes('international'),
        needTheme: this.answers.features.includes('theme'),
        needPermission: this.answers.features.includes('permission')
      };

      // 递归遍历目录并替换变量
      await this.processDirectory(this.targetDir, variables);
      
      spinner.succeed('模板变量替换完成');
    } catch (error) {
      spinner.fail('模板变量替换失败');
      console.error(chalk.red(error.message));
    }
  }

  /**
   * 递归处理目录中的所有文件
   */
  async processDirectory(dir, variables) {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = await fs.stat(itemPath);
      
      // 跳过 node_modules、dist、.git 等目录
      if (stats.isDirectory()) {
        if (['node_modules', 'dist', '.git'].includes(item)) {
          continue;
        }
        await this.processDirectory(itemPath, variables);
      } else if (stats.isFile()) {
        await this.replaceVariablesInFile(itemPath, variables);
      }
    }
  }

  /**
   * 在单个文件中替换变量
   */
  async replaceVariablesInFile(filePath, variables) {
    try {
      // 读取文件内容
      let content = await fs.readFile(filePath, 'utf8');
      
      // 如果是 .ejs 文件，使用 EJS 编译
      if (filePath.endsWith('.ejs')) {
        content = ejs.render(content, variables, {
          filename: filePath,
          strict: false
        });
        
        // 将 .ejs 文件重命名：去掉 .ejs 后缀，如果去掉后没有扩展名则添加 .js
        let newFilePath = filePath.replace(/\.ejs$/, '');
        if (!path.extname(newFilePath)) {
          newFilePath += '.js';
        }
        await fs.writeFile(newFilePath, content, 'utf8');
        await fs.remove(filePath); // 删除原 .ejs 文件
        return;
      }
      
      // 处理 EJS 风格的模板变量（非 .ejs 文件）
      let modified = false;
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`<%=\\s*${key}\\s*%>`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, value);
          modified = true;
        }
      }
      
      // 如果有修改，写回文件
      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
      }
    } catch (error) {
      console.error(chalk.red('❌ 文件 ' + filePath + ' 读取失败: ' + error.message));
    }
  }

  /**
   * 生成项目
   */
  async generate() {
    try {
      let success = false;
      // 使用静态模板创建项目
      success = await this.createWithTemplate();

      if (success) {
        this.showSuccessMessage();
      } else {
        await this.clearOutputFiles();
        console.log(chalk.red('❌ 项目创建失败'));
      }

      return success;
    } catch (error) {
      console.error(chalk.red('❌ 项目创建失败: ' + error.message));
      await this.clearOutputFiles();
      return false;
    }
  }

  /**
   * 显示成功消息
   */
  showSuccessMessage() {
    console.log(chalk.green(`✅ 项目 ${this.projectName} 已创建！`));
    console.log(chalk.blue(`📁 项目位置: ${this.targetDir}`));
    console.log(chalk.blue(`🚀 进入项目目录: cd ${this.projectName}`));
    console.log(chalk.blue(`📦 安装依赖: pnpm install`));
    console.log(chalk.blue(`🏃 启动项目: pnpm run dev`));
  }
}

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * 工具函数集合
 */
export class Utils {
  /**
   * 检查目录是否存在
   */
  static async checkDirExists(dirPath) {
    try {
      await fs.access(dirPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 创建目录
   */
  static async createDir(dirPath) {
    try {
      await fs.ensureDir(dirPath);
      return true;
    } catch (error) {
      console.error(chalk.red(`创建目录失败: ${error.message}`));
      return false;
    }
  }

  /**
   * 复制文件或目录
   */
  static async copyFile(src, dest) {
    try {
      await fs.copy(src, dest);
      return true;
    } catch (error) {
      console.error(chalk.red(`复制文件失败: ${error.message}`));
      return false;
    }
  }

  /**
   * 读取 JSON 文件
   */
  static async readJson(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error(chalk.red(`读取 JSON 文件失败: ${error.message}`));
      return null;
    }
  }

  /**
   * 写入 JSON 文件
   */
  static async writeJson(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(chalk.red(`写入 JSON 文件失败: ${error.message}`));
      return false;
    }
  }

  /**
   * 验证项目名称
   */
  static validateProjectName(name) {
    if (!name) {
      return { valid: false, message: '项目名称不能为空' };
    }
    const invalidStart = /^[0-9_]/;
    if (invalidStart.test(name)) {
      return { valid: false, message: '项目名称不能以数字或下划线开头' };
    }
    if (!/^[a-z0-9-_]+$/.test(name)) {
      return { valid: false, message: '项目名称只能包含小写字母、数字、下划线和连字符' };
    }
    
    return { valid: true };
  }

  /**
   * 格式化文件大小单位
   */
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * 获取相对路径
   */
  static getRelativePath(from, to) {
    return path.relative(from, to);
  }

  /**
   * 检查是否为有效的 URL
   */
  static isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}

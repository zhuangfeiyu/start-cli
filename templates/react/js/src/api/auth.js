import api from './request'

/**
 * 登录接口
 * @param {Object} params - 登录参数
 * @param {string} params.username - 用户名
 * @param {string} params.password - 密码
 * @returns {Promise} 返回 token、用户信息、角色和权限列表
 */
export const login = (params) => {
  return new Promise((resolve) => {
    // Mock 登录接口，模拟网络延迟
    setTimeout(() => {
      const { username, password } = params

      // Mock 数据：根据用户名返回不同的角色和权限
      const mockUsers = {
        admin: {
          token: 'mock-admin-token-' + Date.now(),
          userInfo: {
            id: 1,
            username: 'admin',
            nickname: '管理员',
            email: 'admin@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          },
          role: 'admin',
          permissions: [
            'test-info:view',
            'test-info:create',
            'test-info:edit',
            'test-info:delete',
            'user:view',
            'user:create',
            'user:edit',
            'user:delete',
            'system:config',
          ],
        },
        editor: {
          token: 'mock-editor-token-' + Date.now(),
          userInfo: {
            id: 2,
            username: 'editor',
            nickname: '编辑',
            email: 'editor@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor',
          },
          role: 'editor',
          permissions: [
            'test-info:view',
            'test-info:create',
            'test-info:edit',
          ],
        },
        viewer: {
          token: 'mock-viewer-token-' + Date.now(),
          userInfo: {
            id: 3,
            username: 'viewer',
            nickname: '查看者',
            email: 'viewer@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer',
          },
          role: 'viewer',
          permissions: [
            'test-info:view',
          ],
        },
      }

      // 默认使用 admin，如果用户名匹配则使用对应的用户
      const userData = mockUsers[username] || mockUsers.admin

      // 模拟登录验证（简单验证，实际应该调用真实 API）
      if (username && password) {
        resolve({
          code: 200,
          message: '登录成功',
          data: userData,
        })
      } else {
        resolve({
          code: 400,
          message: '用户名或密码不能为空',
          data: null,
        })
      }
    }, 500) // 模拟 500ms 网络延迟
  })
}

/**
 * 登出接口
 */
export const logout = () => {
  return api.post('/auth/logout')
}

/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => {
  return api.get('/auth/current-user')
}


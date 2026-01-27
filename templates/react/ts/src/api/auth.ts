import type { ApiResponse } from "./request";
import type { LoginParams, UserInfo, AuthData, LoginResponse as ApiLoginResponse } from "@/types/modules/api-type";
import api from "./request";

export type { LoginParams, UserInfo, AuthData };
export type LoginResponse = ApiResponse<AuthData>;

export const login = (params: LoginParams): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { username, password } = params;

      const mockUsers: Record<string, AuthData> = {
        admin: {
          token: `mock-admin-token-${Date.now()}`,
          userInfo: {
            id: 1,
            username: "admin",
            nickname: "管理员",
            email: "admin@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
          },
          role: "admin",
          permissions: [
            "test-info:view",
            "test-info:create",
            "test-info:edit",
            "test-info:delete",
            "user:view",
            "user:create",
            "user:edit",
            "user:delete",
            "system:config",
          ],
        },
        editor: {
          token: `mock-editor-token-${Date.now()}`,
          userInfo: {
            id: 2,
            username: "editor",
            nickname: "编辑",
            email: "editor@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=editor",
          },
          role: "editor",
          permissions: ["test-info:view", "test-info:create", "test-info:edit"],
        },
        viewer: {
          token: `mock-viewer-token-${Date.now()}`,
          userInfo: {
            id: 3,
            username: "viewer",
            nickname: "查看者",
            email: "viewer@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=viewer",
          },
          role: "viewer",
          permissions: ["test-info:view"],
        },
      };

      const userData = mockUsers[username] || mockUsers.admin;

      if (username && password) {
        resolve({
          code: 200,
          message: "登录成功",
          data: userData,
        });
      } else {
        resolve({
          code: 400,
          message: "用户名或密码不能为空",
          data: null,
        });
      }
    }, 500);
  });
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = () => {
  return api.get("/auth/current-user");
};

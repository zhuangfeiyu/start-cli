export interface LoginParams {
    username: string
    password: string
}
  
export interface UserInfo {
    id: number
    username: string
    nickname: string
    email: string
    avatar: string
}

export interface AuthData {
    token: string
    userInfo: UserInfo
    role: string
    permissions: string[]
}

export interface LoginResponse {
    code: number
    message: string
    data: AuthData | null
}

export type UserItem = {
    id: number
    name: string
    role: string
}
export type UserInfo = {
  id?: number
  username?: string
  phone?: string,
  email?: string,
}

export type AuthData = Partial<{
  token: string
  userInfo: UserInfo,
  role: string,
  permissions: string[],
} & Record<string, unknown>>
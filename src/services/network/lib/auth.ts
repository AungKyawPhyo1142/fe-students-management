import { apiClient } from '@/services/network/apiClient.ts'
import { ApiConstantRoutes } from '@/services/network/path.ts'
import { LoginFormValues } from '@/pages/auth/Login.tsx'
import { RegisterFormValues } from '@/pages/auth/Register'

export type STATUS = 'SUCCESS' | 'ERROR'

export interface LoginResponse {
  data: {
    token: string
  }
  status: STATUS
}

export interface RegisterResponse {
  data: {
    id: number
    username: string
    name: string
    role: string
    created_at: string
    updated_at: string
  }
  status: STATUS
}

export const adminRequest = {
  async login(v: LoginFormValues): Promise<LoginResponse> {
    return apiClient.post(ApiConstantRoutes.paths.auth.login, v)
  },
  async register(v: RegisterFormValues): Promise<RegisterResponse> {
    return apiClient.post(ApiConstantRoutes.paths.auth.register, v)
  },
}

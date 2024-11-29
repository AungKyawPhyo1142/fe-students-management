import { apiClient } from '@/services/network/apiClient.ts'
import { ApiConstantRoutes } from '@/services/network/path.ts'
import { LoginFormValues } from '@/pages/auth/Login.tsx'

export type STATUS = 'SUCCESS' | 'ERROR'

export interface LoginResponse {
  data: {
    token: string
  }
  status: STATUS
}

export const adminRequest = {
  async login(v: LoginFormValues): Promise<LoginResponse> {
    return apiClient.post(ApiConstantRoutes.paths.auth.login, v)
  },
}

import { create } from 'zustand'
import { LoginResponse } from '@/services/network/lib/auth.ts'
import { JWTServices } from '@/services/storage/jwt'
import { LocalServices } from '@/services/storage/LocalService'

export interface AuthState {
  username: string
  name: string
  role: string
  token: string
  id: number
  created_at: string
  expires_at: number | null
  status: 'idle' | 'failed' | 'success'
}

type AuthStore = {
  auth: AuthState
  initAfterLogin: (payload: LoginResponse, remember: boolean) => void
  cleanupAfterLogout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    username: '',
    name: '',
    role: '',
    id: 0,
    token: '',
    created_at: '',
    expires_at: null,
    status: 'idle',
  },
  initAfterLogin: (payload: LoginResponse, remember: boolean) => {
    if (payload.data && payload.status === 'SUCCESS') {
      console.log('Payload Data: ', payload.data)
      const data = payload.data
      const decoded = JWTServices.decode(data.token)
      const result: AuthState = {
        ...data,
        username: decoded.username,
        name: decoded.name,
        role: decoded.role,
        id: decoded.id,
        created_at: decoded.created_at,
        expires_at: decoded.exp || null,
        status: 'success',
      }
      set({ auth: result })
      if (remember) LocalServices.setLocalStorage(result)
      console.log('Auth State: ', result)
    } else {
      set({ auth: { ...useAuthStore.getState().auth, status: 'failed' } })
    }
  },
  cleanupAfterLogout: () => {
    LocalServices.clearLocalStorage()
    set({
      auth: {
        username: '',
        name: '',
        role: '',
        id: 0,
        created_at: '',
        expires_at: null,
        token: '',
        status: 'idle',
      },
    })
  },
}))
export const selectAuth = (state: AuthStore) => state.auth
export const initAfterLogin = (payload: LoginResponse, remember: boolean) =>
  useAuthStore.getState().initAfterLogin(payload, remember)
export const cleanupAfterLogout = () =>
  useAuthStore.getState().cleanupAfterLogout()

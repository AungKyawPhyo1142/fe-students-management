// this handle the local storage helper functions for jwt token
// this is mainly use for authentication

import { AuthState } from '@/services/zustand/authStore.ts'
import { config } from '../../../config/register.ts'
import CryptoJS from 'crypto-js'
import { JWTServices } from '@/services/storage/jwt.ts'

const isBrowser = typeof window !== 'undefined'

export const LocalServices = {
  setLocalStorage(value: AuthState): void {
    if (!isBrowser) return
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      config.root,
    ).toString()
    localStorage.setItem(config.name + 'auth', encryptedData)
  },
  getLocalStorage(): AuthState | undefined {
    if (!isBrowser) return undefined
    const item = localStorage.getItem(config.name + 'auth')
    if (item) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(item, config.root).toString(
          CryptoJS.enc.Utf8,
        )
        if (decryptedData) {
          const result: AuthState = JSON.parse(decryptedData)
          if (JWTServices.expired(result.token)) {
            this.clearLocalStorage()
            return undefined
          }
          return result
        }
      } catch (error) {
        console.error('Error:', error)
        this.clearLocalStorage()
      }
    }
  },
  clearLocalStorage(): void {
    if (!isBrowser) return
    localStorage.removeItem(config.name + 'auth')
  },
}

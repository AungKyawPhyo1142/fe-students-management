// this file handle the JWT token helper functions
import * as jose from 'jose'

interface JWTDecoded extends jose.JWTPayload {
  id: number
  username: string
  name: string
  role: string
  created_at: string
}

export const JWTServices = {
  decode(token: string): JWTDecoded {
    const decoded: JWTDecoded = jose.decodeJwt(token)
    console.log('JWT Decoded:', decoded)
    return decoded
  },
  expired(token: string): boolean {
    const decoded: JWTDecoded = jose.decodeJwt(token)
    const now = Math.floor(Date.now() / 1000)
    return !!(decoded.exp && decoded.exp < now)
  },
}

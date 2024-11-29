import developmentCfg from './development/register-config.json'
import productionCfg from './production/register-config.json'

export type AppRegisterConfig = typeof config

const config = {
  name: 'student-management-system',
  root: 'student-management-system-root',
  version: '0.1.0',
  baseURL: 'http://localhost:8080',
  key: import.meta.env.VITE_SECRET_KEY ?? 'development-secret-key',
  ...(import.meta.env.VERCEL_ENV !== 'production'
    ? developmentCfg
    : productionCfg),
}

if (import.meta.env.VERCEL_ENV !== 'production') {
  console.log('Development Config', config)
}

export { config }

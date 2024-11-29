import Button from '@/components/common/Button.tsx'
import { cleanupAfterLogout } from '@/services/zustand/authStore.ts'
import { useNavigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path.ts'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-blue-300 text-4xl text-center h-screen flex flex-col items-center justify-center'>
      <h1>Home</h1>
      <Button
        onClick={() => {
          cleanupAfterLogout()
          navigate(AppConstantRoutes.paths.auth.login, { replace: true })
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Home

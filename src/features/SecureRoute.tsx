// This is the middleware route that checks the user is logged in or not
// If the user is not logged in, it will redirect to the login page
// ** Any routes that are wrapped with this component will be protected with authentication

import { LocalServices } from '@/services/storage/LocalService.ts'
import {
  cleanupAfterLogout,
  initAfterLogin,
  selectAuth,
  useAuthStore,
} from '@/services/zustand/authStore.ts'
import { JWTServices } from '@/services/storage/jwt.ts'
import { Navigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path.ts'

type Props = {
  children: JSX.Element
}
const SecureRoute: React.FC<Props> = (props) => {
  const { children } = props

  const authLocal = LocalServices.getLocalStorage()
  const auth = useAuthStore(selectAuth)
  const token = authLocal?.token || auth.token

  if (!token || (token && JWTServices.expired(token))) {
    if (auth.status !== 'idle') {
      cleanupAfterLogout()
    }
    return <Navigate to={AppConstantRoutes.paths.auth.login} replace />
  } else if (auth.status !== 'success') {
    initAfterLogin(
      {
        data: {
          token: authLocal?.token || '',
        },
        status: 'SUCCESS',
      },
      true,
    )
  }

  return children
}

export default SecureRoute

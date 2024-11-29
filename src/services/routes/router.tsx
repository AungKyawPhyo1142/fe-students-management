import { createBrowserRouter, Navigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path.ts'
import Login from '@/pages/auth/Login.tsx'
import SecureRoute from '@/features/SecureRoute.tsx'
import LayoutWithAuth from '@/components/layout/LayoutWithAuth.tsx'
import Home from '@/pages/admin/Home.tsx'
/*
  Currently the default route is set to the admin dashboard
  since we are currently working on the admin dashboard
*/
export const getDefaultRoute = () => {
  return AppConstantRoutes.paths.admin.home
}

// Define a default route handler
// if the user is already logged in, redirect to the dashboard
// otherwise, redirect to the login page
const handleDefaultRoute = () => {
  // TODO: replace this with the actual logic to check if the user is logged in
  return <Navigate to={AppConstantRoutes.paths.auth.login} />
}

export const router = createBrowserRouter([
  {
    path: '*',
    element: handleDefaultRoute(),
  },
  {
    path: AppConstantRoutes.paths.auth.login,
    element: <Login />,
  },
  // ** the following routes are protected with authentication
  {
    path: AppConstantRoutes.paths.admin.default,
    element: (
      <SecureRoute>
        <LayoutWithAuth />
      </SecureRoute>
    ),
    children: [
      {
        path: AppConstantRoutes.paths.admin.home,
        element: <Home />,
      },
    ],
  },
])

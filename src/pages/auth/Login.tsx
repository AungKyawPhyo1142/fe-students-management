import Button from '@/components/common/Button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Input from '@/components/common/Input.tsx'
import { Label } from '@/components/ui/label'
import { clsx } from 'clsx'
import { Link, Navigate, useNavigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path.ts'
import LayoutWithoutAuth from '@/components/layout/LayoutWithoutAuth.tsx'
import { LocalServices } from '@/services/storage/LocalService.ts'
import { JWTServices } from '@/services/storage/jwt.ts'
import { getDefaultRoute } from '@/services/routes/router.tsx'
import { object, ObjectSchema, string } from 'yup'
import { adminRequest } from '@/services/network/lib/auth.ts'
import { useFormik } from 'formik'
import { useCustomEvents } from '@/services/formik/hooks.ts'
import { initAfterLogin } from '@/services/zustand/authStore.ts'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

export interface LoginFormValues {
  username: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const authLocal = LocalServices.getLocalStorage()
  const { toast } = useToast()

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  }

  const validationSchema: ObjectSchema<LoginFormValues> = object().shape({
    username: string().required('Username is required'),
    password: string().required('Password is required'),
  })

  const onSubmit = async (values: LoginFormValues) => {
    const response = await adminRequest.login(values).catch((e) => {
      if (e.status === 401) {
        toast({
          title: 'Username or password is incorrect',
          description: 'Please check your username and password and try again.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Failed to login',
          description:
            'An error occurred while trying to login. Please try again later.',
          variant: 'destructive',
        })
      }
    })

    if (response) {
      if (response.status === 'SUCCESS') {
        // if login is successful, set the auth state and redirect to the dashboard
        initAfterLogin(response, true)
        const destination = getDefaultRoute()
        navigate(destination, { replace: true })
      } else {
        formik.setErrors({
          username: 'Invalid username or password',
          password: 'Invalid username or password',
        })
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { onInputChange } = useCustomEvents<LoginFormValues>(formik)

  // if user is already logged in or token is not expired, redirect to the dashboard
  const token = authLocal?.token
  if (token && !JWTServices.expired(token)) {
    const destination = getDefaultRoute()
    return <Navigate to={destination} replace />
  }

  return (
    <LayoutWithoutAuth>
      <Toaster />
      <div className='fade-in min-h-screen flex items-center justify-center'>
        <Card className='w-[600px]  p-5'>
          <CardHeader>
            <CardTitle className='text-3xl'>Login Form</CardTitle>
            <CardDescription className='font-thin'>
              Use your username & password to login.
            </CardDescription>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <div className='grid w-full items-center'>
                <div className='flex flex-col gap-y-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                      name='username'
                      id='username'
                      onChange={onInputChange}
                      value={formik.values.username}
                      error={formik.errors.username}
                      placeholder='Enter username'
                      className='h-[50px]'
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      name='password'
                      id='password'
                      onChange={onInputChange}
                      value={formik.values.password}
                      error={formik.errors.password}
                      type='password'
                      placeholder='Enter password'
                      className='h-[50px]'
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex w-full flex-col gap-y-2'>
              <Button
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                type='submit'
                className={clsx(
                  'w-full text-base transition-colors ease-linear duration-200',
                )}
              >
                Login
              </Button>
              <div className='flex items-center w-full gap-x-2 justify-start mt-2'>
                <span className='text-sm text-slate-800'>
                  Don&#39;t have an account?
                </span>
                <Link
                  to={AppConstantRoutes.paths.auth.register}
                  className='text-sm text-slate-800 underline'
                >
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </LayoutWithoutAuth>
  )
}

export default Login

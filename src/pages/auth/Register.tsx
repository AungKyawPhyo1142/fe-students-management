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
import { Link, useNavigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path.ts'
import LayoutWithoutAuth from '@/components/layout/LayoutWithoutAuth.tsx'
import { object, ObjectSchema, string } from 'yup'
import { useFormik } from 'formik'
import { useCustomEvents } from '@/services/formik/hooks'
import { adminRequest } from '@/services/network/lib/auth'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export interface RegisterFormValues {
  name: string
  username: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const initialValues: RegisterFormValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema: ObjectSchema<RegisterFormValues> = object().shape({
    name: string().required('Name is required'),
    username: string()
      .required('Username is required')
      .test(
        'check username length',
        'Username must be between 6 and 20 characters',
        () =>
          6 <= formik.values.username.length &&
          formik.values.username.length <= 20,
      )
      .matches(
        /^[a-z0-9_]+$/,
        'Username must contain only lowercase letters, numbers, and underscores',
      ),
    password: string()
      .required('Password is required')
      .test(
        'check password length',
        'Password must be between 6 and 20 characters',
        () =>
          6 <= formik.values.password.length &&
          formik.values.password.length <= 20,
      )
      .matches(
        /(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: string()
      .required('Confirm Password is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      }),
  })

  const onSubmit = async (values: RegisterFormValues) => {
    const res = await adminRequest.register(values).catch(() => {
      toast({
        title: 'Registration Failed',
        description:
          'An error occurred while registering, please try again later',
        variant: 'destructive',
      })
    })
    if (res && res.status === 'SUCCESS') {
      navigate(AppConstantRoutes.paths.auth.login, { replace: true })
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { onInputChange } = useCustomEvents<RegisterFormValues>(formik)

  return (
    <LayoutWithoutAuth>
      <Toaster />
      <div className='fade-in min-h-screen flex items-center justify-center'>
        <Card className='w-[600px]  p-5'>
          <CardHeader>
            <CardTitle className='text-3xl'>Register Form</CardTitle>
            <CardDescription className='font-thin'>
              Fill out the following form to register. All the fields are
              required.
            </CardDescription>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <div className='grid w-full items-center'>
                <div className='flex flex-col gap-y-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='name'>
                      Name <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      name='name'
                      id='name'
                      onChange={onInputChange}
                      value={formik.values.name}
                      error={formik.errors.name}
                      placeholder='John Doe'
                      className='h-[50px]'
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='username'>
                      Username <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      name='username'
                      id='username'
                      onChange={onInputChange}
                      value={formik.values.username}
                      error={formik.errors.username}
                      placeholder='john_doe'
                      className='h-[50px]'
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>
                      Password <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      name='password'
                      id='password'
                      onChange={onInputChange}
                      value={formik.values.password}
                      error={formik.errors.password}
                      type='password'
                      placeholder='********'
                      className='h-[50px]'
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='confirmPassword'>
                      Confirm Password <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      name='confirmPassword'
                      id='confirmPassword'
                      onChange={onInputChange}
                      value={formik.values.confirmPassword}
                      error={formik.errors.confirmPassword}
                      type='password'
                      placeholder='********'
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
                Register
              </Button>
              <div className='flex items-center w-full gap-x-2 justify-start mt-2'>
                <span className='text-sm text-slate-800'>
                  Already have an account?
                </span>
                <Link
                  to={AppConstantRoutes.paths.auth.login}
                  className='text-sm text-slate-800 underline'
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </LayoutWithoutAuth>
  )
}

export default Register

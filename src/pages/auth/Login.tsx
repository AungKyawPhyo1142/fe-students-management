import { Button } from '@/components/ui/button.tsx'
import { decrement, increment, selectCount, useCountStore } from '@/services/zustand/store.ts'

const Login = () => {
  const count = useCountStore(selectCount)
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-y-10">
      <h1>Login</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <h1 className="text-3xl font-bold">Count: {count}</h1>
      <Button onClick={() => {
        increment()
      }}>
        Increment
      </Button>
      <Button onClick={() => {
        decrement()
      }}>
        Decrement
      </Button>
    </div>
  )
}

export default Login
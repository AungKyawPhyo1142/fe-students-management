import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/services/routes/router.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        {/*  screen loader here*/}
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)

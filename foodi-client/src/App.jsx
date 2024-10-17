import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider.jsx'
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

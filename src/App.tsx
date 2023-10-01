
import './App.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './core/api'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/home'

function App() {

  const Layout = () => {
    return (
      <div>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

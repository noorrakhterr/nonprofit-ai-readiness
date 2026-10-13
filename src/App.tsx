import { createHashRouter, RouterProvider } from 'react-router-dom'
import FormPage from './pages/FormPage'
import IntroPage from './pages/IntroPage'
import ResultsPage from './pages/ResultsPage'

const router = createHashRouter([
  { path: '/', element: <IntroPage /> },
  { path: '/assessment', element: <FormPage /> },
  { path: '/results', element: <ResultsPage /> },
])

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

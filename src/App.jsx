import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from './ProtectedRoute'

import Login from './pages/login/Main'
import Plans from './pages/plans/Main'
import Summary from './pages/Summary'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

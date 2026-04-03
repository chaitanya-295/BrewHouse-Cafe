import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Reserve from "./pages/Reserve"
import About from "./pages/About"
import Services from "./pages/Services"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          
          {/* User Protected Routes */}
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Protected Routes */}
          <Route 
            path="admin" 
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

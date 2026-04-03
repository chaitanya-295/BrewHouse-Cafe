import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { currentUser, isAdmin, loading } = useAuth()
    const location = useLocation()

    if (loading) return null

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute

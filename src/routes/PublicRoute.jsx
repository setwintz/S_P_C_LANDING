import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ isLogin }) => {
    
    return isLogin ? <Navigate to="/dashboard" replace /> : (
        <Outlet />
    )


}

export default PublicRoute
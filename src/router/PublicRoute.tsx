import { Navigate } from "react-router-dom"
import { AuthRouter } from "./AuthRouter"

export const PublicRoute = ({ isAuthenticated }: any) => !isAuthenticated ? <AuthRouter /> : <Navigate to="/" />


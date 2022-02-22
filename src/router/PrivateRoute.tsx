import { Navigate } from "react-router-dom";
import { ChatPages } from "../pages/ChatPages";

export const PrivateRoute = ({ isAuthenticated }: any) => isAuthenticated ? <ChatPages /> : <Navigate to="/auth/login" />;
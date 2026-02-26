import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
    return isAuth ? children : <Navigate to="/login" />;
}
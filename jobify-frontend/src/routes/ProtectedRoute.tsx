import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
    children: ReactElement;
    requiredRole?: string;
}

export default function ProtectedRoute({
    children,
    requiredRole,
}: ProtectedRouteProps) {
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
    const userRole = useAppSelector((state) => state.auth.role);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

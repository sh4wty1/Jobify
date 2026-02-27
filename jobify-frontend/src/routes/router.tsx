import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PostJob from "@/pages/PostJob";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import GlobalError from "@/pages/GlobalError";
import ProtectedRoute from "./ProtectedRoute";
import MyJobs from "@/pages/MyJobs";
import MyApplications from "@/pages/MyApplications";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <GlobalError />, // 🔥 ESSENCIAL
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "post-job",
                element: (
                    <ProtectedRoute requiredRole="COMPANY">
                        <PostJob />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "my-jobs",
                element: (
                    <ProtectedRoute requiredRole="COMPANY">
                        <MyJobs />
                    </ProtectedRoute>
                )
            },
            {
                path: "applications",
                element: (
                    <ProtectedRoute requiredRole="CANDIDATE">
                        <MyApplications />
                    </ProtectedRoute>
                )
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PostJob from "../pages/PostJob";
import Profile from "../pages/Profile";
import JobDetails from "../pages/JobDetails";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/post-job",
                element: (
                    <ProtectedRoute>
                        <PostJob />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/jobs/:id",
                element: (
                    <ProtectedRoute>
                        <JobDetails />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
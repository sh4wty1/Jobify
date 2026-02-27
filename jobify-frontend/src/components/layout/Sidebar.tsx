import { Home, Plus, User, Briefcase, FileText, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authSlice";

export default function Sidebar() {
    const { role } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isCompany = role === "COMPANY";
    const isCandidate = role === "CANDIDATE";

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 hidden md:flex flex-col gap-8">
            <h1 className="text-lg font-semibold tracking-tight text-white">
                Jobify
            </h1>

            <nav className="flex flex-col gap-2 text-sm flex-1">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg transition",
                            isActive
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                        )
                    }
                >
                    <Home size={16} /> Dashboard
                </NavLink>

                {isCompany && (
                    <>
                        <NavLink
                            to="/post-job"
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-lg transition",
                                    isActive
                                        ? "bg-zinc-800 text-white"
                                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                )
                            }
                        >
                            <Plus size={16} /> Post Job
                        </NavLink>

                        <NavLink
                            to="/my-jobs"
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-lg transition",
                                    isActive
                                        ? "bg-zinc-800 text-white"
                                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                )
                            }
                        >
                            <Briefcase size={16} /> My Jobs
                        </NavLink>
                    </>
                )}

                {isCandidate && (
                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg transition",
                                isActive
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            )
                        }
                    >
                        <FileText size={16} /> My Applications
                    </NavLink>
                )}

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg transition",
                            isActive
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                        )
                    }
                >
                    <User size={16} /> Profile
                </NavLink>
            </nav>

            <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
        </aside>
    );
}

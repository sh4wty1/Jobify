import { Home, Plus, User } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 hidden md:flex flex-col gap-6">
            <h1 className="text-lg font-semibold tracking-tight">Jobify</h1>

            <nav className="flex flex-col gap-2 text-sm">
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
        </aside>
    );
}
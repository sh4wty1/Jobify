import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
            <Sidebar />
            <main className="flex-1 px-12 py-10 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

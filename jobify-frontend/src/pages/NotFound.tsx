import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
            <div className="text-center space-y-4">
                <h1 className="text-6xl font-bold">404</h1>
                <p className="text-zinc-400">Page not found</p>
                <Link
                    to="/dashboard"
                    className="text-white underline hover:text-zinc-300"
                >
                    Go back to dashboard
                </Link>
            </div>
        </div>
    );
}
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function GlobalError() {
    const error = useRouteError();

    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data?.message || "Page not found.";
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-red-500">{title}</h1>
                <p className="text-zinc-400">{message}</p>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";

export function DarkModeToggle() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="text-xs text-zinc-400 hover:text-white"
        >
            Toggle Theme
        </button>
    );
}
import { useEffect, useState } from "react";

import { Dialog } from "@/components/ui/dialog";

export function CommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="fixed inset-0 flex items-start justify-center pt-40">
                <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <input
                        placeholder="Search..."
                        className="w-full bg-zinc-800 p-2 rounded"
                    />
                </div>
            </div>
        </Dialog>
    );
}

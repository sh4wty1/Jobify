import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const load = async () => {
            const res = await api.get("/applications/my-applications");
            setApplications(res.data);
        };

        load();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Applications</h2>

            {applications.map((app: any) => (
                <div
                    key={app.id}
                    className="p-4 border border-zinc-800 rounded-lg bg-zinc-900"
                >
                    <p className="font-medium">{app.job.title}</p>
                    <p className="text-sm text-zinc-400">
                        Status: {app.status}
                    </p>
                </div>
            ))}
        </div>
    );
}
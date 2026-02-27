import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    fetchApplicationsByJob,
    updateApplicationStatus,
} from "@/services/applicationService";
import { Button } from "@/components/ui/button";
import { showError, showSuccess } from "@/components/layout/ToastProvider";

interface JobApplication {
    id: number;
    candidateName: string;
    candidateEmail: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function JobApplications() {
    const { id } = useParams();
    const [applications, setApplications] = useState<JobApplication[]>([]);

    const loadApplications = async () => {
        if (!id) return;

        try {
            const data = await fetchApplicationsByJob(Number(id));
            setApplications(data);
        } catch (error) {
            console.error(error);
            showError("Could not load applications.");
        }
    };

    useEffect(() => {
        loadApplications();
    }, [id]);

    const handleUpdate = async (
        applicationId: number,
        status: "APPROVED" | "REJECTED"
    ) => {
        try {
            await updateApplicationStatus(applicationId, status);
            showSuccess(`Application ${status.toLowerCase()} successfully.`);
            await loadApplications();
        } catch (error) {
            console.error(error);
            showError("Could not update application status.");
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Job Applications</h2>

            {!applications.length && (
                <p className="text-zinc-400 text-sm">No applications yet.</p>
            )}

            {applications.map((app) => (
                <div
                    key={app.id}
                    className="p-4 border border-zinc-800 rounded-lg bg-zinc-900 space-y-2"
                >
                    <p className="font-medium">{app.candidateName}</p>
                    <p className="text-sm text-zinc-400">{app.candidateEmail}</p>
                    <p className="text-sm text-zinc-400">Status: {app.status}</p>

                    <div className="flex gap-2 pt-1">
                        <Button
                            className="bg-green-600 hover:bg-green-500 text-white"
                            onClick={() => handleUpdate(app.id, "APPROVED")}
                        >
                            Approve
                        </Button>
                        <Button
                            className="bg-red-600 hover:bg-red-500 text-white"
                            onClick={() => handleUpdate(app.id, "REJECTED")}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

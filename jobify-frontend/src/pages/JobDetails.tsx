import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Job } from "@/features/jobs/jobsTypes";
import { fetchJobById } from "@/services/jobService";
import { applyToJob } from "@/services/applicationService";
import { Button } from "@/components/ui/button";
import { showError, showSuccess } from "@/components/layout/ToastProvider";
import { useAppSelector } from "@/store/hooks";

export default function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const role = useAppSelector((state) => state.auth.role);

    useEffect(() => {
        const load = async () => {
            if (!id) return;

            try {
                const data = await fetchJobById(Number(id));
                setJob(data);
            } catch (error) {
                console.error(error);
                showError("Could not load job details.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    const handleApply = async () => {
        if (!job) return;

        try {
            await applyToJob(job.id);
            showSuccess("Application sent successfully.");
        } catch (error) {
            console.error(error);
            showError("Could not apply to this job.");
        }
    };

    if (loading) {
        return <p className="text-zinc-400">Loading job details...</p>;
    }

    if (!job) {
        return <p className="text-zinc-400">Job not found.</p>;
    }

    return (
        <div className="space-y-4 max-w-2xl">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-zinc-400">Company: {job.companyName}</p>
            <p className="text-zinc-300 whitespace-pre-line">{job.description}</p>

            {role === "CANDIDATE" && (
                <Button onClick={handleApply} className="bg-white text-black hover:bg-zinc-200">
                    Apply now
                </Button>
            )}
        </div>
    );
}

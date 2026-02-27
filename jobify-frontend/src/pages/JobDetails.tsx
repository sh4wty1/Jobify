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
        <div className="space-y-6 max-w-3xl">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-zinc-400">Company: {job.companyName}</p>
            </div>

            <div className="space-y-2 rounded-xl border border-zinc-800 p-5 bg-zinc-900">
                <h3 className="text-zinc-100 font-semibold">Resumo</h3>
                <p className="text-zinc-300 whitespace-pre-line">{job.description}</p>
            </div>

            {!!job.fullDescription && (
                <div className="space-y-2 rounded-xl border border-zinc-800 p-5 bg-zinc-900">
                    <h3 className="text-zinc-100 font-semibold">Descrição completa</h3>
                    <p className="text-zinc-300 whitespace-pre-line">{job.fullDescription}</p>
                </div>
            )}

            {role === "CANDIDATE" && (
                <Button onClick={handleApply} className="bg-white text-black hover:bg-zinc-200">
                    Apply now
                </Button>
            )}
        </div>
    );
}

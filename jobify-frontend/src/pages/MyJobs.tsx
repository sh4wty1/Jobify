import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import JobCard from "@/components/jobs/JobCard";
import type { Job } from "@/features/jobs/jobsTypes";

export default function MyJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await api.get("/jobs/my-jobs");
            setJobs(res.data);
        };

        load();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Jobs</h2>

            {jobs.map((job: any) => (
                <div key={job.id} className="space-y-3">
                    <JobCard job={job} />
                    <Link
                        to={`/my-jobs/${job.id}/applications`}
                        className="inline-block text-sm text-zinc-300 hover:text-white transition"
                    >
                        View applications →
                    </Link>
                </div>
            ))}
        </div>
    );
}

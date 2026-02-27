import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import JobCard from "@/components/jobs/JobCard";

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);

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
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
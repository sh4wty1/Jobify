import { useEffect, useState } from "react";
import { fetchJobs } from "../../services/jobService";
import JobCard from "./JobCard";

interface Job {
    id: number;
    title: string;
    description: string;
    companyName: string;
}

export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await fetchJobs();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs", error);
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-zinc-500 mt-20 text-sm">
                Loading jobs...
            </div>
        );
    }

    if (!jobs.length) {
        return (
            <div className="text-center text-zinc-500 mt-20 text-sm">
                No job postings available yet.
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
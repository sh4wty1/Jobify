import { useAppSelector } from "../../store/hooks";
import JobCard from "./JobCard";

export default function JobList() {
    const jobs = useAppSelector((s) => s.jobs.jobs);

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
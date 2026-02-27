import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import type { Job } from "../../features/jobs/jobsTypes";

export default function JobCard({ job }: { job: Job }) {
    return (
        <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-200">
            <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-medium text-zinc-100">
                            {job.title}
                        </h3>
                        <p className="text-sm text-zinc-400">{job.company}</p>
                    </div>
                </div>

                <p className="text-sm text-zinc-500 line-clamp-2">
                    {job.description}
                </p>

                <div className="flex justify-end">
                    <Link
                        to={`/jobs/${job.id}`}
                        className="text-sm text-zinc-300 hover:text-white transition"
                    >
                        View details →
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
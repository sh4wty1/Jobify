import { motion } from "framer-motion";
import { Job } from "../../features/jobs/jobsTypes";
import { Link } from "react-router-dom";

export function AnimatedJobCard({ job }: { job: Job }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700"
        >
            <h3 className="font-medium">{job.title}</h3>
            <p className="text-sm text-zinc-400">{job.company}</p>
            <Link
                to={`/jobs/${job.id}`}
                className="text-sm text-zinc-300 hover:text-white"
            >
                View →
            </Link>
        </motion.div>
    );
}
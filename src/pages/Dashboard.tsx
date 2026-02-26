import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../features/jobs/jobsSlice";
import { SkeletonCard } from "../components/layout/SkeletonCard";
import { EmptyState } from "../components/layout/EmptyState";
import { AnimatedJobCard } from "../components/layout/AnimatedJobCard";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { jobs, loading } = useAppSelector((s) => s.jobs);

    useEffect(() => {
        dispatch(setLoading(true));
        setTimeout(() => dispatch(setLoading(false)), 800);
    }, [dispatch]);

    if (loading) {
        return (
            <div className="grid md:grid-cols-2 gap-6">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    if (!jobs.length) return <EmptyState />;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
                <AnimatedJobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
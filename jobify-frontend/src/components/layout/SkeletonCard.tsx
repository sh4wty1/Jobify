export function SkeletonCard() {
    return (
        <div className="animate-pulse bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="h-4 bg-zinc-800 rounded w-1/2" />
            <div className="h-3 bg-zinc-800 rounded w-3/4" />
            <div className="h-3 bg-zinc-800 rounded w-2/3" />
        </div>
    );
}
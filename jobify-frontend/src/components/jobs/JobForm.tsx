import { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../../features/jobs/jobsSlice";

export default function JobForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState<"Junior" | "Mid" | "Senior">("Junior");

    const handleSubmit = () => {
        if (!title || !company) return;
        dispatch(addJob({ title, company, description, level }));
        setTitle("");
        setCompany("");
        setDescription("");
    };

    return (
        <div className="space-y-4 bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <input
                className="w-full p-2 bg-slate-900 rounded"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="w-full p-2 bg-slate-900 rounded"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <textarea
                className="w-full p-2 bg-slate-900 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                className="w-full p-2 bg-slate-900 rounded"
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
            >
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
            </select>
            <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
            >
                Publish Job
            </button>
        </div>
    );
}
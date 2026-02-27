import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/services/jobService";
import { showSuccess } from "../components/layout/ToastProvider";
import { addJob } from "../features/jobs/jobsSlice";
import { useAppDispatch } from "../store/hooks";
export default function PostJob() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        try {
            await createJob(title, description);
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-xl bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <Button className="bg-white text-black hover:bg-zinc-200" onClick={handleSubmit}>
                    Publish
                </Button>
            </Card>
        </div>
    );
}
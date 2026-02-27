import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/services/jobService";
import { showError, showSuccess } from "../components/layout/ToastProvider";

export default function PostJob() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            showError("Please fill in title and short description.");
            return;
        }

        try {
            await createJob(title, description, fullDescription);
            showSuccess("Job published successfully.");
            setTitle("");
            setDescription("");
            setFullDescription("");
        } catch (err) {
            console.error(err);
            showError("Could not publish job.");
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-xl bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description (appears on card)"
                />
                <Textarea
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    placeholder="Complete job description (appears on details page)"
                    className="min-h-36"
                />
                <Button className="bg-white text-black hover:bg-zinc-200" onClick={handleSubmit}>
                    Publish
                </Button>
            </Card>
        </div>
    );
}

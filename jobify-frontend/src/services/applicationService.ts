import { api } from "@/lib/api";

export const applyToJob = async (jobId: number) => {
    await api.post("/applications", { jobId });
};
import { api } from "@/lib/api";

export const fetchJobs = async () => {
    const response = await api.get("/jobs");
    return response.data;
};

export const createJob = async (title: string, description: string) => {
    const response = await api.post("/jobs", {
        title,
        description,
    });

    return response.data;
};
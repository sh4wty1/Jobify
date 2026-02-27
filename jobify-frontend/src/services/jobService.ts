import { api } from "@/lib/api";

export const fetchJobs = async () => {
    const response = await api.get("/jobs");
    return response.data;
};

export const createJob = async (
    title: string,
    description: string,
    fullDescription: string
) => {
    const response = await api.post("/jobs", {
        title,
        description,
        fullDescription,
    });

    return response.data;
};

export const fetchJobById = async (jobId: number) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
};

export const deleteJobByAdmin = async (jobId: number) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
};

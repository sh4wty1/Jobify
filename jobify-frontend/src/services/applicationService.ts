import { api } from "@/lib/api";

export const applyToJob = async (jobId: number) => {
    await api.post("/applications", { jobId });
};

export const fetchApplicationsByJob = async (jobId: number) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
};

export const updateApplicationStatus = async (
    applicationId: number,
    status: "APPROVED" | "REJECTED" | "PENDING"
) => {
    await api.put(`/applications/${applicationId}/status`, { status });
};

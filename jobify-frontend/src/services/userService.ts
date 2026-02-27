import { api } from "@/lib/api";
import type { UserProfile } from "@/features/jobs/jobsTypes";

export const fetchMyProfile = async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>("/users/me");
    return response.data;
};

export const updateMyProfile = async (payload: {
    name: string;
    bio: string;
    avatarUrl: string;
}): Promise<UserProfile> => {
    const response = await api.put<UserProfile>("/users/me", payload);
    return response.data;
};

export const uploadMyCv = async (file: File): Promise<UserProfile> => {
    const form = new FormData();
    form.append("file", file);
    const response = await api.postForm<UserProfile>("/users/me/cv", form);
    return response.data;
};

export const downloadMyCv = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/api/users/me/cv", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const blob = await response.blob();
    const disposition = response.headers.get("content-disposition") || "";
    const fileNameMatch = disposition.match(/filename=\"?([^\"]+)\"?/i);
    const fileName = fileNameMatch?.[1] || "cv.pdf";

    return { blob, fileName };
};

export const fetchUsersByAdmin = async (): Promise<UserProfile[]> => {
    const response = await api.get<UserProfile[]>("/users");
    return response.data;
};

export const updateUserByAdmin = async (
    userId: number,
    payload: {
        name: string;
        email: string;
        role: string;
        bio: string;
        avatarUrl: string;
    }
): Promise<UserProfile> => {
    const response = await api.put<UserProfile>(`/users/${userId}`, payload);
    return response.data;
};

export const deleteUserByAdmin = async (userId: number) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};

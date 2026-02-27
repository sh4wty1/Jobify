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

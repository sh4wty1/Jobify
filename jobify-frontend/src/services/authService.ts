import { api } from "@/lib/api";

export const loginRequest = async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};

export const registerRequest = async (
    name: string,
    email: string,
    password: string,
    role: string
) => {
    const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
    });

    return response.data;
};
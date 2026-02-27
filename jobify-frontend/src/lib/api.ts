import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    // NÃO envia token para rotas de auth
    if (token && !config.url?.startsWith("/api/auth")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
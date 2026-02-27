const BASE_URL = "http://localhost:8080/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T = any> {
    data: T;
}

async function request<T = any>(
    method: HttpMethod,
    path: string,
    body?: unknown
): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token && !path.startsWith("/auth")) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
        return { data: undefined as T };
    }

    const data = await response.json();
    return { data };
}

export const api = {
    get: <T = any>(path: string) => request<T>("GET", path),
    post: <T = any>(path: string, body?: unknown) => request<T>("POST", path, body),
    put: <T = any>(path: string, body?: unknown) => request<T>("PUT", path, body),
    delete: <T = any>(path: string) => request<T>("DELETE", path),
};

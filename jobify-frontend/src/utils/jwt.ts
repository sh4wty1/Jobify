import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
    sub: string; // email
    role: string;
    exp: number;
}

export const getUserFromToken = (): DecodedToken | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, registerRequest } from "@/services/authService";
import { getUserFromToken } from "@/utils/jwt";

interface AuthState {
    token: string | null;
    role: string | null;
    email: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const decoded = getUserFromToken();

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    role: decoded?.role || null,
    email: decoded?.sub || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
};

export const login = createAsyncThunk<
    { token: string },
    { email: string; password: string }
>("auth/login", async ({ email, password }) => {
        return await loginRequest(email, password);
    });

export const register = createAsyncThunk<
    { token: string },
    {
        name: string;
        email: string;
        password: string;
        role: string;
    }
>("auth/register", async ({
    name,
    email,
    password,
    role,
}) => {
        return await registerRequest(name, email, password, role);
    });

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.role = null;
            state.email = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const token = action.payload.token;

            localStorage.setItem("token", token);
            const decoded = getUserFromToken();

            state.token = token;
            state.role = decoded?.role || null;
            state.email = decoded?.sub || null;
            state.isAuthenticated = true;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            const token = action.payload.token;

            localStorage.setItem("token", token);
            const decoded = getUserFromToken();

            state.token = token;
            state.role = decoded?.role || null;
            state.email = decoded?.sub || null;
            state.isAuthenticated = true;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

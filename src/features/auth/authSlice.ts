import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    role: "CANDIDATE" | "COMPANY" | null;
}

const savedState = localStorage.getItem("jobify_state");

const initialState: AuthState = savedState
    ? JSON.parse(savedState).auth
    : { isAuthenticated: false, user: null, role: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ user: string; role: "CANDIDATE" | "COMPANY" }>
        ) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

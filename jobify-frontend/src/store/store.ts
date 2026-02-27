import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem("jobify_state", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

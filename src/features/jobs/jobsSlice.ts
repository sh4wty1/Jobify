import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
}

interface JobsState {
    jobs: Job[];
    loading: boolean;
}

const saved = localStorage.getItem("jobify_state");

const initialState: JobsState = saved
    ? JSON.parse(saved).jobs
    : { jobs: [], loading: false };

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<Omit<Job, "id">>) => {
            state.jobs.push({ id: uuid(), ...action.payload });
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { addJob, setLoading } = jobsSlice.actions;
export default jobsSlice.reducer;
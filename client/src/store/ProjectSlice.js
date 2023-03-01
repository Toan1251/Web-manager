import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

//status: idle, loading

const initialState = {
    status: 'idle',
    projects : [],
    project: {},
}

export const loadProjects = createAsyncThunk(
    'project/loadProjects',
    async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/project`);
            const data = await res.data;
            return data.projects
        }catch(e){
            console.log(e);
        }
    }
);

export const importProject = createAsyncThunk(
    'project/importProject',
    // arg = {url, domain, module, ignore}
    async (arg, thunkAPI) => {
        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/project`, arg);
            const data = await res.data;
            return data
        }catch(e){
            console.log(e);
        }
    }
)

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            return {
                ...state,
                status: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProjects.pending, (state) => {
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(loadProjects.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'idle',
                    projects: action.payload
                }
            })
            .addCase(importProject.pending, (state) => {
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(importProject.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'fulfilled',
                    project: action.payload
                }
            })
    }
})

export const selectProjects = state => state.project.projects
export const selectOneProject = state => state.project.project
export const selectProjectStatus = state => state.project.status
export const {changeStatus} = projectSlice.actions
export const projectReducer = projectSlice.reducer
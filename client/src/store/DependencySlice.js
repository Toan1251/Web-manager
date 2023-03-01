import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    dependenciesList: [],
    path: '',
    subDependencies: {}
}

export const selectDependenciesStatus = state => state.dependencies.status;
export const selectDependenciesList = state => state.dependencies.dependenciesList;
export const selectPath = state => state.dependencies.path;
export const selectSubDependenciesList = state => state.dependencies.subDependenciesList;

export const loadDependencies = createAsyncThunk(
    'dependencies/loadDependencies',
    async (id) => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/project/${id}`);
            const data = await res.data;
            return data;
        }catch(e){
            console.log(e);
        }
    }
);

export const loadSubDependencies = createAsyncThunk(
    'dependencies/loadSubDependencies',
    async({name, version}) => {
        console.log('dispatch loading sub dependencies');
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/dependency?d=${name}&v=${version}`);
            const data = await res.data;
            return data;
        }catch(e){
            console.log(e);
        }
    }
)

const dependenciesSlice = createSlice({
    name: 'dependencies',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loadDependencies.pending, (state) => {
                return {
                    ...state,
                    status: 'loading',
                }
            })
            .addCase(loadDependencies.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'fulfilled',
                    dependenciesList: [...action.payload.dependencies, ...action.payload.devDependencies],
                    path: action.payload.root_url
                }
            })
            .addCase(loadSubDependencies.pending, (state) => {
                return {
                    ...state,
                    status: 'loading',
                }
            })
            .addCase(loadSubDependencies.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'fulfilled',
                    subDependencies: action.payload
                }
            })
    }
})

export const dependenciesReducer = dependenciesSlice.reducer;
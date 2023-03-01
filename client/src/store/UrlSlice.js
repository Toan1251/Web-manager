import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    data: {
        data: {
            _id: '',
            url: '',
            scripts: [],
            stylesheets: [],
            images: [],
            hyperlinks: [],
        }
    }
}

export const selectUrlStatus = state => state.url.status;
export const selectUrlData = state => state.url.data;

export const crawlDataFromUrl = createAsyncThunk(
    'url/crawlData',
    async (site) => {
        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/url`, {url: site})
            const data = await res.data;
            return data
        }catch(e){
            console.log(e);
        }
    }
)

export const getDataById = createAsyncThunk(
    'url/getDataById',
    async(id) => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/url/${id}`)
            const data = await res.data;
            return data;
        }catch(e){
            console.log(e);
        }
    }
)

const urlSlice = createSlice({
    name: 'url',
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
            .addCase(crawlDataFromUrl.pending, (state) => {
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(crawlDataFromUrl.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'fulfilled',
                    data: action.payload
                }
            })
            .addCase(getDataById.pending, (state) => {
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(getDataById.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'fulfilled',
                    data: action.payload
                }
            })
    }
})

export const urlReducer = urlSlice.reducer;
export const {changeStatus} = urlSlice.actions;
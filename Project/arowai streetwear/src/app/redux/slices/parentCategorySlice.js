import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchParentCategories = createAsyncThunk(
    'parentCategory/fetchParentCategories',
    async (_, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:4400/api/website/parent-category/read-categories');
            return response.data.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const parentCategorySlice = createSlice({
    name: 'parentCategory',
    initialState: {
        value: []
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder
        .addCase(fetchParentCategories.fulfilled,(state,action)=>{
            state.value = action.payload;
        })
        .addCase(fetchParentCategories.rejected,(state,action)=>{
            console.log('error fetch parent category',action.payload);
        })
    }
});

export default parentCategorySlice.reducer;
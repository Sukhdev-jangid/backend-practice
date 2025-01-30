import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductByParent = createAsyncThunk(
    "products/fetchProductByParent",
    async(id,thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4400/api/website/products/read-products-by-parent/${id}`);
            return response.data
        }
        catch(error){
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const productSlice = createSlice({
    name:'products',
    initialState:{
        value:{},

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProductByParent.fulfilled,(state,action)=>{
            state.value = action.payload;
        })
    }

});

export default productSlice.reducer;
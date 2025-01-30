import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:4400/api/website/cart/add-cart`, data);
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const readCart = createAsyncThunk(
    "cart/readCart",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:4400/api/website/cart/read-cart/${id}`);
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        filepath: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readCart.fulfilled, (state, action) => {
            state.items = action.payload.data;
            state.filepath = action.payload.filepath;
        })
    }
});

export default cartSlice.reducer;
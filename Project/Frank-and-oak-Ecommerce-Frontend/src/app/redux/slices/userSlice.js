import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const genrateOtp = createAsyncThunk(
    "user/genrateOtp",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`http://localhost:4400/api/website/user/genrate-otp`, data);
            console.log(response.data)
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            loggedIn: false
        }
    },
    reducers: {
        setLogOut: (state, action) => {
            state.value = { loggedIn: false }
        },
        setLogin: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: () => { }
});

export const { setLogOut, setLogin } = userSlice.actions;

export default userSlice.reducer;
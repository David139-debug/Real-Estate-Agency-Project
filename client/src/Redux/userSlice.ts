import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";

interface User {
    _id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    role: string
};

interface UserState {
    user: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    triggerUser: boolean
};

const initialState: UserState = {
    user: null,
    status: "idle",
    triggerUser: false
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
    try {
        const response = await api.get<User>("http://localhost:10000/getUser", { withCredentials: true });
        return response.data;
    } catch (err: unknown) {
        return thunkAPI.rejectWithValue("Failed to fetch user");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = "failed";
                state.user = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
                state.status = "succeeded";
                state.user = action.payload || null;
            })
    }
});

export default userSlice.reducer;
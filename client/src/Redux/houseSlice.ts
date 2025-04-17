import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

interface House {
    img: string;
    name: string;
    type: string;
    location: string;
    region: string;
    price: number;
    bedroom: number;
    bathroom: number;
    area: number;
    offer: "Sale" | "Rent";
    agent: string;
}

interface HouseState {
    houses: House[];
    loading: boolean;
    error: string | null;
}

const initialState: HouseState = {
    houses: [],
    loading: false,
    error: null
};

export const fetchHouses = createAsyncThunk("houses/fetchHouses", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get<House[]>(`${BACKEND_URI}/getProperty`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch houses");
    }
})

const houseSlice = createSlice({
    name: "houses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchHouses.fulfilled, (state, action: PayloadAction<House[]>) => {
                state.houses = action.payload;
                state.loading = false;
            })
            .addCase(fetchHouses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default houseSlice.reducer;
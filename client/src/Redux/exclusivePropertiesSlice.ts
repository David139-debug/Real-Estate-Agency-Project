import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

interface House {
    _id: string;
    src: string;
    title: string;
    price: string;
    area: string;
    img: string;
    name: string;
}

interface ExclusivePropertiesState {
    houses: House[];
    index: number;
    animation: string;
}

const initialState: ExclusivePropertiesState = {
    houses: [],
    index: 0,
    animation: "",
};

export const fetchProperties = createAsyncThunk("getProperties/fetchProperties", async () => {
    const response = await api.get<House[]>("/getProperty");
    return response.data;
})

const exclusivePropertiesSlice = createSlice({
    name: "exclusiveProperties",
    initialState,
    reducers: {
        prevHouse: (state) => {
            if (state.index > 0) state.index -= 1;
        },
        nextHouse: (state) => {
            if (state.index < state.houses.length - 1) state.index += 1;
        },
        setAnimation: (state, action) => {
            state.animation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProperties.fulfilled, (state, action) => {
            state.houses = action.payload;
        })
    }
});

export const { prevHouse, nextHouse, setAnimation } = exclusivePropertiesSlice.actions;
export default exclusivePropertiesSlice.reducer;
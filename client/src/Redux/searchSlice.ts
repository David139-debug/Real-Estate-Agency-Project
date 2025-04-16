import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchData {
    house?: boolean;
    aparment?: boolean;
    land?: boolean;
    commercial?: boolean;

    minPrice?: string;
    maxPrice?: string;
    size?: string;

    sale?: boolean;
    rent?: boolean;

    location?: string;
    region?: string;

    agent?: string;
}

interface SearchState {
    searchData: SearchData
}

const initialState: SearchState = {
    searchData: {}
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchData: (state, action: PayloadAction<SearchData>) => {
            state.searchData = action.payload
        },
        resetSearchData: () => initialState
    }
});

export const { setSearchData, resetSearchData } = searchSlice.actions;
export default searchSlice.reducer
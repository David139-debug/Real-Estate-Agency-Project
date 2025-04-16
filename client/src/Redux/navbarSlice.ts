import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
    hide: boolean;
    prevScrollY: number;
};

const initialState: NavbarState = {
    hide: false,
    prevScrollY: 0,
};

const NavbarSlice = createSlice({
    name: "navbarSlice",
    initialState,
    reducers: {
        setHide(state, action: PayloadAction<boolean>) {
            state.hide = action.payload;
        },
        setPrevScrollY(state, action: PayloadAction<number>) {
            state.prevScrollY = action.payload;
        },
    }
});

export const { setHide, setPrevScrollY } = NavbarSlice.actions;
export default NavbarSlice.reducer;
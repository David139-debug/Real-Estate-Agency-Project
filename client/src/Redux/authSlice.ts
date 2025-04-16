import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
};

const initialState: FormData = {
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ name: keyof FormData; value: string, minLength?: number }>) => {
            state[action.payload.name] = action.payload.value
        },
        resetForm: () => initialState,
    }
});

export const { updateField, resetForm } = authSlice.actions;
export default authSlice.reducer;
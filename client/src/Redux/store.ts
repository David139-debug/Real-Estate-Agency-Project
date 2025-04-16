import { configureStore } from "@reduxjs/toolkit";
import exclusivePropertiesReducer from "./exclusivePropertiesSlice";
import navbarReducer from "./navbarSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import houseReducer from "./houseSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
    reducer: {
        exclusiveProperties: exclusivePropertiesReducer,
        navbar: navbarReducer,
        auth: authReducer,
        user: userReducer,
        house: houseReducer,
        search: searchReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
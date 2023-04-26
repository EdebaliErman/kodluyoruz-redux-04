import { configureStore } from "@reduxjs/toolkit";
import { characterSlice } from "./chaacterSlice";

export const store = configureStore({
    reducer: {
        characters: characterSlice.reducer
    }
})
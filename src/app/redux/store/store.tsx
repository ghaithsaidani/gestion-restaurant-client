import { configureStore } from "@reduxjs/toolkit";
import {themeSlice} from "../features/theme.slice";
import {toastSlice} from "../features/toast.slice";
export default configureStore({
    reducer: {
        theme:themeSlice.reducer,
        toast: toastSlice.reducer
    },
})
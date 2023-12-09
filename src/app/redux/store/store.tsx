import { configureStore } from "@reduxjs/toolkit";
import {themeSlice} from "../features/theme.slice";
export default configureStore({
    reducer: {
        theme:themeSlice.reducer
    },
})
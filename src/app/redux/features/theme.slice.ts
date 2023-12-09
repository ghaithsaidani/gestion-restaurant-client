import {createSlice} from "@reduxjs/toolkit";

export const themeSlice=createSlice({
    name:"theme",
    initialState:{
        value:'light',
    },
    reducers:{
        changeTheme:(state) => {
            state.value = ( state.value === 'light' ? 'dark' : 'light' )
        }
    }
})

export const {changeTheme} = themeSlice.actions

export const themeValue = (state: { theme: { value: string; }; }) => state.theme.value

export default themeSlice.reducer
import {createSlice} from "@reduxjs/toolkit";
import {ToastModel} from "../../public/shared/toast.model";

const initialValue: ToastModel = {
    exist: false,
    message: "",
    toastOptions:{
        type: "info",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
}
export const toastSlice=createSlice({
    name:"toast",
    initialState:{
        value:initialValue,
    },
    reducers:{
        reinitializeToast : (state)=>{
            state.value=initialValue
        },
        changeToast:(state,action) => {
            state.value.exist= action.payload.exist ? action.payload.exist : initialValue.exist
            state.value.message= action.payload.message ? action.payload.message : initialValue.message
            state.value.toastOptions.type= action.payload.type ? action.payload.type : initialValue.toastOptions.type
            state.value.toastOptions.position= action.payload.position ? action.payload.position : initialValue.toastOptions.position
            state.value.toastOptions.autoClose= action.payload.autoClose ? action.payload.autoClose : initialValue.toastOptions.autoClose
            state.value.toastOptions.hideProgressBar= action.payload.hideProgressBar ? action.payload.hideProgressBar : initialValue.toastOptions.hideProgressBar
            state.value.toastOptions.closeOnClick= action.payload.closeOnClick ? action.payload.closeOnClick : initialValue.toastOptions.closeOnClick
            state.value.toastOptions.pauseOnHover= action.payload.pauseOnHover ? action.payload.pauseOnHover : initialValue.toastOptions.pauseOnHover
            state.value.toastOptions.draggable= action.payload.draggable ? action.payload.draggable : initialValue.toastOptions.draggable
            state.value.toastOptions.progress= action.payload.progress ? action.payload.progress : initialValue.toastOptions.progress
            state.value.toastOptions.theme= action.payload.theme ? action.payload.theme : initialValue.toastOptions.theme
        }
    }
})

export const {changeToast,reinitializeToast} = toastSlice.actions

export const toastValue = (state: { toast: { value: ToastModel; }; }) => state.toast.value

export default toastSlice.reducer
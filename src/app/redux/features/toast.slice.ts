import {createSlice} from "@reduxjs/toolkit";
import {Toast} from "react-toastify/dist/types";
import {ToastModel} from "../../shared/toast.model";

const initialValue: ToastModel = {
    exist: false,
    message: "",
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
export const toastSlice=createSlice({
    name:"toast",
    initialState:{
        value:initialValue,
    },
    reducers:{
        changeToast:(state,action) => {
            console.log("action.payload",action.payload)
            state.value.exist= action.payload.exist ? action.payload.exist : false
            state.value.message= action.payload.message ? action.payload.message : ""
            state.value.type= action.payload.type ? action.payload.type : "info"
            state.value.position= action.payload.position ? action.payload.position : "top-right"
            state.value.autoClose= action.payload.autoClose ? action.payload.autoClose : 5000
            state.value.hideProgressBar= action.payload.hideProgressBar ? action.payload.hideProgressBar : false
            state.value.closeOnClick= action.payload.closeOnClick ? action.payload.closeOnClick : true
            state.value.pauseOnHover= action.payload.pauseOnHover ? action.payload.pauseOnHover : true
            state.value.draggable= action.payload.draggable ? action.payload.draggable : true
            state.value.progress= action.payload.progress ? action.payload.progress : undefined
            state.value.theme= action.payload.theme ? action.payload.theme : "light"
        }
    }
})

export const {changeToast} = toastSlice.actions

export const toastValue = (state: { toast: { value: ToastModel; }; }) => state.toast.value

export default toastSlice.reducer
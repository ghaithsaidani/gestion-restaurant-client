import {toast} from "react-toastify";
import {ToastModel} from "../shared/toast.model";

export const ToastifyHelper = {
    initializeToastify: (myToast:ToastModel) => {
        if(myToast.exist){
            toast(myToast.message, {
                type: myToast.toastOptions.type,
                position: myToast.toastOptions.position,
                autoClose: myToast.toastOptions.autoClose,
                hideProgressBar: myToast.toastOptions.hideProgressBar,
                closeOnClick: myToast.toastOptions.closeOnClick,
                pauseOnHover: myToast.toastOptions.pauseOnHover,
                draggable: myToast.toastOptions.draggable,
                progress: myToast.toastOptions.progress,
                theme: myToast.toastOptions.theme,
            })
        }
    }

}
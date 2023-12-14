export interface ToastModel{
    exist?: boolean,
    message?: string,
    type: string,
    position: string,
    autoClose: number,
    hideProgressBar: boolean,
    closeOnClick: boolean,
    pauseOnHover: boolean,
    draggable: boolean,
    progress?: number,
    theme: string,
}
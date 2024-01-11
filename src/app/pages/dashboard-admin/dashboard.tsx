import './dashboard.modules.scss'
import {Box, Typography} from "@mui/material";
import {ToastModel} from "../../public/shared/toast.model";
import {useDispatch, useSelector} from "react-redux";
import {reinitializeToast, toastValue} from "../../redux/features/toast.slice";
import {useEffect} from "react";
import {ToastifyHelper} from "../../public/helpers/toastifyHelper";
import {ToastContainer} from "react-toastify";


export const Dashboard = () => {
    const myToast:ToastModel = useSelector(toastValue)
    const dispatch =useDispatch()
    useEffect(() => {
        ToastifyHelper.initializeToastify(myToast)
        dispatch(reinitializeToast())
    },[myToast])

    return (
        <Box>
            <Typography variant={"body1"}>dashboard</Typography>
            <ToastContainer/>
        </Box>

    )
}
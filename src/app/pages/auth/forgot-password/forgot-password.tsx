import './forgot-password.modules.scss';
import { useState} from "react";

import {AlertTitle, Box, Typography} from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {LoginImage} from "../../../../assets/images";
import * as yup from "yup";
import {useFormik} from "formik";
import {InputFieldModel} from "../../../shared/input-field.model";
import {InputField} from "../../../components";
import {LoadingButton} from "@mui/lab";
import {Link, Navigate} from "react-router-dom";
import AuthService from "../../../services/auth.service";
import {useMutation} from '@tanstack/react-query';
import { ResetPasswordModel } from 'src/app/shared/resetPassword-form.models';
const ForgotPassword = () => {
   
    const [showForm,setShowForm] = useState(true)
    const [showSuccessSend,setShowSuccessSend] = useState(false)
    const mutation = useMutation({
        mutationFn: (data: ResetPasswordModel) =>
            AuthService.ResetPassword(data.email).then((response) => {
                console.log(response)
                
            }).then(()=>{
                setShowForm(false);
                setShowSuccessSend(true)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data.message)
                    setFieldError("email", error.response.data.message)
                }
            })

    })
    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("invalid email")
            .required("you need to enter your email")
    })
    const {values, handleSubmit, handleChange, setFieldError, errors, touched} = useFormik({
        initialValues: {
            email: ''
        },
        validateOnChange: true,
        validateOnBlur: false,
        validationSchema: validationSchema,
        onSubmit: (values: ResetPasswordModel) => {
            mutation.mutate(values)
        }
    });

    const inputs: InputFieldModel[] = [
        {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "abc@abc.com",
            value: values.email,
            handleChange: handleChange,
            error: {
                condition: touched.email && Boolean(errors.email),
                messageCondition: touched.email && errors.email,
                message: errors.email
            }
        }
    ]

    if(AuthService.isAuth()){
        return <Navigate to={"/dashboard"} replace={true}/>
     }
    return (
        <Box display={"flex"} height={"100vh"} className={"login-box"}>
            <Stack className={"login-form"} justifyContent={"center"} alignItems={"center"}>

                {showForm && <form noValidate onSubmit={handleSubmit}>
                    <div className={"headline"}>
                        <Typography variant={"h2"}>Forget Password</Typography>
                        <Typography variant={"body1"}>Please enter email to reset your password</Typography>
                    </div>
                    {inputs.map((input) => (
                        <InputField key={input.id} {...input}/>
                    ))}
                    <LoadingButton className={"sign-in-button"} type={"submit"} variant={"contained"} loading={mutation.isPending}>Submit</LoadingButton>
                    <Typography variant={"body1"} className={"create-account"}>Need an account? <Link to={"/auth/register"}>Create one</Link></Typography>
                </form>}
                {showSuccessSend &&  <Stack sx={{ width: '100%' }} spacing={2} justifyContent={"center"} alignItems={"center"}>
                <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        The reset link is in your email - <strong>check it out!</strong>
                </Alert>
                    </Stack>}
            </Stack>
            <Box className={"right-box"}>
                <img src={LoginImage} alt={"Login"}/>
            </Box>
        </Box>
    );

};

export default ForgotPassword;
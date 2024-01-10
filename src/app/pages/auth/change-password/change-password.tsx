import './change-password.scss'
import { useState} from "react";
import {Box,Stack, Typography} from "@mui/material";
import {LoginImage} from "../../../../assets/images";
import * as yup from "yup";
import {useFormik} from "formik";
import {InputFieldModel} from "../../../shared/input-field.model";
import {InputField} from "../../../components";
import {LoadingButton} from "@mui/lab";
import {Link, Navigate, useNavigate} from "react-router-dom";
import AuthService from "../../../services/auth.service";
import {useMutation} from '@tanstack/react-query';
import { ChangePasswordFormModel } from 'src/app/shared/changePassword-form.models';

const ChangePassword = () => {
    const navigate = useNavigate();
    const mutation = useMutation({

      
        mutationFn: (data: ChangePasswordFormModel) =>

            AuthService.ChangePassword(data.password).then((response) => {
                console.log("password changed ")
                navigate("auth/login")
            }).catch((error) => {
                if (error.response) {
                    setFieldError("password", error.response.data.message)
                }
            })
       

    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const validationSchema = yup.object().shape({
        password: yup.string()
            .required("you need to enter your password"),
            confirm_password: yup.string().required("your need to enter the same password again").oneOf([yup.ref("password")],"Password doesn't match")
    })
    const {values,handleSubmit, handleChange,setFieldError,  errors, touched} = useFormik({
        initialValues: {
            password: '',
            confirm_password:''
        },
        validateOnChange: true,
        validateOnBlur: false,
        validationSchema: validationSchema,
        onSubmit: (values: ChangePasswordFormModel) => {
            mutation.mutate(values)
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(show => !show)
    }
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(show => !show)
    }

    const inputs: InputFieldModel[] = [
        {
            id: "password",
            label: "Mot de Passe",
            type: showPassword ? "text" : "password",
            placeholder: "*******",
            value: values.password,
            handleChange: handleChange,
            handleShowPassword: handleClickShowPassword,
            showPassword: showPassword,
            error: {
                condition: touched.password && Boolean(errors.password),
                messageCondition: touched.password && errors.password,
                message: errors.password
            }
        },
        {
            id: "confirm_password",
            label: "Confirmer Mot de Passe",
            type: showConfirmPassword ? "text" : "password",
            placeholder: "*******",
            value: values.confirm_password,
            handleChange: handleChange,
            handleShowPassword: handleClickShowConfirmPassword,
            showPassword: showConfirmPassword,
            error: {
                condition: touched.confirm_password && Boolean(errors.confirm_password),
                messageCondition: touched.confirm_password && errors.confirm_password,
                message: errors.confirm_password
            }
        }

    ]

    if(AuthService.isAuth()){
        return <Navigate to={"/dashboard"} replace={true}/>
     }
    return (
        <Box display={"flex"} height={"100vh"} className={"login-box"}>
            <Stack className={"login-form"} justifyContent={"center"} alignItems={"center"}>

                <form noValidate onSubmit={handleSubmit}>
                    <div className={"headline"}>
                        <Typography variant={"h2"}>Change Password</Typography>
                        <Typography variant={"body1"}>Please Enter the new password !.</Typography>
                    </div>
                    {inputs.map((input) => (
                        <InputField key={input.id} {...input}/>
                    ))}
                   
                    <LoadingButton className={"sign-in-button"} type={"submit"} variant={"contained"} loading={mutation.isPending}>Submit</LoadingButton>
                    <Typography variant={"body1"} className={"create-account"}>Need an account? <Link to={"/auth/register"}>Create one</Link></Typography>
                </form>
            </Stack>
            <Box className={"right-box"}>
                <img src={LoginImage} alt={"Login"}/>
            </Box>
        </Box>
    );
}

export default ChangePassword
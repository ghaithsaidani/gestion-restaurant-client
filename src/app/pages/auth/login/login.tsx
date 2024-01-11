import './Login.modules.scss'
import {useCallback, useEffect, useState} from "react";


import {Box, FormControlLabel, Stack, Typography} from "@mui/material";
import {AuthImage} from "../../../../assets/images";
import * as yup from "yup";
import {LoginFormModel} from "../../../public/shared/login-form.model";
import {useFormik} from "formik";
import {InputFieldModel} from "../../../public/shared/input-field.model";
import {InputField} from "../../../public/components";
import {LoadingButton} from "@mui/lab";
import {Link, useNavigate} from "react-router-dom";
import {BpCheckbox} from "../../../public/components/checkbox/Bpcheckbox";
import {changeTheme} from "../../../redux/features/theme.slice";
import AuthService from "../../../services/auth.service";
import TokenStorageService from "../../../services/token-storage.service";
import {useMutation} from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import {changeToast, reinitializeToast, toastValue} from "../../../redux/features/toast.slice";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {ToastModel} from "../../../public/shared/toast.model";
import {ToastifyHelper} from "../../../public/helpers/toastifyHelper";
import {ToastContainer} from "react-toastify";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myToast:ToastModel = useSelector(toastValue)

    useEffect(() => {
        ToastifyHelper.initializeToastify(myToast)
        dispatch(reinitializeToast())
    }, [dispatch,myToast]);

    //const [rememberMe, setRememberMe] = useState(false);
    const mutation = useMutation({
        mutationFn: (data: LoginFormModel) =>
            AuthService.Login(data.email, data.password).then((response) => {
                TokenStorageService.saveToken(response.data.jwt);
                dispatch(changeToast({
                    exist: true,
                    type: "success",
                    message: "Login Success"}))
                navigate("/dashboard")
            }).catch((error) => {
                setFieldError("password", "Invalid email or password")
            })
    })


    const [showPassword, setShowPassword] = useState(false);
    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("invalid email")
            .required("you need to enter your email"),
        password: yup.string()
            .required("you need to enter your password")
    })
    const {values, handleSubmit, handleChange, setFieldError, errors, touched} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: true,
        validateOnBlur: false,
        validationSchema: validationSchema,
        onSubmit: (values: LoginFormModel) => {
            mutation.mutate(values)
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(show => !show)
    }

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
        },
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
        }
    ]
    return (
        <Box display={"flex"} height={"100vh"} className={"login-box"}>
            <Stack className={"login-form"} justifyContent={"center"} alignItems={"center"}>
                <form noValidate onSubmit={handleSubmit}>
                    <div className={"headline"}>
                        <Typography variant={"h2"}>Sign In</Typography>
                        <Typography variant={"body1"}>Please login to continue to your account.</Typography>
                    </div>
                    {inputs.map((input) => (
                        <InputField key={input.id} {...input}/>
                    ))}
                    <div className={"add-ons"}>
                        <FormControlLabel control={<BpCheckbox onClick={useCallback(
                            () => {
                                dispatch(changeTheme())
                            },
                            [dispatch],
                        )}/>} label={"Keep me logged in"}/>

                        <Link to={"/auth/forgot-password"}>Forgot Password?</Link>
                    </div>
                    <LoadingButton className={"sign-in-button"} type={"submit"} variant={"contained"}
                                   loading={mutation.isPending}>Sign In</LoadingButton>
                    <Typography variant={"body1"} className={"create-account"}>Need an account? <Link
                        to={"/auth/register"}>Create one</Link></Typography>
                </form>
            </Stack>

            <Box className={"right-box"}>
                <img src={AuthImage} alt={"Login"}/>
            </Box>
            <ToastContainer/>
        </Box>

    );
};

export default Login;



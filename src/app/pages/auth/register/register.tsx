import './register.modules.scss'
import {
    HorizontalLinearStepper,
    StepProps
} from "../../../public/components/horizontal-linear-stepper/horizontal-linear-stepper";
import React, {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import { Navigate } from 'react-router-dom';
import {Box, Stack, Typography} from "@mui/material";
import {AuthImage} from "../../../../assets/images";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import AuthService from "../../../services/auth.service";
import {User} from "../../../public/shared/user.model";
import {useDispatch} from "react-redux";
import {changeToast} from "../../../redux/features/toast.slice";


const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: (data: User) =>
            AuthService.Register(data).then((response) => {
                const toast = {exist: true, message: "your account is created successfully", type: "success"}
                dispatch(changeToast(toast))
                navigate("/auth/login")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data.message)
                }
            })
    })
    const step1 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        validateOnChange: true,
        validateOnBlur: false,
        validateOnMount: true,
        validationSchema: yup.object().shape({
            firstName: yup.string()
                .required("vous pouvez entrer votre nom"),
            lastName: yup.string()
                .required("vous pouvez entrer votre prénom")
        }),
        onSubmit: () => {
            //createdUser.Nom=step1.values.firstName
            //createdUser.Prenom=step1.values.lastName
        }
    });

    const step2 = useFormik({
        initialValues: {
            email: '',
            address: '',
            phone: '',
        },
        validateOnChange: true,
        validateOnBlur: false,
        validateOnMount: true,
        validationSchema: yup.object().shape({
            email: yup.string()
                .email("email incorrecte")
                .required("you need to enter your email"),
            address: yup.string()
                .required("vous puvez entrer votre adresse"),
            phone: yup.string()
                .required("vous puvez entrer votre numero de telephone")
        }),
        onSubmit: () => {
            //createdUser.Email=step2.values.email
            //createdUser.Adresse=step2.values.address
            //createdUser.Telephone=step2.values.phone
        }
    });

    const step3 = useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
        },
        validateOnChange: true,
        validateOnBlur: false,
        validateOnMount: true,
        validationSchema: yup.object().shape({
            password: yup.string()
                .required("vous pouvez entrer votre mot de passe"),
            confirm_password: yup.string()
                .required("vous pouvez confirmer votre mot de passe").oneOf([yup.ref("password")],"Password doesn't match")
        }),

        onSubmit: () => {
            const createdUser:User={
                nom:step1.values.firstName,
                prenom:step1.values.lastName,
                email:step2.values.email,
                adresse:step2.values.address,
                telephone:step2.values.phone,
                password:step3.values.password
            }
            mutation.mutate(createdUser)
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(show => !show)
    }
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(show => !show)
    }
    const steps: StepProps[] = [
        {
            label: 'Informations personnelles',
            inputs: [
                {
                    id: "firstName",
                    label: "Nom",
                    type: "text",
                    placeholder: "abc",
                    value: step1.values.firstName,
                    handleChange: step1.handleChange,
                    error: {
                        condition: step1.touched.firstName && Boolean(step1.errors.firstName),
                        messageCondition: step1.touched.firstName && step1.errors.firstName,
                        message: step1.errors.firstName
                    }
                },
                {
                    id: "lastName",
                    label: "Prénom",
                    type: "text",
                    placeholder: "abc",
                    value: step1.values.lastName,
                    handleChange: step1.handleChange,
                    error: {
                        condition: step1.touched.lastName && Boolean(step1.errors.lastName),
                        messageCondition: step1.touched.lastName && step1.errors.lastName,
                        message: step1.errors.lastName
                    }
                },

            ],
            handleSubmit: step1.handleSubmit,
            completed: step1.isValid
        },
        {
            label: 'Informations de contact',
            inputs: [
                {
                    id: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "abc@abc.com",
                    value: step2.values.email,
                    handleChange: step2.handleChange,
                    error: {
                        condition: step2.touched.email && Boolean(step2.errors.email),
                        messageCondition: step2.touched.email && step2.errors.email,
                        message: step2.errors.email
                    }
                },
                {
                    id: "address",
                    label: "Adresse",
                    type: "text",
                    placeholder: "abc, abc",
                    value: step2.values.address,
                    handleChange: step2.handleChange,
                    error: {
                        condition: step2.touched.address && Boolean(step2.errors.address),
                        messageCondition: step2.touched.address && step2.errors.address,
                        message: step2.errors.address
                    }
                },
                {
                    id: "phone",
                    label: "Numéro de telephone",
                    type: "text",
                    placeholder: "00 000 000",
                    value: step2.values.phone,
                    handleChange: step2.handleChange,
                    error: {
                        condition: step2.touched.phone && Boolean(step2.errors.phone),
                        messageCondition: step2.touched.phone && step2.errors.phone,
                        message: step2.errors.phone
                    }
                }
            ],
            handleSubmit: step2.handleSubmit,
            completed: step2.isValid
        },
        {
            label: "Securité",
            inputs: [
                {
                    id: "password",
                    label: "Mot de Passe",
                    type: showPassword ? "text" : "password",
                    placeholder: "*******",
                    value: step3.values.password,
                    handleChange: step3.handleChange,
                    handleShowPassword: handleClickShowPassword,
                    showPassword: showPassword,
                    error: {
                        condition: step3.touched.password && Boolean(step3.errors.password),
                        messageCondition: step3.touched.password && step3.errors.password,
                        message: step3.errors.password
                    }
                },
                {
                    id: "confirm_password",
                    label: "Confirmer Mot de Passe",
                    type: showConfirmPassword ? "text" : "password",
                    placeholder: "*******",
                    value: step3.values.confirm_password,
                    handleChange: step3.handleChange,
                    handleShowPassword: handleClickShowConfirmPassword,
                    showPassword: showConfirmPassword,
                    error: {
                        condition: step3.touched.confirm_password && Boolean(step3.errors.confirm_password),
                        messageCondition: step3.touched.confirm_password && step3.errors.confirm_password,
                        message: step3.errors.confirm_password
                    }
                }
            ],
            handleSubmit: step3.handleSubmit,
            completed: step3.isValid
        }
    ]
    //console.log(isValid)
    return (
        <Box display={"flex"} height={"100vh"} className={"register-box"}>
            <Box className={"left-box"}>
                <img src={AuthImage} alt={"auth"}/>
            </Box>
            <Stack className={"right-box"} justifyContent={"center"} alignItems={"center"}>
                <Stack className={"register-form"}>
                    <div className={"headline"}>
                        <Typography variant={"h2"}>Sign Up</Typography>
                        <Typography variant={"body1"}>Please create an account to continue.</Typography>
                    </div>
                    <HorizontalLinearStepper steps={steps} isPending={mutation.isPending}/>
                    <Typography variant={"body1"} className={"login-account"}>Already have an account? <Link
                        to={"/auth/login"} onClick={()=>{}}>Sign In</Link></Typography>
                </Stack>
            </Stack>

        </Box>

    );
};

export default Register;
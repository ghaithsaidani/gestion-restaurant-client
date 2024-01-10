import './register.modules.scss'
import {
    HorizontalLinearStepper,
    StepProps
} from "../../../components/horizontal-linear-stepper/horizontal-linear-stepper";
import {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import AuthService from "../../../services/auth.service";
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                .required("you need to enter your first Name"),
            lastName: yup.string()
                .required("you need to enter your last Name")
        }),
        onSubmit: () => {
            console.log(step2.values)
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
                .email("invalid email")
                .required("you need to enter your email"),
            address: yup.string()
                .required("you need to enter your address"),
            phone: yup.string()
                .required("you need to enter your phone"),
        }),
        onSubmit: () => {
            console.log(step2.values)
        }
    });


    const step3 = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validateOnChange: true,
        validateOnBlur: false,
        validateOnMount: true,
        validationSchema: yup.object().shape({
            password: yup.string()
                .required("you need to enter your password"),
            confirmPassword: yup.string().required("you need to enter your password")
        }),
        onSubmit: () => {
            console.log(step3.values)
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
            label: 'ya3tek 3asba 1',
            inputs: [
                {
                    id: "firstName",
                    label: "Nom",
                    type: "text",
                    placeholder: "3asba",
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
                    placeholder: "3asba2",
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
            completed:step1.isValid
        },
        {
            label: 'ya3tek 3asba 2',
            inputs: [
                {
                    id: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "3asba@3asba.com",
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
                    placeholder: "enter your address",
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
                    placeholder: "entrer votre numéro de telephone",
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
            completed:step2.isValid
        },
        {
            label: 'Create',
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
                    label: "Mot de Passe",
                    type: showConfirmPassword ? "text" : "password",
                    placeholder: "*******",
                    value: step3.values.password,
                    handleChange: step3.handleChange,
                    handleShowPassword: handleClickShowConfirmPassword,
                    showPassword: showPassword,
                    error: {
                        condition: step3.touched.password && Boolean(step3.errors.password),
                        messageCondition: step3.touched.password && step3.errors.password,
                        message: step3.errors.password
                    }
                }
            ],
            handleSubmit: step3.handleSubmit,
            completed:step3.isValid
        }
    ]
    //console.log(isValid)
    if(AuthService.isAuth()){
        return <Navigate to={"/dashboard"} replace={true}/>
     }
    return (
        <HorizontalLinearStepper steps={steps}/>
    );
};

export default Register;
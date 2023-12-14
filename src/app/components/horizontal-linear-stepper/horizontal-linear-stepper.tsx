import './horizontal-linear-stepper.modules.scss'
import React, {FormEvent, Fragment, ReactNode, useEffect, useState} from "react";
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {InputFieldModel} from "../../shared/input-field.model";
import {InputField} from "../input-field/input-field";
import {LoadingButton} from "@mui/lab";

/* eslint-disable-next-line */
export interface StepProps {
    label: string;
    inputs: InputFieldModel[]
    handleSubmit:()=>void
    completed:boolean;

}

export interface HorizontalLinearStepperProps {
    steps: StepProps[];
    isPending?:boolean
    //activeStep: number;
    //skipped:Set<number>
}

export function HorizontalLinearStepper(props: HorizontalLinearStepperProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    const [completed, setCompleted] = useState(false)
    useEffect(() => {
        setCompleted(props.steps[activeStep].completed)
    }, [activeStep, props.steps])
    const handleNext = (e:FormEvent) => {
        const step=props.steps[activeStep]
        //console.log(step.handleSubmit)
        e.preventDefault()
        step.handleSubmit()
        if(completed && activeStep !== props.steps.length - 1){
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
            setCompleted(false)
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <Box sx={{ width: '600px' }} className={"stepper-box"}>
            <Stepper activeStep={activeStep}>
                {props.steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: ReactNode;
                    } = {};
                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

                <Fragment>
                    {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}
                    <form onSubmit={handleNext}>
                        <Box className={"form-inputs"}>
                            {props.steps[activeStep].inputs.map((input) => (
                                <InputField key={input.id} {...input}/>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Retourner
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            {activeStep!==props.steps.length-1 ? <Button type={"submit"}>
                                Suivant
                            </Button>:
                                <LoadingButton className={"sign-up-button"} type={"submit"} variant={"contained"}
                                               loading={props.isPending}>Sign In</LoadingButton>
                            }
                        </Box>
                    </form>

                </Fragment>

        </Box>
    );
}

export default HorizontalLinearStepper;

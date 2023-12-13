
import {FormEvent, Fragment, useEffect, useState} from "react";
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {InputFieldModel} from "../../shared/input-field.model";
import {InputField} from "../input-field/input-field";

/* eslint-disable-next-line */
export interface StepProps {
    label: string;
    inputs: InputFieldModel[]
    handleSubmit:()=>void
    completed:boolean ;
}

export interface HorizontalLinearStepperProps {
    steps: StepProps[];
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
        e.preventDefault()
        step.handleSubmit()
        if(completed){
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
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {props.steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === props.steps.length ? (
                <Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </Fragment>
            ) : (
                <Fragment>
                    {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}
                    <form noValidate onSubmit={handleNext}>
                        {props.steps[activeStep].inputs.map((input) => (
                            <InputField key={input.id} {...input}/>
                        ))}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button type={"submit"}>
                                {activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </form>

                </Fragment>
            )}
        </Box>
    );
}

export default HorizontalLinearStepper;

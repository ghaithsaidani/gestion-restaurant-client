import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import './input-field.modules.scss'
import {InputFieldModel} from "../../shared/input-field.model";

export const InputField = (props: InputFieldModel) => {
    return (
        <FormControl margin={"dense"} error={props.error.condition} className={"input-form-control"} variant="outlined" fullWidth>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <OutlinedInput className={"outlined-input"} id={props.id} value={props.value} onChange={props.handleChange} type={props.type}
                        placeholder={props.placeholder} label={props.label}
                endAdornment = {(props.id === 'password' || props.id === 'confirm_password') &&
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={props.handleShowPassword}
                        edge="end"
                    >
                        {props.showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/>}
                    </IconButton>
                </InputAdornment>
            }/>
            <FormHelperText>{props.error.messageCondition ? props.error.message : " "}</FormHelperText>
        </FormControl>
    )
}
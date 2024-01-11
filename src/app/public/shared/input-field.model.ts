import {ChangeEvent} from "react";

interface Error{
    condition?:boolean;
    messageCondition?:string | false;
    message?:string;
}

export interface InputFieldModel {
    id:string;
    label:string;
    type:string;
    placeholder:string;
    value:string | number | boolean;
    handleChange: (e: ChangeEvent<never>) => void;
    handleShowPassword?:()=>void;
    showPassword?:boolean;
    error:Error;
}
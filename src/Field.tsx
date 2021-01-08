import React from "react";
import { IValues } from "./Form";


type Validator = (
    fieldName: string,
    values: IValues,
    args?: any
) => string;

interface IValidation {
    validator: Validator;
    arg?: any;
}

interface IValidationProp {
    [key: string]: IValidation | IValidation[];
}

export interface IFieldProps {
    id: string;
    label?: string;
    type?: "text" | "select";
    value?: string;
    placeholder?: string;
    options?: string[];
    validationRules?: IValidationProp;
}

// Validator functions
export const required: Validator = (
    fieldName: string,
    values: IValues,
    args?: any
): string => 
    values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName].trim() === ""
        ? "This field is required"
        : "";

export const minLength: Validator = (
    fieldName: string,
    values: IValues,
    length: number
): string =>
    values[fieldName] && values[fieldName].length < length
    ? `This field must be at least ${length} characters`
    : "";

export const maxLength: Validator = (
    fieldName: string,
    values: IValues,
    length: number
): string =>
    values[fieldName] && values[fieldName].length > length
        ? `This can not exceed ${length} characters`
        : "";

export const isEmail: Validator = (
    fieldName: string,
    values: IValues
): string =>
    values[fieldName] &&
    values[fieldName].search(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
        ? "This must be a valid email"
        : "";


export const Field: React.FC<IFieldProps> = ({
    id,
    label,
    type,
    value,
    placeholder,
    options
}: IFieldProps) => {
    
    return (
        <div className="form-group">
            {label && <label htmlFor={id}>{label}</label>}
            {type && (
                (type.toLowerCase() === "text" && (
                    <input
                     id={id}
                     type="text"
                     value={value}
                     onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e)}
                     onBlur={(e: React.FormEvent<HTMLInputElement>) => console.log(e)}
                     placeholder={placeholder}
                     className="form-control"
                    />
                )) || (type.toLowerCase() === "select" && (
                    <select
                     name={id}
                     id={id}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => console.log(e)}
                     onBlur={(e: React.ChangeEvent<HTMLSelectElement>) => console.log(e)}
                     className="form-control"
                    >
                        {placeholder && <option value="" disabled selected>{placeholder}</option>}
                        {options && options.map((option: string, index: number) => (
                            <option key={index} value={option.toLowerCase()}>
                                {option}
                            </option>
                        ))}
                    </select>
                ))
            )}
        </div>
    );
};

Field.defaultProps = {
    type: "text"
};
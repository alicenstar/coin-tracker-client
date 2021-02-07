import { ErrorMessage } from '@hookform/error-message';
import { InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';


interface ITextProps {
    label?: string;
    name: string;
    control: Control;
    defaultValue: string;
    rules?: any;
    errors: DeepMap<any, FieldError>;
    helperText?: string;
    inputProps?: any;
    required?: boolean;
    width?: number;
}

export const MuiTextField: React.FC<ITextProps> = ({
    label,
    name,
    control,
    defaultValue,
    rules,
    errors,
    helperText,
    inputProps,
    required,
    width
}: ITextProps) => {
    const labelId = `${name}-label`;


    return (
        <>
            <Controller
             render={(props) => (
                <TextField
                 style={{width: width}}
                 {...props}
                 InputProps={inputProps}
                 name={name}
                 helperText={helperText}
                 id={labelId}
                 label={label}
                 required={required}
                />
             )}
             control={control}
             name={name}
             defaultValue={defaultValue}
             rules={rules}
            />
            {errors && (
                <ErrorMessage
                 errors={errors}
                 name={name}
                 render={({ messages }) =>
                    messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>{message}</p>
                        ))
                 }
                 key={name}
               />
            )}
        </>
    );
};
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, InputLabel, TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';


interface ITextProps {
    label: string;
    name: string;
    control: any;
    defaultValue: any;
    rules?: any;
    errors: any;
    helperText: string;
}

export const MuiTextField: React.FC<ITextProps> = ({
    label,
    name,
    control,
    defaultValue,
    rules,
    errors,
    helperText
}: ITextProps) => {
    const labelId = `${name}-label`
    return (
        <FormControl>
            {/* <InputLabel id={labelId} htmlFor={name}>{label}</InputLabel> */}
            <Controller
             render={(props) => (
                <TextField
                 {...props}
                 helperText={helperText}
                 id={labelId}
                 label={label}
                />
             )}
             control={control}
             name={name}
             defaultValue={defaultValue}
             rules={rules}
            />
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
        </FormControl>
    );
}
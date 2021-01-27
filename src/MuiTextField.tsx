import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@material-ui/core';
import React from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';


interface ITextProps {
    label: string;
    name: string;
    control: Control;
    defaultValue: string;
    rules?: any;
    errors: DeepMap<any, FieldError>;
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
    const labelId = `${name}-label`;
    console.log('errors', errors);
    return (
        <>
            <Controller
             render={(props) => (
                <TextField
                 {...props}
                 name={name}
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
            {errors.length > 0 && (
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
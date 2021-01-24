import { FormControl, InputLabel, TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';


interface ITextProps {
    label: string;
    name: string;
    control: any;
    defaultValue: any;
    rules?: any;
}

export const MuiTextField: React.FC<ITextProps> = ({
    label,
    name,
    control,
    defaultValue,
    rules
}: ITextProps) => {
    const labelId = `${name}-label`
    return (
        <FormControl>
            <InputLabel id={labelId} htmlFor={name}>{label}</InputLabel>
            <Controller
             as={
                <TextField id={name} label={label} />
             }
             control={control}
             name={name}
             defaultValue={defaultValue}
             rules={rules}
            />
        </FormControl>
    );
}
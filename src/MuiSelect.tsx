import { FormControl, InputLabel, Select } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';


interface ISelectProps {
    label: string;
    name: string;
    control: any;
    defaultValue: any;
    rules?: any;
    children: React.ReactNode;
}

export const MuiSelect: React.FC<ISelectProps> = ({
    label,
    name,
    control,
    defaultValue,
    rules,
    children
}: ISelectProps) => {
    const labelId = `${name}-label`;

    return (
        <FormControl>
            <InputLabel id={labelId} htmlFor={name}>{label}</InputLabel>
            <Controller
             render={(props) => (
                <Select
                 {...props}
                 id={labelId}
                 name={name}
                 label={label}
                >
                    {children}
                </Select>
             )}
             control={control}
             name={name}
             defaultValue={defaultValue}
             rules={rules}
            />
        </FormControl>
    );
};
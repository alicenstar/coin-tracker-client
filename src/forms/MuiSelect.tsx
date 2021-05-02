import {
    FormControl,
    InputLabel,
    Select
} from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';


interface ISelectProps {
    label: string;
    name: string;
    control: any;
    defaultValue: any;
    rules?: any;
    children: React.ReactNode;
    menuProps?: any;
};

export const MuiSelect: React.FC<ISelectProps> = ({
    label,
    name,
    control,
    defaultValue,
    rules,
    children,
    menuProps,
}: ISelectProps) => {

    const labelId = `${name}-label`;

    return (
        <FormControl>
            <InputLabel
             id={labelId}
             htmlFor={name}
            >
                {label}
            </InputLabel>
            <Controller
             render={(props) => (
                <Select
                 {...props}
                 id={labelId}
                 name={name}
                 label={label}
                 MenuProps={menuProps}
                 style={{ width: '100%'}}
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
import { FormControl, InputLabel, makeStyles, Select, Theme } from '@material-ui/core';
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
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 8
    }
}))

export const MuiSelect: React.FC<ISelectProps> = ({
    label,
    name,
    control,
    defaultValue,
    rules,
    children,
    menuProps
}: ISelectProps) => {
    const labelId = `${name}-label`;
    const classes = useStyles();

    return (
        <FormControl className={classes.root}>
            <InputLabel id={labelId} htmlFor={name}>{label}</InputLabel>
            <Controller
             render={(props) => (
                <Select
                 {...props}
                 id={labelId}
                 name={name}
                 label={label}
                 MenuProps={menuProps}
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
import { ErrorMessage } from '@hookform/error-message';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';


const useStyles = makeStyles({
    errorText: {
        marginLeft: '14px',
        marginRight: '14px'
    }
});

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
    width?: number | string;
    variant?: 'standard' | 'filled' | 'outlined' | undefined;
    inputLabelProps?: any;
    type?: any;
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
    width,
    variant,
    inputLabelProps,
    type
}: ITextProps) => {

    const labelId = `${name}-label`;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Controller
             render={(props) => (
                <TextField
                 style={{width: width}}
                 {...props}
                 InputProps={inputProps}
                 name={name}
                 helperText={helperText}
                 InputLabelProps={inputLabelProps}
                 id={labelId}
                 label={label}
                 required={required}
                 variant={variant}
                 type={type}
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
                            <Typography
                             className={classes.errorText}
                             key={type}
                             variant="caption"
                             color="error"
                            >
                                {message}
                            </Typography>
                        ))
                 }
                 key={name}
               />
            )}
        </React.Fragment>
    );
};
import { Button, DialogActions } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MuiTextField } from './MuiTextField';


type LoginFormData = {
    username: string;
    password: string;
    email: string;
};

type Props = {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const SignupForm: React.FC<Props> = ({
    children,
    open,
    setOpen
}: Props) => {
    const {
        control,
        handleSubmit,
        errors,
        // formState
    } = useForm<LoginFormData>({
        criteriaMode: 'all',
    });

    const onSubmit = async (data: LoginFormData) => {
        const response = await fetch('http://localhost:5000/api/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log('json user response', json);
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
        });
        console.log('loginresponse signup', loginResponse);
        setOpen(!open);
    };

    // React.useEffect(() => {
    //     if (formState.isSubmitSuccessful) {
    //         // do something
    //     }
    // }, [formState.isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MuiTextField
             helperText=""
             name="username"
             label="Username"
             control={control}
             defaultValue=''
             rules={{
                required: 'This field is required',
                minLength: 4
             }}
             errors={errors}
            />
            <MuiTextField
             inputProps={{ type: 'password' }}
             helperText=""
             name="password"
             label="Password"
             control={control}
             defaultValue=''
             rules={{
                required: 'This field is required',
                minLength: 8
             }}
             errors={errors}
            />
            <MuiTextField
             helperText=""
             name="email"
             label="Email"
             control={control}
             defaultValue=''
             rules={{
                required: 'This field is required',
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
             }}
             errors={errors}
            />
            <DialogActions>
                <Button type="submit">Sign Up</Button>
                {children}
            </DialogActions>
        </form>
    );
};
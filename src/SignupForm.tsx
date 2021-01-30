import { Button, DialogActions } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MuiTextField } from './MuiTextField';
import { useUserContext } from './UserContext';


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
    const { setUser } = useUserContext()!;

    const onSubmit = async (data: LoginFormData) => {
        const userResponse = await fetch('http://localhost:5000/api/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await userResponse.json();
        // if user is created successfully, log them in
        if (json.user) {
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
            const loginJson = await loginResponse.json();
            console.log('loginresponse signup', loginJson);
            setUser(loginJson.user);
        } else {
            console.log('error creating user');
        }
        setOpen(!open);
    };

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
                minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters'
                }
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
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                }
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
                pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Incorrect email format'
                }
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
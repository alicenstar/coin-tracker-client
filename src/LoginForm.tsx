import { Button, DialogActions } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MuiTextField } from './MuiTextField';
import { useUserContext } from './UserContext';


type LoginFormData = {
    username: string;
    password: string;
};

type Props = {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const LoginForm: React.FC<Props> = ({
    children,
    open,
    setOpen
}: Props) => {
    const {
        control,
        handleSubmit,
        errors,
        formState
    } = useForm<LoginFormData>({
        criteriaMode: 'all',
    });
    const { setUser } = useUserContext()!;

    const onSubmit = async (data: LoginFormData) => {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            // credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        setUser(json.user);
        setOpen(!open);
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            // do something
        }
    }, [formState.isSubmitSuccessful]);

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
            <DialogActions>
                <Button type="submit">Login</Button>
                {children}
            </DialogActions>
        </form>
    );
};
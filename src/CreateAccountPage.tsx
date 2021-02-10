import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { MuiTextField } from './MuiTextField';
import { usePageContext } from './PageContext';
import { useTrackerContext } from './TrackerContext';
import { useUserContext } from './UserContext';


type LoginFormData = {
    username: string;
    password: string;
    email: string;
    trackerName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        // backgroundColor: 'lightgray'
    }
}));

export const CreateAccountPage: React.FC = () => {
    const { tracker, setTracker } = useTrackerContext()!;
    const {
        control,
        handleSubmit,
        errors,
        formState
    } = useForm<LoginFormData>({
        criteriaMode: 'all',
    });
    const history = useHistory();
    const { setUser } = useUserContext()!;
    const { setPageElement } = usePageContext()!;

    const onSubmit = async (data: LoginFormData) => {
        const userResponse = await fetch('http://localhost:5000/api/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await userResponse.json();
        // if user is created successfully, log them in and create their tracker
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
            setUser(loginJson.user);

            const response = await fetch('http://localhost:5000/api/trackers/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    trackerName: data.trackerName,
                    user: loginJson.user.id
                }),
            });
            const json = await response.json();
            setTracker(json.tracker);
            setPageElement('Portfolio');
        } else {
            console.log('error creating user');
        }
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful && tracker) {
            console.log('history push')
            history.push(`/${tracker._id}`);
        }
    }, [history, formState.isSubmitSuccessful, tracker]);

    return (
        <>
            <Typography variant="overline" color="primary" display="block">
                Create An Account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                container
                item
                justify="space-between"
                alignItems="center"
                spacing={1}
                direction="column"
                >
                    <Grid item>
                        <MuiTextField
                        required={true}
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
                    </Grid>
                    <Grid item>
                        <MuiTextField
                        required={true}
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
                    </Grid>
                    <Grid item>
                        <MuiTextField
                        required={true}
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
                    </Grid>
                    <Grid item>
                        <MuiTextField
                        name="trackerName"
                        label="Tracker Name"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'This field is required',
                        }}
                        errors={errors}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};
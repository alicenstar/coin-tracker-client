import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { MuiTextField } from './MuiTextField';
import { usePageContext } from './PageContext';
import { useTrackerContext } from './TrackerContext';


type TrackerFormData = {
    trackerName: string;
    user?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        // backgroundColor: 'lightgray'
    }
}));

export const CreateTrackerPage: React.FC = () => {
    const { tracker, setTracker } = useTrackerContext()!;
    const {
        control,
        handleSubmit,
        errors,
        formState
    } = useForm<TrackerFormData>({
        criteriaMode: 'all',
    });
    const { setPageElement } = usePageContext()!;
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = async (data: TrackerFormData) => {
        // if user logged in, associate user with tracker
        const response = await fetch('https://backend-cointracker-dev.herokuapp.com/api/trackers/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        setTracker(json.tracker);
        setPageElement('Portfolio');
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful && tracker) {
            console.log('history push')
            history.push(`/${tracker._id}`);
        }
    }, [history, formState.isSubmitSuccessful, tracker]);

    return (
        <>
            <Typography variant="overline" color="secondary" display="block">
                Create A Tracker
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                container
                item
                justify="space-between"
                alignItems="center"
                spacing={2}
                >
                    <Grid item>
                        <MuiTextField
                        name="trackerName"
                        label="Name"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'This field is required',
                        }}
                        errors={errors}
                        inputProps={{
                            disableUnderline: true
                        }}
                        variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                        type="submit"
                        variant="contained"
                        >
                            Create Tracker
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};
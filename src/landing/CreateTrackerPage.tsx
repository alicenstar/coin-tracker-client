import {
    Button,
    Grid,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { MuiTextField } from '../forms/MuiTextField';
import { usePageContext } from '../context/PageContext';
import { useTrackerContext } from '../context/TrackerContext';


type TrackerFormData = {
    trackerName: string;
    user?: string;
}

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
    const theme: Theme = useTheme();
    const smScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));


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
        // redirect to tracker page
        if (formState.isSubmitSuccessful && tracker) {
            console.log('history push')
            history.push(`/${tracker._id}`);
        }
    }, [history, formState.isSubmitSuccessful, tracker]);

    return (
        <React.Fragment>
            <Typography
             variant="overline"
             color="primary"
             display="block"
            >
                Create A Tracker
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                 container
                 item
                 justify="space-between"
                 alignItems="center"
                 spacing={2}
                 direction={smScreen ? "column" : "row"}
                >
                    <Grid item xs={smScreen ? 12 : false}>
                        <MuiTextField
                         name="trackerName"
                         label="Tracker Name"
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
                    <Grid item xs={smScreen ? 12 : false}>
                        <Button
                        style={{height: '52px', marginBottom: '4px'}}
                         type="submit"
                         variant="contained"
                        >
                            Create Tracker
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};
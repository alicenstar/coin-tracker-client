import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';


export const CreateTracker: React.FC = () => {
    return (
        <Grid
         container
         direction="column"
         justify="center"
         alignItems="center"
         spacing={1}
        >
            <Grid item xs={12}>
                <Typography variant="h5" align="center">Create A Tracker</Typography>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="body2" align="center">
                    Create a tracker without an account (Strangers may be able to edit your holdings if they get your URL)
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Button>Create Tracker</Button>
            </Grid>
        </Grid>
    );
};
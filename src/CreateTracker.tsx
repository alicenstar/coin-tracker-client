import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';


export const CreateTracker: React.FC = () => {
    return (
        <Grid
         container
         item
         direction="column"
         justify="center"
         alignItems="center"
         spacing={2}
         style={{ width: '300px' }}
        >
            <Grid item>
                <Typography
                 color="secondary"
                 variant="overline"
                 align="center"
                >
                    Create A Tracker
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2" align="center">
                    Create a tracker without an account (Strangers may be able to edit your holdings if they get your URL)
                </Typography>
            </Grid>
            <Grid item>
                <Button color="secondary" variant="contained">
                    Create Tracker
                </Button>
            </Grid>
        </Grid>
    );
};
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';


export const CreateAccount: React.FC = () => {
    return (
        <Grid
         container
         direction="column"
         justify="center"
         alignItems="center"
         spacing={1}
        >
            <Grid item xs={12}>
                <Typography color="primary" variant="h5" align="center">Create An Account</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body2" align="center">
                    Keep track of multiple trackers without worrying about your holdings being editted
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Button color="primary" variant="contained">Create Account</Button>
            </Grid>
        </Grid>
    );
};
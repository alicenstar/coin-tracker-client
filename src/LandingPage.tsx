import {
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import React from 'react';
import { CreateTracker } from './CreateTracker';
import { CreateAccount } from './CreateAccount';


export const LandingPage: React.FC = () => {
    return (
        <Grid
         container
         direction="column"
         justify="center"
         alignItems="center"
         style={{ minHeight: '100vh' }}
         spacing={3}
        >
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    <Box letterSpacing={3}>
                        Coin Tracker
                    </Box>
                </Typography>
            </Grid>
            <Grid
             container
             item
             direction="row"
             justify="center"
             alignItems="center"
             xs={12}
             spacing={0}
            >
                <Grid item xs={3}>
                    <CreateTracker />
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="subtitle1" align="center">OR</Typography>
                </Grid>
                <Grid item xs={3}>
                    <CreateAccount />
                </Grid>
            </Grid>
        </Grid>
    );
};
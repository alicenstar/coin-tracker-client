import {
    Box,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import React from 'react';
import { CreateTracker } from './CreateTracker';
import { CreateAccount } from './CreateAccount';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        }
    })
);

export const LandingPage: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: '90vh', maxWidth: '100vw' }}
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
        </div>
    );
};
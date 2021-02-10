import {
    Box,
    Grid,
    makeStyles,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from 'react';
import { CreateTracker } from './CreateTracker';
import { CreateAccount } from './CreateAccount';
import clsx from 'clsx';
import { CreateTrackerPage } from './CreateTrackerPage';
import { CreateAccountPage } from './CreateAccountPage';


const useStyles = makeStyles({
    hide: {
        display: 'none'
    }
})

export const LandingPage: React.FC = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [ page, setPage ] = React.useState('main');
    const classes = useStyles();

    return (
        <Grid
         container
         direction="column"
         justify='center'
         alignItems="center"
         style={{ minHeight: '90vh', width: '100vw' }}
        >
            <Grid
             container
             item
             direction={smScreen ? "column" : "row"}
             justify="center"
             alignItems="center"
             spacing={smScreen ? 3 : 7}
             style={{ width: '100vw'}}
            >
                <Grid item xs={12}>
                    <Typography variant={smScreen ? "h2" : "h1"} align="center">
                        <Box letterSpacing={3}>
                            Coin Tracker
                        </Box>
                    </Typography>
                </Grid>
                <Grid
                 className={clsx({
                    [classes.hide]: page !== 'main',
                 })}
                 item
                >
                    <CreateTracker setPage={setPage} />
                </Grid>
                <Grid
                 className={clsx({
                    [classes.hide]: page !== 'main',
                 })}
                 item
                >
                    <Typography
                     variant="subtitle1"
                     align="center"
                     display="block"
                    >
                        OR
                    </Typography>
                </Grid>
                <Grid
                 className={clsx({
                    [classes.hide]: page !== 'main',
                 })}
                 item
                >
                    <CreateAccount setPage={setPage} />
                </Grid>
                <Grid
                 className={clsx({
                    [classes.hide]: page !== 'tracker',
                 })}
                 item
                >
                    <CreateTrackerPage />
                </Grid>
                <Grid
                 className={clsx({
                    [classes.hide]: page !== 'account',
                 })}
                 item
                >
                    <CreateAccountPage />
                </Grid>
            </Grid>
        </Grid>
    );
};
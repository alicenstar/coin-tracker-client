import {
    Box,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from 'react';
import { CreateTracker } from './CreateTracker';
import clsx from 'clsx';
import { CreateTrackerPage } from './CreateTrackerPage';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles({
    hide: {
        display: 'none'
    }
});

export const LandingPage: React.FC = () => {
    const theme: Theme = useTheme();
    const smScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));
    const [ page, setPage ] = React.useState<string>('tracker');
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
                {/* <Grid
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
                </Grid> */}
                <Grid
                 className={clsx({
                    [classes.hide]: page !== 'tracker',
                 })}
                 item
                >
                    <CreateTrackerPage />
                    {/* <IconButton aria-label="back" onClick={() => setPage('main')}>
                        <ArrowBackIcon />
                    </IconButton> */}
                </Grid>
            </Grid>
        </Grid>
    );
};
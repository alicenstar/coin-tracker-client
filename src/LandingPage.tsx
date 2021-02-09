import {
    Box,
    Container,
    Grid,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from 'react';
import { CreateTracker } from './CreateTracker';
import { CreateAccount } from './CreateAccount';


export const LandingPage: React.FC = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <Grid item>
                        <CreateTracker />
                    </Grid>
                    <Grid item>
                        <Typography
                         variant="subtitle1"
                         align="center"
                         display="block"
                        >
                            OR
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CreateAccount />
                    </Grid>
                </Grid>
            </Grid>
    );
};

{/* <Container maxWidth="md">
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: '90vh' }}
            spacing={3}
            >
                <Grid item>
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
                 spacing={7}
                >
                    <Grid item>
                        <CreateTracker />
                    </Grid>
                    <Grid item>
                        <Typography
                         variant="subtitle1"
                         align="center">
                            OR
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CreateAccount />
                    </Grid>
                </Grid>
            </Grid>
        </Container> */}
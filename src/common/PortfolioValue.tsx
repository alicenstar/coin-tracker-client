import {
    Grid,
    makeStyles,
    Paper,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from 'react';
import { currencyFormatter, percentFormatter } from '../utils/formatters';
import { useTrackerContext } from '../context/TrackerContext';
import { useListingsContext } from '../context/ListingsContext';
import { IHolding } from '../types/types';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: 16,
        marginBottom: 24,
        borderColor: theme.palette.primary.main,
    }
}));

export const PortfolioValue: React.FC = () => {
    const { listings } = useListingsContext()!;
    const { tracker } = useTrackerContext()!;
    const total = tracker!.holdings.map((holding: IHolding) => {
        const listingMatch = listings.find(listing => listing.id === holding.coinId);
        return parseFloat(holding.quantity) * listingMatch!.quote.USD.price;
    });
    let portfolioTotal: number = 0;
    let returnOnInvestment: number = 0;
    if (total.length > 0) {
        portfolioTotal = total.reduce((a: number, b: number) => a + b);
        returnOnInvestment = (portfolioTotal / tracker!.initialInvestment) - 1;
    }
    const theme = useTheme();
    const xsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={7} variant="outlined">
            <Grid container spacing={3}>
                <Grid
                 item
                 container
                 direction={xsScreen ? "row-reverse" : "column"}
                 alignItems="center"
                 justify={xsScreen ? "space-between" : "center"}
                 xs={12}
                 sm={6}
                 md={4}
                >
                    <Grid item>
                        <Typography variant="h3">
                            {currencyFormatter.format(portfolioTotal)}
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant="body1">
                            Portfolio Value
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                 item
                 container
                 direction={xsScreen ? "row-reverse" : "column"}
                 alignItems="center"
                 justify={xsScreen ? "space-between" : "center"}
                 xs={12}
                 sm={6}
                 md={4}
                >
                    <Typography variant="h3">
                        {currencyFormatter.format(tracker!.initialInvestment)}
                    </Typography>
                    <Typography variant="body1">
                        Initial Investment
                    </Typography>
                </Grid>
                <Grid
                 item
                 container
                 direction={xsScreen ? "row-reverse" : "column"}
                 alignItems="center"
                 justify={xsScreen ? "space-between" : "center"}
                 xs={12}
                 sm={6}
                 md={4}
                >
                    <Typography variant="h3" display="block">
                        {percentFormatter.format(returnOnInvestment)}
                    </Typography>
                    <Typography variant="body1">
                        Return on Investment
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
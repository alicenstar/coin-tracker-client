import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { currencyFormatter, percentFormatter } from './utils/Formatters';
import { useTrackerContext } from './TrackerContext';
import { useListingsContext } from './ListingsContext';
import { IHolding } from './types/types';


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
;
    return (
            <Grid container spacing={3}>
                <Grid
                 item
                 container
                 direction="column"
                 alignItems="center"
                 xs={12}
                 sm={4}
                 md={4}
                >
                    <Typography variant="subtitle1">
                        {currencyFormatter.format(portfolioTotal)}
                    </Typography>
                    <Typography variant="subtitle1">
                        Portfolio Value
                    </Typography>
                </Grid>
                <Grid
                 item
                 container
                 direction="column"
                 alignItems="center"
                 xs={12}
                 sm={4}
                 md={4}
                >
                    <Typography variant="subtitle1">
                        {currencyFormatter.format(tracker!.initialInvestment)}
                    </Typography>
                    <Typography variant="subtitle1">
                        Initial Investment
                    </Typography>
                </Grid>
                <Grid
                 item
                 container
                 direction="column"
                 alignItems="center"
                 xs={12}
                 sm={4}
                 md={4}
                >
                    <Typography variant="subtitle1">
                        {percentFormatter.format(returnOnInvestment)}
                    </Typography>
                    <Typography variant="subtitle1">
                        Return on Investment
                    </Typography>
                </Grid>
            </Grid>
    );
};
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { currencyFormatter, percentFormatter } from './utils/Formatters';
import { useTrackerContext } from './TrackerContext';
import { useListingsContext } from './LatestListingsContext';


export const PortfolioValue: React.FC = () => {
    const { listings } = useListingsContext()!;
    const { tracker } = useTrackerContext()!;
    const total = tracker!.holdings.map((holding: any) => {
        const listingMatch = listings.find(listing => listing.id === holding.coinId);
        return holding.quantity * listingMatch!.quote.USD.price;
    });
    let portfolioTotal;
    let returnOnInvestment;
    if (total.length > 0) {
        portfolioTotal = total.reduce((a: number, b: number) => a + b);
        returnOnInvestment = (portfolioTotal / tracker!.initialInvestment) - 1;
    } else {
        portfolioTotal = 0;
        returnOnInvestment = 0;
    }

    return (
        <Box>
            <Typography variant="h6">Portfolio Value</Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Total: {currencyFormatter.format(portfolioTotal)}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Initial Investment: {currencyFormatter.format(Number(tracker!.initialInvestment))}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Return on Investment: {percentFormatter.format(Number(returnOnInvestment))}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
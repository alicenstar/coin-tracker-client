import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { currencyFormatter, percentFormatter } from './utils/Formatters';
import { useTrackerContext } from './TrackerContext';
import { useListingsContext } from './LatestListingsContext';
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
        <Container>
            <Typography variant="h6">Portfolio Value</Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Total: {currencyFormatter.format(portfolioTotal)}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Initial Investment: {currencyFormatter.format(tracker!.initialInvestment)}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        Return on Investment: {percentFormatter.format(returnOnInvestment)}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};
import React from 'react';
import { usePageContext } from '../context/PageContext';
import { Overview } from '../overview/Overview';
import { Portfolio } from '../portfolio/Portfolio';
import { useTrackerContext } from '../context/TrackerContext';
import { useListingsContext } from '../context/ListingsContext';
import { PortfolioValue } from './PortfolioValue';
import { Container } from '@material-ui/core';


const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;
    const { tracker } = useTrackerContext()!;
    const { listings } = useListingsContext()!;

    return (
        <Container disableGutters>
            {tracker && listings.length > 0 && (
                <PortfolioValue />
            )}
            {pageElement === 'Overview' && (
                <Overview />
            )}
            {pageElement === 'Portfolio' && (
                <Portfolio
                    key={window.location.pathname}
                />
            )}
        </Container>
    );
}

export default Dashboard;
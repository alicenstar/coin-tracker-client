import React from 'react';
import { usePageContext } from './PageContext';
import { Overview } from './Overview';
import { Portfolio } from './Portfolio';
import { useTrackerContext } from './TrackerContext';
import { useListingsContext } from './ListingsContext';
import { PortfolioValue } from './PortfolioValue';


const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;
    const { tracker } = useTrackerContext()!;
    const { listings } = useListingsContext()!;

    return (
        <div className="dashboard-container">
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
        </div>
    );
}

export default Dashboard;
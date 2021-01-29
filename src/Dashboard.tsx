import React from 'react';
import { usePageContext } from './PageContext';
import { Overview } from './Overview';
import { Portfolio } from './Portfolio';
import { LatestListingsProvider } from './LatestListingsContext';


const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;

    return (
        <LatestListingsProvider>
            <div className="dashboard-container">
                {pageElement === 'Overview' && (
                    <Overview />
                )}
                {pageElement === 'Portfolio' && (
                    <Portfolio
                        key={window.location.pathname}
                    />
                )}
            </div>
        </LatestListingsProvider>
    );
}

export default Dashboard;
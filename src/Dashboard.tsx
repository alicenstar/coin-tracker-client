import React from 'react';
import { usePageContext } from './PageContext';
import { NewTracker } from './NewTracker';
import { Overview } from './Overview';
import { Trackers } from './Trackers';


const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;

    return (
        <div className="dashboard-container">
            {pageElement === 'Overview' && (
                <Overview />
            )}
            {pageElement === 'Portfolio' && (
                <Trackers />
            )}
            {pageElement === 'New Tracker' && (
                <NewTracker />
            )}
        </div>
    );
}

export default Dashboard;
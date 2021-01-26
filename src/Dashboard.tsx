import React from 'react';
import { usePageContext } from './PageContext';
import { Overview } from './Overview';
import { Portfolio } from './Portfolio';


const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;

    return (
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
    );
}

export default Dashboard;
import React from 'react';
import { usePageContext } from './PageContext';
import { NewTracker } from './NewTracker';
import { Overview } from './Overview';
import { Trackers } from './Portfolio';


export type SymbolDropdown = {
    symbol: string;
    id: number;
}

interface IResult {
    loaded: boolean;
    data: any;
    symbols: SymbolDropdown[];
}

const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;
    const [state, setState] = React.useState<IResult>({
        loaded: false,
        data: [],
        symbols: []
    });
    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/cmc/latest');
        const json = await response.json();
        const symbols = json.json.data.map((object: any) => (
            {
                symbol: object.symbol,
                id: object.id
            }
        ));
        setState({ loaded: true, data: json.json.data, symbols: symbols });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            {!state.loaded && (<div>Loading...</div>)}
            {pageElement === 'Overview' && (
                <Overview data={state.data} />
            )}
            {pageElement === 'Portfolio' && (
                <Trackers symbols={state.symbols} />
            )}
            {pageElement === 'New Tracker' && (
                <NewTracker />
            )}
        </div>
    );
}

export default Dashboard;
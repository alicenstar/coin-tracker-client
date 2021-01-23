import React from 'react';
import { usePageContext } from './PageContext';
import { Overview } from './Overview';
import { Portfolio } from './Portfolio';
import Loading from './Loading';
import { useInterval } from './HoldingsTable';


export type SymbolsDropdown = {
    symbol: string;
    id: number;
}

interface IResult {
    loaded: boolean;
    data: any;
    symbols: SymbolsDropdown[];
}

const Dashboard: React.FC = () => {
    const { pageElement } = usePageContext()!;
    const [state, setState] = React.useState<IResult>({
        loaded: false,
        data: [],
        symbols: []
    });

    const fetchData = React.useCallback(async () => {
        const response = await fetch('http://localhost:5000/api/cmc/latest', {
            headers: {
                'Content-type': 'application/json'
            }
        });
        const json = await response.json();
        const symbols = json.json.data.map((object: any) => (
            {
                symbol: object.symbol,
                id: object.id
            }
        ));
        setState({
            loaded: true,
            data: json.json.data,
            symbols: symbols
        });
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    useInterval(() => {
        fetchData();
    }, 30000);

    return (
        <div className="dashboard-container">
            {!state.loaded && (<Loading />)}
            {pageElement === 'Overview' && (
                <Overview key={state.data} data={state.data} />
            )}
            {pageElement === 'Portfolio' && (
                <Portfolio
                    symbols={state.symbols}
                    key={window.location.pathname}
                />
            )}
        </div>
    );
}

export default Dashboard;
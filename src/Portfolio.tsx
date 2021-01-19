import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { returnedTracker } from './NewTrackerForm';
import { SymbolDropdown } from './Dashboard';
import { HoldingsTable } from "./HoldingsTable";
import { Typography } from "@material-ui/core";


interface IRouteParams {
    id: string;
}

interface IState {
    loaded: boolean;
    tracker: returnedTracker | undefined;
}

type Props = {
    symbols: SymbolDropdown[];
}

export const Portfolio: React.FC<Props> = ({ symbols }: Props) => {
    const [ state, setState ] = React.useState<IState>({
        loaded: false,
        tracker: undefined
    });
    const { id } = useParams<IRouteParams>();
    const trackerId = React.useRef(id);
    
    const findTracker = React.useCallback(async () => {
        const response = await fetch(`http://localhost:5000/api/trackers/${trackerId.current}`)
        const json = await response.json();
        if (json.tracker) {
            trackerId.current = json.tracker._id;
        } else {
            trackerId.current = '';
        }
        setState({ loaded: true, tracker: json.tracker });
    }, []);

    React.useEffect(() => {
        findTracker();
    }, [findTracker]);

    return (
        <div className="portfolio-container">
            {!state.loaded &&
                <div>Loading...</div>
            }
            {state.tracker
                ? (
                    <React.Fragment>
                        <Typography variant="h6">
                            Tracker Name: {state.tracker.name}
                        </Typography>
                        <NewTransactionForm
                            symbols={symbols}
                            trackerId={trackerId.current}
                            findTracker={findTracker}
                        />
                        <p>Tracker Name: {state.tracker.name}</p>
                        <HoldingsTable
                            data={state.tracker.holdings}
                            headers={[
                            "CoinId",
                            "Quantity",
                            ]}
                            title="Market Overview"
                        />
                    </React.Fragment>
                )
                : 'Tracker not found'
            }
        </div>
    );
};
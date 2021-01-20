import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { returnedTracker } from './NewTrackerForm';
import { SymbolDropdown } from './Dashboard';
import { HoldingsTable } from "./HoldingsTable";
import { Typography } from "@material-ui/core";
import Loading from "./Loading";


interface IRouteParams {
    id: string;
}

interface IState {
    loaded: boolean;
    tracker: returnedTracker | undefined;
}

type Props = {
    symbols: SymbolDropdown[];
    setHeader: (header: any) => void;
}

export const Portfolio: React.FC<Props> = ({ symbols, setHeader }: Props) => {
    const [ state, setState ] = React.useState<IState>({
        loaded: false,
        tracker: undefined
    });
    const { id } = useParams<IRouteParams>();
    const trackerId = React.useRef(id);

    const findTracker = React.useCallback(async () => {
        const response = await fetch(`http://localhost:5000/api/trackers/${trackerId.current}`);
        const json = await response.json();
        if (json.tracker) {
            setHeader(json.tracker._id);
        } else {
            trackerId.current = '';
            setHeader(undefined);
        }
        setState({ loaded: true, tracker: json.tracker });
    }, []);

    React.useEffect(() => {
        findTracker();
    }, [findTracker]);

    return (
        <div className="portfolio-container">
            {!state.loaded && (<Loading />)}
            {state.loaded && state.tracker && (
                <React.Fragment>
                    <Typography variant="h6">
                        Tracker Name: {state.tracker.name}
                    </Typography>
                    <NewTransactionForm
                        symbols={symbols}
                        trackerId={trackerId.current}
                        findTracker={findTracker}
                    />
                    <HoldingsTable
                        data={state.tracker.holdings}
                        headers={[
                        "Coin Name",
                        "Market Price",
                        "% Change 1HR",
                        "Quantity",
                        "Total Value"
                        ]}
                        title="Market Overview"
                    />
                </React.Fragment>
            )}
            {state.loaded && !state.tracker && ('Tracker Not Found')}
        </div>
    );
};
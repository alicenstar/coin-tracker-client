import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { returnedTracker } from './NewTrackerForm';
import { SymbolDropdown } from './Dashboard';
import { HoldingsTable } from "./HoldingsTable";
import { Typography } from "@material-ui/core";
import Loading from "./Loading";
import { usePageContext } from "./PageContext";


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
    const history = useHistory();
    console.log('history', history);

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
    }, [findTracker, history.location.pathname]);

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
                        "CoinId",
                        "Quantity",
                        ]}
                        title="Market Overview"
                    />
                </React.Fragment>
            )}
            {state.loaded && !state.tracker && ('Tracker Not Found')}
        </div>
    );
};
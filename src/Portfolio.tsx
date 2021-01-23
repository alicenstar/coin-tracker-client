import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { SymbolsDropdown } from './Dashboard';
import { HoldingsTable } from "./HoldingsTable";
import { Typography } from "@material-ui/core";
import Loading from "./Loading";
import { useTrackerContext } from "./TrackerContext";


interface IState {
    loaded: boolean;
}

type Props = {
    symbols: SymbolsDropdown[];
}

export const Portfolio: React.FC<Props> = ({ symbols }: Props) => {
    const [ state, setState ] = React.useState<IState>({
        loaded: false,
    });
    const { id } = useParams<{ id: string}>();
    const trackerId = React.useRef<string | undefined>(id);
    const { tracker, setTracker } = useTrackerContext()!;

    const findTracker = React.useCallback(async () => {
        const response = await fetch(`http://localhost:5000/api/trackers/${trackerId.current}`);
        const json = await response.json();
        if (json.tracker) {
            trackerId.current = json.tracker._id;
            setTracker(json.tracker);
        } else {
            trackerId.current = undefined;
            setTracker(undefined);
        }
        setState({
            loaded: true,
        });
    }, [setTracker]);


    React.useEffect(() => {
        findTracker();
    }, [findTracker]);

    return (
        <div className="portfolio-container">
            {!state.loaded && (<Loading />)}
            {state.loaded && tracker && (
                <React.Fragment>
                    <Typography variant="h6">
                        Tracker Name: {tracker.name}
                    </Typography>
                    <NewTransactionForm
                        symbols={symbols}
                        findTracker={findTracker}
                    />
                    <HoldingsTable
                        // key={holdings.current}
                        data={tracker.holdings}
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
            {state.loaded && !tracker && ('Tracker Not Found')}
        </div>
    );
};
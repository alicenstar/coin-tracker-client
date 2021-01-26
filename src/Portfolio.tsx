import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { HoldingsTable } from "./HoldingsTable";
import { Typography } from "@material-ui/core";
import Loading from "./Loading";
import { useTrackerContext } from "./TrackerContext";
import { PortfolioValue } from "./PortfolioValue";


interface IState {
    loaded: boolean;
}

export const Portfolio: React.FC = () => {
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
                    <Typography variant="h4">
                        Tracker Name: {tracker.name}
                    </Typography>
                    <PortfolioValue />
                    <NewTransactionForm
                     findTracker={findTracker}
                    />
                    <HoldingsTable
                     headers={[
                        "Coin Name",
                        "Market Price",
                        "% Change 1HR",
                        "Quantity",
                        "Total Value"
                     ]}
                    />
                </React.Fragment>
            )}
            {state.loaded && !tracker && ('Tracker Not Found')}
        </div>
    );
};
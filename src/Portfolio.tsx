import React from "react";
import { NewTransactionForm } from "./NewTransactionForm";
import { HoldingsTable } from "./HoldingsTable";
import {
    Container,
    makeStyles,
    Paper,
    Theme,
    Typography
} from "@material-ui/core";
import { useTrackerContext } from "./TrackerContext";
import { useListingsContext } from "./ListingsContext";
import { IHolding, IListing } from "./types/types";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: 8,
        marginTop: 8,
        marginBottom: 24,
        borderColor: theme.palette.secondary.main,
    }
}));

export const Portfolio: React.FC = () => {
    const { tracker } = useTrackerContext()!;
    const { listings } = useListingsContext()!;
    const [ tableData, setTableData ] = React.useState<any>([]);
    const classes = useStyles();

    const createTableData = React.useCallback(() => {
        let data = tracker!.holdings.map((holding: IHolding) => {
            const listingMatch: IListing | undefined = listings.find(listing => listing.id === holding.coinId);
            return {
                id: holding._id,
                listing: listingMatch,
                quantity: parseFloat(holding.quantity),
                totalValue: parseFloat(holding.quantity) * listingMatch!.quote.USD.price,
            }
        });
        data.sort(function(a: any, b: any) { return b.totalValue - a.totalValue });
        setTableData(data);
    }, [listings, tracker])

    React.useEffect(() => {
        createTableData();
    }, [createTableData, listings, tracker]);

    return (
        <div className="portfolio-container">
            {tracker
                ? (
                    <Container disableGutters>
                        <Typography variant="h4">
                            {tracker.name}
                        </Typography>
                        <Paper className={classes.root} elevation={7} variant="outlined">
                            <NewTransactionForm />
                        </Paper>
                        {tableData.length > 0 &&
                            <HoldingsTable
                            data={tableData}
                            headers={[
                                "Coin Name",
                                "Market Price",
                                "1hr",
                                "24hr",
                                "Quantity",
                                "Value"
                            ]}
                            />
                        }
                            
                    </Container>
                ) : (
                    'Tracker Not Found'
                )
            }
        </div>
    );
};
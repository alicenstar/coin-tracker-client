import React from "react";
import { NewTransactionForm } from "./NewTransactionForm";
import { HoldingsTable } from "./HoldingsTable";
import { Container, Typography } from "@material-ui/core";
import { useTrackerContext } from "./TrackerContext";
import { useListingsContext } from "./ListingsContext";
import { IHolding, IListing } from "./types/types";
import { currencyFormatter, percentFormatter } from "./utils/Formatters";


export const Portfolio: React.FC = () => {
    const { tracker } = useTrackerContext()!;
    const { listings } = useListingsContext()!;
    const [ tableData, setTableData ] = React.useState<any>([]);

    const createTableData = React.useCallback(() => {
        let data = tracker!.holdings.map((holding: IHolding) => {
            const listingMatch: IListing | undefined = listings.find(listing => listing.id === holding.coinId);
            return {
                id: holding._id,
                name: listingMatch!.name,
                marketPrice: currencyFormatter.format(listingMatch!.quote.USD.price),
                percentChange1H: percentFormatter.format(listingMatch!.quote.USD.percent_change_1h / 100),
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
                    <Container>
                        <Typography variant="h4">
                            Tracker Name: {tracker.name}
                        </Typography>
                        <NewTransactionForm />
                        {tableData.length > 0 &&
                            <HoldingsTable
                            data={tableData}
                            headers={[
                                "Coin Name",
                                "Market Price",
                                "% Change 1HR",
                                "Quantity",
                                "Total Value"
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
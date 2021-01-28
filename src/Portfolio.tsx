import React from "react";
import { NewTransactionForm } from "./NewTransactionForm";
import { HoldingsTable } from "./HoldingsTable";
import { Typography } from "@material-ui/core";
import { useTrackerContext } from "./TrackerContext";
import { PortfolioValue } from "./PortfolioValue";


export const Portfolio: React.FC = () => {
    const { tracker } = useTrackerContext()!;

    return (
        <div className="portfolio-container">
            {tracker
                ? (
                    <React.Fragment>
                        <Typography variant="h4">
                            Tracker Name: {tracker.name}
                        </Typography>
                        <PortfolioValue />
                        <NewTransactionForm />
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
                ) : (
                    'Tracker Not Found'
                )
            }
        </div>
    );
};
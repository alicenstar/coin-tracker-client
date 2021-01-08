import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";

interface IRouteParams {
    trackerid: string;
}

export const Trackers: React.FC = () => {
    let { trackerid } = useParams<IRouteParams>();
    return (
        <div className="portfolio-container">
            <NewTransactionForm />
            Tracker ID: {trackerid}
        </div>
    );
};
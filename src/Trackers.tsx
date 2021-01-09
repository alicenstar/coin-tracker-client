import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { useTracker } from './Context';

interface IRouteParams {
    id: string;
}

export const Trackers: React.FC = () => {
    const { trackerId, setTrackerId } = useTracker()!;
    let { id } = useParams<IRouteParams>();
    setTrackerId(id);

    return (
        <div className="portfolio-container">
            <NewTransactionForm />
            Tracker ID: {trackerId}
        </div>
    );
};
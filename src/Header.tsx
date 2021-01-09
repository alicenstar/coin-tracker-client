import { Typography } from "@material-ui/core";
import React from "react";
import { useTracker } from './Context';

interface IRouteParams {
    trackerid: string;
}

export const Header: React.FC = () => {
    const { trackerId, setTrackerId } = useTracker()!;
    return (
        <React.Fragment>
            <Typography variant="h6">
                # {trackerId}
            </Typography>
        </React.Fragment>
    );
};
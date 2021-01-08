import { Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

interface IRouteParams {
    trackerid: string;
}

export const Header: React.FC = () => {
    // let { trackerid } = useParams<IRouteParams>();
    return (
        <React.Fragment>
            <Typography variant="h5">
                # Welcome
            </Typography>
        </React.Fragment>
    );
};
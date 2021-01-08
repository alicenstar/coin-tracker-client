import { Typography } from "@material-ui/core";
import React from "react";


export const Header: React.FC = () => {
    return (
        <hgroup className="App-header">
            <Typography variant="h3">
                Coin Tracker
            </Typography>
            <Typography variant="subtitle1">
                The easiest way to keep track of your holdings.
            </Typography>
        </hgroup>
    );
};
import {
    Backdrop,
    CircularProgress,
    createStyles,
    makeStyles,
    Theme
} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        },
    }),
);

export default function Loading() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    );
};
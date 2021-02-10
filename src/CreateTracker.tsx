import {
    Box,
    Button,
    makeStyles,
    Typography
} from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
    paragraph: {
        paddingTop: 16,
        paddingBottom: 10
    }
});

type Props = {
    setPage: (page: string) => void;
}

export const CreateTracker: React.FC<Props> = ({
    setPage
}: Props) => {
    const classes = useStyles();

    return (
        <>
            <Typography
             color="secondary"
             variant="overline"
             align="center"
             display="block"
            >
                Create A Tracker
            </Typography>
            <Typography
             style={{ width: 270 }}
             className={classes.paragraph}
             variant="body2"
             align="center"
             display="block"
            >
                Create a tracker without an account (Strangers may be able to edit your holdings if they get your URL)
            </Typography>
            <Box textAlign="center">
                <Button color="secondary" variant="contained" onClick={() => setPage('tracker')}>
                    Create Tracker
                </Button>
            </Box>
        </>
    );
};
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

export const CreateAccount: React.FC<Props> = ({
    setPage
}: Props) => {
    const classes = useStyles();

    return (
        <>
            <Typography
             color="primary"
             variant="overline"
             align="center"
             display="block"
            >
                Create An Account
            </Typography>
            <Typography
             style={{ width: 270 }}
             className={classes.paragraph}
             variant="body2"
             align="center"
             display="block"
            >
                Keep track of multiple trackers without worrying about your holdings being editted
            </Typography>
            <Box textAlign="center">
                <Button color="primary" variant="contained" onClick={() => setPage('account')}>
                    Create Account
                </Button>
            </Box>
        </>
    );
};
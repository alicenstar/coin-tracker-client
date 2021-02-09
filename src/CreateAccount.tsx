import {
    Box,
    Button,
    Container,
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

export const CreateAccount: React.FC = () => {
    const classes = useStyles();
    
    return (
        <Container
         style={{ width: '270px' }}
         disableGutters
        >
            <Typography
             color="primary"
             variant="overline"
             align="center"
             display="block"
            >
                Create An Account
            </Typography>
            <Typography
            className={classes.paragraph}
             variant="body2"
             align="center"
             display="block"
            >
                Keep track of multiple trackers without worrying about your holdings being editted
            </Typography>
            <Box textAlign="center">
                <Button color="primary" variant="contained">
                    Create Account
                </Button>
            </Box>
        </Container>
    );
};
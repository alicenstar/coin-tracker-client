import React from 'react';
import {
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    useTheme
} from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5)
        }
    })
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, page-1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
             onClick={handleFirstPageButtonClick}
             disabled={page === 0}
             aria-label="first page"
            >
                {theme.direction === 'rtl'
                    ? <LastPageIcon color="primary" />
                    : <FirstPageIcon color="primary" />
                }
            </IconButton>
            <IconButton
             onClick={handleBackButtonClick}
             disabled={page === 0}
             aria-label="previous page"
            >
                {theme.direction === 'rtl'
                    ? <KeyboardArrowRight color="primary" />
                    : <KeyboardArrowLeft color="primary" />
                }
            </IconButton>
            <IconButton
             onClick={handleNextButtonClick}
             disabled={page >= Math.ceil(count / rowsPerPage) - 1}
             aria-label="next page"
            >
                {theme.direction === 'rtl'
                    ? <KeyboardArrowLeft color="primary" />
                    : <KeyboardArrowRight color="primary" />
                }
            </IconButton>
            <IconButton
             onClick={handleLastPageButtonClick}
             disabled={page >= Math.ceil(count / rowsPerPage) - 1}
             aria-label="last page"
            >
                {theme.direction === 'rtl'
                    ? <FirstPageIcon color="primary" />
                    : <LastPageIcon color="primary" />
                }
            </IconButton>
        </div>
    );
};
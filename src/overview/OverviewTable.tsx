import React from "react";
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
    withStyles,
} from "@material-ui/core";
import { TablePaginationActions } from './TablePaginationActions';
import {
    currencyFormatter,
    percentFormatter,
    largeCurrencyFormatter
} from "../utils/formatters";
import { useListingsContext } from '../context/ListingsContext';


interface ITableProps {
    headers: string[];
    data?: any;
};

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '80vh',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    footer: {
        float: 'right'
    },
});

const StickyTableCell = withStyles((theme: Theme) => ({
    head: {
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 2
    },
    body: {
        minWidth: 50,
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: 'inherit'
    }
}))(TableCell);

const StickyTableHeaderCell = withStyles((theme: Theme) => ({
    head: {
        left: 0,
        top: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 2
    },
    body: {
        minWidth: 50,
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: 'inherit'
    }
}))(TableCell);

export const OverviewTable: React.FC<ITableProps> = ({
    headers,
    data
}: ITableProps) => {
    const { listings } = useListingsContext()!;
    const classes = useStyles();
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage ] = React.useState(40);

    const emptyRows = rowsPerPage - Math.min(
        rowsPerPage,
        listings.length - page * rowsPerPage
    );
    
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    return (
        <React.Fragment>
            <TableContainer className={classes.container}>
                <Table size="small" aria-label="market overview table">
                    {headers && (
                        <TableHead>
                            <TableRow>
                                {headers.map((header: string, index: number) => {
                                    if (index === 0) {
                                        return (
                                            <TableCell key={header}>
                                                {header}
                                            </TableCell>
                                        )
                                    } else if (index === 1) {
                                        return (
                                            <StickyTableHeaderCell key={header}>
                                                {header}
                                            </StickyTableHeaderCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell align="right" key={header}>
                                                {header}
                                            </TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {(rowsPerPage > 0
                            ? listings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : listings).map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.cmc_rank}
                                    </TableCell>
                                    <StickyTableCell>
                                        <Typography variant="subtitle2">
                                            {row.symbol}
                                        </Typography>
                                        <Typography variant="caption">
                                            {row.name}
                                        </Typography>
                                    </StickyTableCell>
                                    <TableCell align="right">
                                        {currencyFormatter.format(row.quote.USD.price)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {largeCurrencyFormatter(row.quote.USD.market_cap)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {largeCurrencyFormatter(row.quote.USD.volume_24h)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {percentFormatter.format(row.quote.USD.percent_change_1h / 100)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {percentFormatter.format(row.quote.USD.percent_change_24h / 100)}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                        {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colSpan={headers.length} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.container}>
                <TablePaginationActions
                 count={listings.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 onChangePage={handleChangePage}
                />
            </div>
        </React.Fragment>
    );
};
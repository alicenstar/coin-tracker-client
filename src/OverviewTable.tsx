import React from "react";
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    // TablePagination,
    TableRow,
    Theme,
    Typography,
    withStyles,
} from "@material-ui/core";
// import { TablePaginationActions } from './TablePaginationActions';
import { currencyFormatter, percentFormatter, largeCurrencyFormatter } from "./utils/Formatters";
import { useListingsContext } from './ListingsContext';


interface ITableProps {
    headers?: string[];
    data?: any;
}

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

const useStyles = makeStyles({
    container: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // maxHeight: 380,
    },
    footer: {
        float: 'right'
    },
});

export const OverviewTable: React.FC<ITableProps> = ({
    headers,
    data
}: ITableProps) => {
    const { listings } = useListingsContext()!;
    const classes = useStyles();
    // const [ page, setPage ] = React.useState(0);
    // const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, listings.length - page * rowsPerPage);
    
    // const handleChangePage = (
    //     event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number
    // ) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    return (
        <>
        <TableContainer className={classes.container}>
            <Table size="small" aria-label="a dense table">
                {headers && (
                    <TableHead>
                        <TableRow>
                            {headers.map((header: string, index: number) => {
                                if (index === 1) {
                                    return (
                                        <StickyTableCell key={index}>
                                            {header}
                                        </StickyTableCell>
                                    );
                                } else {
                                    return (
                                        <TableCell key={index}>
                                            {header}
                                        </TableCell>
                                    );
                                }
                            })}
                        </TableRow>
                    </TableHead>
                )}
                <TableBody>
                    {/* {(rowsPerPage > 0
                        ? listings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : listings */}
                    {listings.map((row: any) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {row.cmc_rank}
                            </TableCell>
                            <StickyTableCell>
                                <Typography variant="subtitle2">{row.symbol}</Typography>
                                <Typography variant="caption">{row.name}</Typography>
                            </StickyTableCell>
                            <TableCell>
                                {currencyFormatter.format(row.quote.USD.price)}
                            </TableCell>
                            <TableCell>
                                {largeCurrencyFormatter(row.quote.USD.market_cap)}
                            </TableCell>
                            <TableCell>
                                {largeCurrencyFormatter(row.quote.USD.volume_24h)}
                            </TableCell>
                            <TableCell>
                                {percentFormatter.format(row.quote.USD.percent_change_1h / 100)}
                            </TableCell>
                            <TableCell>
                                {percentFormatter.format(row.quote.USD.percent_change_24h / 100)}
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )} */}
                </TableBody>
            </Table>
        </TableContainer>
        {/* <div className={classes.container}>
            <TablePagination
             className={classes.footer}
             rowsPerPageOptions={[
                5,
                10,
                25,
                { label: 'All', value: -1 }
             ]}
             colSpan={4}
             count={listings.length}
             rowsPerPage={rowsPerPage}
             page={page}
             SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
             }}
             onChangePage={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
             ActionsComponent={TablePaginationActions}
            />
        </div> */}
        </>
    );
};
import React from "react";
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@material-ui/core";
import { TablePaginationActions } from './TablePaginationActions';
import { currencyFormatter, percentFormatter } from "./utils/Formatters";
import { useListingsContext } from './ListingsContext';


interface ITableProps {
    headers?: string[];
    data?: any;
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const OverviewTable: React.FC<ITableProps> = ({
    headers,
    data
}: ITableProps) => {
    const { listings } = useListingsContext()!;
    const classes = useStyles();
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, listings.length - page * rowsPerPage);
    
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                {headers && (
                    <TableHead>
                        <TableRow>
                            {headers.map((header: string, index: number) => (
                                <TableCell key={index}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                )}
                
                <TableBody>
                    {(rowsPerPage > 0
                        ? listings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : listings
                    ).map((row: any) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {row.name}
                            </TableCell>
                            <TableCell>
                                {row.symbol}
                            </TableCell>
                            <TableCell>
                                {currencyFormatter.format(row.quote.USD.price)}
                            </TableCell>
                            <TableCell>
                                {percentFormatter.format(row.quote.USD.percent_change_1h)}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
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
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};
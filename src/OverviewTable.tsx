import React from "react";
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { currencyFormatter, percentFormatter } from "./Formatters";


interface ITableProps {
    data: any;
    headers?: string[];
    title?: string;
}


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export const OverviewTable: React.FC<ITableProps> = ({
    data,
    headers,
    title
}: ITableProps) => {
    const classes = useStyles();
  
    return (
        <TableContainer component={Paper}>
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
                    {data.map((coin: any) => (
                        <TableRow key={coin.id}>
                            <TableCell>
                                {coin.name}
                            </TableCell>
                            <TableCell>
                                {coin.symbol}
                            </TableCell>
                            <TableCell>
                                {currencyFormatter.format(coin.quote.USD.price)}
                            </TableCell>
                            <TableCell>
                                {percentFormatter.format(coin.quote.USD.percent_change_1h)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
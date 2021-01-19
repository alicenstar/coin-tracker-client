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

export const HoldingsTable: React.FC<ITableProps> = ({
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
                    {data.map((holding: any) => (
                        <TableRow key={holding.coinId}>
                            <TableCell>
                                {holding.coinId}
                            </TableCell>
                            <TableCell>
                                {holding.quantity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
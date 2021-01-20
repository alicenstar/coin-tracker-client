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
    const [ state, setState ] = React.useState({
        loaded: false,
        tableData: []
    });
    const classes = useStyles();
    
    React.useEffect(() => {
        const fetchHoldingsData = async () => {
            const coinIds = data.map((coin: any) => coin.coinId);
            const queryString = coinIds.join();
            const response = await fetch(`http://localhost:5000/api/cmc/quotes/${queryString}`, {
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const json = await response.json();
            // Combine holdings data and CMC quote data
            const newData = data.map((chunk: any) => ({ holding: chunk, quote: json.json.data[chunk.coinId] }));
            setState({
                loaded: true,
                tableData: newData
            });
        };
        fetchHoldingsData();
    }, []);

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
                    {state.tableData.map((row: any) => (
                        <TableRow key={row.holding.coinId}>
                            <TableCell>
                                {row.quote.name}
                            </TableCell>
                            <TableCell>
                                {currencyFormatter.format(row.quote.quote.USD.price)}
                            </TableCell>
                            <TableCell>
                                {row.quote.quote.USD.percent_change_1h > 0
                                    ? percentFormatter.format(row.quote.quote.USD.percent_change_1h)
                                    : percentFormatter.format(row.quote.quote.USD.percent_change_1h)
                                }
                            </TableCell>
                            <TableCell>
                                {row.holding.quantity}
                            </TableCell>
                            <TableCell>
                                {currencyFormatter.format(row.holding.quantity * row.quote.quote.USD.price)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
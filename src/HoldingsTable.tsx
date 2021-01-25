import React from "react";
import {
    Button,
    ClickAwayListener,
    IconButton,
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
import { MuiTextField } from "./MuiTextField";
import { useForm } from "react-hook-form";
import EditIcon from '@material-ui/icons/Edit';
import { IHolding, IQuoteData } from "./types/types";


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

export const useInterval = (callback: any, delay: any) => {
    const savedCallback = React.useRef<any>();
  
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

interface TableFormData {
    quantity: number;
}

interface ITableData {
    holding: IHolding;
    quote: IQuoteData;
}

interface IState {
    loaded: boolean;
    tableData: ITableData[];
}

interface IHoldingUpdate {
    quantity: number;
    priceAtTransaction: number;
}

interface ITransactionData extends IHoldingUpdate {
    coinId: number;
    type: 'Buy' | 'Sell' | 'Adjustment';
    trackerId: string;
}


export const HoldingsTable: React.FC<ITableProps> = ({
    data,
    headers,
    title
}: ITableProps) => {
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<TableFormData>({ criteriaMode: 'all' });
    const [ state, setState ] = React.useState<IState>({
        loaded: false,
        tableData: [],
    });
    const [ editActive, setEditActive ] = React.useState<boolean>(false);
    const [ activeHolding, setActiveHolding ] = React.useState<string | undefined>(undefined);
    const [ quantity, setQuantity ] = React.useState<number | undefined>(undefined);
    const classes = useStyles();
    const coinIds = data.map((coin: any) => coin.coinId);
    const queryString = coinIds.join();
    
    const fetchHoldingsData = React.useCallback(async () => {
        if (queryString) {
            const response = await fetch(`http://localhost:5000/api/cmc/quotes/${queryString}`, {
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const json = await response.json();
            // Combine holdings data and CMC quote data
            const newData: ITableData[] = data.map((chunk: any) => ({
                holding: chunk,
                quote: json.json.data[chunk.coinId]
            }));
            setState({
                loaded: true,
                tableData: newData
            });
        }
    }, [data, queryString]);

    React.useEffect(() => {
        fetchHoldingsData();
    }, [fetchHoldingsData]);

    useInterval(() => {
        fetchHoldingsData();
    }, 30000);

    const onSubmit = async (data: any) => {
        setEditActive(false);
        const quantityEditDiff = data.newQuantity - quantity!;
        console.log(quantityEditDiff);
        // Check if entered quantity is different than previous quantity
        if (quantityEditDiff !== 0) {
            const holdingMatch: any = state.tableData.find((data: any) =>
                data.holding._id === activeHolding
            );
            const matchIndex: number = state.tableData.indexOf(holdingMatch);
            const transactionBody: ITransactionData = {
                quantity: quantityEditDiff,
                priceAtTransaction: holdingMatch.quote.quote.USD.price,
                coinId: holdingMatch.holding.coinId,
                type: 'Adjustment',
                trackerId: holdingMatch.holding.tracker
            };
            const holdingBody: IHoldingUpdate = {
                quantity: quantityEditDiff,
                priceAtTransaction: transactionBody.priceAtTransaction
            };
            await fetch(`http://localhost:5000/api/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(transactionBody),
            });
            // update holding value
            await fetch(`http://localhost:5000/api/holdings/${activeHolding}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(holdingBody),
            });
            setState(prevState => {
                let newState = { ...prevState };
                newState.tableData[matchIndex].holding.quantity = data.newQuantity;
                return newState;
            });
        }
        setQuantity(undefined);
        setActiveHolding(undefined);
    };

    const handleEditClick = (e: any) => {
        setEditActive(true);
        const targetElement = e.target.closest('button[data-quantity]');
        const quantityValue = targetElement.getAttribute('data-quantity');
        const holdingId = targetElement.getAttribute('data-holding')
        setQuantity(quantityValue);
        setActiveHolding(holdingId);
    };

    const handleClickAway = () => {
        setEditActive(false);
        setQuantity(undefined);
        setActiveHolding(undefined);
    }

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
                                    ? percentFormatter.format(row.quote.quote.USD.percent_change_1h / 100)
                                    : percentFormatter.format(row.quote.quote.USD.percent_change_1h / 100)
                                }
                            </TableCell>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <TableCell>
                                    {editActive && activeHolding === row.holding._id
                                        ? (
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <MuiTextField
                                                    helperText=""
                                                    name="newQuantity"
                                                    label="Edit quantity"
                                                    control={control}
                                                    defaultValue={row.holding.quantity}
                                                    rules={{
                                                        pattern: {
                                                            value: /^\d*?\.?\d*$/,
                                                            message: 'Wrong number format'
                                                        },
                                                        required: 'This field is required',
                                                        min: {
                                                            value: 0,
                                                            message: 'You must enter a value greater than 0'
                                                        },
                                                        valueAsNumber: true,
                                                    }}
                                                    errors={errors}
                                                />
                                                <Button type='submit'>Save</Button>
                                            </form>
                                        )
                                        : (
                                            <React.Fragment>
                                                {row.holding.quantity}
                                                <IconButton
                                                    data-quantity={row.holding.quantity}
                                                    data-holding={row.holding._id}
                                                    onClick={handleEditClick}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </React.Fragment>
                                        )
                                    }
                                </TableCell>
                            </ClickAwayListener>
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
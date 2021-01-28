import React from "react";
import {
    Button,
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
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { currencyFormatter, percentFormatter } from "./utils/Formatters";
import { MuiTextField } from "./MuiTextField";
import { useForm } from "react-hook-form";
import EditIcon from '@material-ui/icons/Edit';
import { IHolding, IListing } from "./types/types";
import { useListingsContext } from "./LatestListingsContext";
import { useTrackerContext } from "./TrackerContext";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface TableFormData {
    newQuantity: string;
}

interface IHoldingUpdate {
    quantity: string;
    priceAtTransaction: string;
}

interface ITransactionData extends IHoldingUpdate {
    coinId: number;
    type: 'Buy' | 'Sell' | 'Adjustment';
    trackerId: string;
}

interface ITableProps {
    headers?: string[];
}

export const HoldingsTable: React.FC<ITableProps> = ({
    headers,
}: ITableProps) => {
    const { listings } = useListingsContext()!;
    const { tracker, setTracker } = useTrackerContext()!;
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<TableFormData>({ criteriaMode: 'all' });
    const [ editActive, setEditActive ] = React.useState<boolean>(false);
    const [ activeHolding, setActiveHolding ] = React.useState<string | undefined>(undefined);
    const [ quantity, setQuantity ] = React.useState<string | undefined>(undefined);
    const classes = useStyles();

    const onSubmit = async (data: TableFormData) => {
        setEditActive(false);
        console.log('new quantity', (parseFloat(data.newQuantity) * 100000000) / 100000000);
        console.log('old quantity', (parseFloat(quantity!) * 100000000) / 100000000);
        const quantityEditDiff = (parseFloat(data.newQuantity) * 100000000 - parseFloat(quantity!) * 100000000) / 100000000;
        // Check if entered quantity is different than previous quantity
        if (quantityEditDiff !== 0) {
            const holdingMatch: IHolding | undefined = tracker!.holdings.find((holding: any) =>
                holding._id === activeHolding
            );
            const listingMatch: IListing | undefined = listings.find(listing => listing.id === holdingMatch!.coinId);
            const transactionBody: ITransactionData = {
                quantity: quantityEditDiff.toString(),
                priceAtTransaction: listingMatch!.quote.USD.price.toString(),
                coinId: holdingMatch!.coinId,
                type: 'Adjustment',
                trackerId: tracker!._id
            };
            const holdingBody: IHoldingUpdate = {
                quantity: quantityEditDiff.toString(),
                priceAtTransaction: transactionBody.priceAtTransaction
            };
            // add new adjustment transaction
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
            // update tracker
            const trackerResponse = await fetch(`http://localhost:5000/api/trackers/${tracker!._id}`);
            const trackerJson = await trackerResponse.json();
            setTracker(trackerJson.tracker);
        }
        setQuantity(undefined);
        setActiveHolding(undefined);
    };

    const handleEditClick = (e: any) => {
        const targetElement = e.target.closest('button[data-quantity]');
        const quantityValue = targetElement.getAttribute('data-quantity');
        const holdingId = targetElement.getAttribute('data-holding');
        setQuantity(quantityValue);
        setActiveHolding(holdingId);
        setEditActive(true);
    };

    const handleClickAway = () => {
        setEditActive(false);
        setQuantity(undefined);
        setActiveHolding(undefined);
    };

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
                    {tracker!.holdings.map((holding: IHolding) => {
                        const listingMatch: IListing | undefined = listings.find(listing => listing.id === holding.coinId);
                        return (
                            <TableRow key={holding.coinId}>
                                <TableCell>
                                    {listingMatch!.name}
                                </TableCell>
                                <TableCell>
                                    {currencyFormatter.format(listingMatch!.quote.USD.price)}
                                </TableCell>
                                <TableCell>
                                    {listingMatch!.quote.USD.percent_change_1h > 0
                                        ? percentFormatter.format(listingMatch!.quote.USD.percent_change_1h / 100)
                                        : percentFormatter.format(listingMatch!.quote.USD.percent_change_1h / 100)
                                    }
                                </TableCell>
                                
                                    <TableCell>
                                        {editActive && activeHolding === holding._id
                                            ? (
                                                <ClickAwayListener onClickAway={handleClickAway}>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <MuiTextField
                                                            helperText=""
                                                            name="newQuantity"
                                                            label="Edit quantity"
                                                            control={control}
                                                            defaultValue={holding.quantity.toString()}
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
                                                            }}
                                                            errors={errors}
                                                        />
                                                        <Button type='submit'>Save</Button>
                                                    </form>
                                                </ClickAwayListener>
                                            ) : (
                                                    <>
                                                        {parseFloat(holding.quantity)}
                                                        <IconButton
                                                            data-quantity={holding.quantity}
                                                            data-holding={holding._id}
                                                            onClick={handleEditClick}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </>
                                            )
                                        }
                                    </TableCell>
                                <TableCell>
                                    {currencyFormatter.format(parseFloat(holding.quantity) * listingMatch!.quote.USD.price)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
import React from "react";
import {
    Box,
    Button,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
    withStyles
} from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { currencyFormatter, percentFormatter } from "./utils/Formatters";
import { MuiTextField } from "./MuiTextField";
import { useForm } from "react-hook-form";
import EditIcon from '@material-ui/icons/Edit';
import { IHolding, IListing } from "./types/types";
import { useListingsContext } from "./ListingsContext";
import { useTrackerContext } from "./TrackerContext";


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
    icon: {
        padding: 8
    },
    editCell: {
        width: 200,
    },
    quantity: {
        width: 60
    },
    noMargin: {
        marginTop: -8,
        marginBottom: -4
    }
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
    data: any;
}

export const HoldingsTable: React.FC<ITableProps> = ({
    headers,
    data
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
        <TableContainer className={classes.container}>
            <Table size="small" aria-label="a dense table">
                {headers && (
                    <TableHead>
                        <TableRow>
                            {headers.map((header: string, index: number) => {
                                if (index === 0) {
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
                    {data.map((row: any) => {
                        return (
                            <TableRow key={row.id}>
                                <StickyTableCell>
                                    {row.listing.name} ({row.listing.symbol})
                                </StickyTableCell>
                                <TableCell>
                                    {currencyFormatter.format(row.listing.quote.USD.price)}
                                </TableCell>
                                <TableCell>
                                    {percentFormatter.format(row.listing.quote.USD.percent_change_1h / 100)}
                                </TableCell>
                                <TableCell>
                                {percentFormatter.format(row.listing.quote.USD.percent_change_24h / 100)}
                                </TableCell>
                                <TableCell align="right" className={classes.editCell}>
                                    {editActive && activeHolding === row.id
                                        ? (
                                            <ClickAwayListener onClickAway={handleClickAway}>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                                                    <Box className={classes.noMargin}>
                                                    <MuiTextField
                                                     width={90}
                                                     helperText=""
                                                     name="newQuantity"
                                                     control={control}
                                                     defaultValue={row.quantity.toString()}
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
                                                    </Box>
                                                    <Box className={classes.noMargin}>
                                                    <Button
                                                     variant="outlined"
                                                     type='submit'>
                                                        Save
                                                    </Button>
                                                    </Box>
                                                    </Box>
                                                </form>
                                            </ClickAwayListener>
                                        ) : (
                                                <Box
                                                 display="flex"
                                                 alignItems="center"
                                                 justifyContent="flex-start"
                                                >
                                                    <Box className={classes.quantity}>
                                                        <Typography display="inline" variant="body1" align="right">
                                                            {row.quantity}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <IconButton
                                                         className={classes.icon}
                                                         data-quantity={row.quantity}
                                                         data-holding={row.id}
                                                         onClick={handleEditClick}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    <Typography component="span" variant="body1">
                                        {currencyFormatter.format(row.totalValue)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
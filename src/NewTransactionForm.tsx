import {
    Box,
    Button,
    MenuItem,
    Typography
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTrackerContext } from './TrackerContext';
import { IHolding, IListing } from './types/types';
import { MuiSelect } from './MuiSelect';
import { MuiTextField } from './MuiTextField';
import { useListingsContext } from './LatestListingsContext';


type TransactionFormData = {
    type: "Buy" | "Sell";
    coinId: number;
    quantity: string;
    priceAtTransaction: string;
    trackerId: string;
};

// interface IProps {
//     findTracker: () => void;
// }

export const NewTransactionForm: React.FC = (
//     {
//     findTracker
// }: IProps
) => {
    const { tracker, findTracker } = useTrackerContext()!;
    const { listings } = useListingsContext()!;
    const {
        control,
        handleSubmit,
        errors,
        formState,
        reset,
        getValues,
    } = useForm<TransactionFormData>({
        criteriaMode: 'all',
    });

    const validateForm = React.useCallback(async () => {
        const match = tracker!.holdings.find(holding => holding.coinId === getValues('coinId'));
        if (getValues('type') === 'Sell') {
            if (!match) {
                return 'Cannot sell a coin you do not own';
            } else if (Number(getValues('quantity')) > Number(match.quantity)) {
                return 'Cannot sell more than you own';
            }
        }
        return true;
    }, [getValues, tracker]);

    const symbols = listings.map((listing: IListing) => (
        {
            symbol: listing.symbol,
            id: listing.id
        }
    ));

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                type: 'Buy',
                coinId: symbols[0].id,
                quantity: undefined,
                priceAtTransaction: undefined
            });
        }
    }, [formState.isSubmitSuccessful, reset, symbols]);

    const onSubmit = async (data: TransactionFormData) => {
        data.trackerId = tracker!._id;
        // Check if user currently owns the submitted coin
        let holdingMatch: IHolding | undefined = tracker!.holdings.find((holding: IHolding) => {
            return holding.coinId === data.coinId;
        });

        // set priceAtTransaction to current market price if no user input provided
        if (data.priceAtTransaction === '') {
            const listingMatch = listings.find(listing => listing.id === data.coinId);
            data.priceAtTransaction = listingMatch!.quote.USD.price.toString();
        }
        
        if (holdingMatch && data.type === 'Buy') {
            // If user already own the coin, update their shares
            await fetch(`http://localhost:5000/api/holdings/${holdingMatch._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        } else if (!holdingMatch && data.type === 'Buy') {
            console.log('data new holding', data)
            // If user does not own the coin, create a new holding
            await fetch(`http://localhost:5000/api/holdings/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        } else if (holdingMatch && data.type === 'Sell') {
            if (Number(data.quantity) > Number(holdingMatch.quantity)) {
                return;
            } else if (Number(data.quantity) === Number(holdingMatch.quantity)) {
                // delete holding
                await fetch(`http://localhost:5000/api/holdings/${holdingMatch._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
            } else {
                // update holding
                // change quantity to negative number
                data.quantity = '-' + data.quantity;
                await fetch(`http://localhost:5000/api/holdings/${holdingMatch._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
            }
        } else if (!holdingMatch && data.type === 'Sell') {
            return;
        }
        // Check to see if a transaction should be created
        if (data.type === 'Buy' || (
            holdingMatch && data.type === 'Sell' && data.quantity <= holdingMatch.quantity
        )) {
            console.log('data', data)
            // create transaction
            await fetch(`http://localhost:5000/api/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        }
        findTracker();
    };

    return (
        <Box bgcolor="info.main">
            <Typography variant='h6'>New Transaction</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MuiSelect
                 name="type"
                 label="Transaction type"
                 control={control}
                 defaultValue='Buy'
                 rules={{ required: true, validate: validateForm }}
                >
                    <MenuItem key='Buy' value='Buy'>Buy</MenuItem>
                    <MenuItem key='Sell' value='Sell'>Sell</MenuItem>
                </MuiSelect>
                <MuiSelect
                 name="coinId"
                 label="Coin to Buy/Sell"
                 control={control}
                 defaultValue={symbols[0].id}
                 rules={{ required: true, validate: validateForm }}
                >
                    {symbols.map((coin) => (
                        <MenuItem key={coin.id} value={coin.id}>{coin.symbol}</MenuItem>
                    ))}
                </MuiSelect>
                <MuiTextField
                 helperText=""
                 name="quantity"
                 label="Quantity to Buy/Sell"
                 control={control}
                 defaultValue=''
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
                    validate: validateForm
                 }}
                 errors={errors}
                />
                <MuiTextField
                 helperText="If no value is provided, current market price will be used"
                 name="priceAtTransaction"
                 label="Price at time of transaction"
                 control={control}
                 defaultValue=''
                 rules={{
                    min: {
                        value: 0,
                        message: 'You must enter a value greater than 0'
                    },
                    pattern: {
                        value: /^\d*?\.?\d*$/,
                        message: 'Wrong number format'
                    }
                 }}
                 errors={errors}
                />
                <Button type="submit">Add Transaction</Button>
                {formState.isSubmitted &&
                    (formState.isSubmitSuccessful
                        ? 'Form submitted successfully'
                        : 'Submit failed')
                }
            </form>
        </Box>
    );
};
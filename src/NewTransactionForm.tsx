import {
    Button,
    Grid,
    InputAdornment,
    makeStyles,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTrackerContext } from './TrackerContext';
import { IHolding, IListing } from './types/types';
import { MuiSelect } from './MuiSelect';
import { MuiTextField } from './MuiTextField';
import { useListingsContext } from './ListingsContext';


type TransactionFormData = {
    type: "Buy" | "Sell";
    coinId: number;
    quantity: string;
    priceAtTransaction: string;
    trackerId: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
    },
    button: {
        margin: 8
    },
    header: {
        padding: 8
    },
}));

type Symbol = {
    symbol: string;
    id: number;
}

export const NewTransactionForm: React.FC = () => {
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
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });
    const classes = useStyles();

    const validateForm = React.useCallback(async () => {
        const match = tracker!.holdings.find(holding => holding.coinId === getValues('coinId'));
        if (getValues('type') === 'Sell') {
            if (!match) {
                return 'Cannot sell a coin you do not own';
            } else if (parseFloat(getValues('quantity')) > parseFloat(match.quantity)) {
                return 'Cannot sell more than you own';
            }
        }
        return true;
    }, [getValues, tracker]);

    const symbols: Symbol[] = listings!.map((listing: IListing) => (
        {
            symbol: listing.symbol,
            id: listing.id
        }
    ));

    const menuProps = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
        },
        getContentAnchorEl: null,
    }
    
    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                type: 'Buy',
                coinId: symbols[0].id,
                quantity: '',
                priceAtTransaction: ''
            });
        }
    }, [formState.isSubmitSuccessful, reset, symbols]);

    const onSubmit = async (data: TransactionFormData) => {
        data.priceAtTransaction = data.priceAtTransaction.trim();
        data.quantity = data.quantity.trim();
        console.log(data)
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
            await fetch(`https://backend-cointracker-dev.herokuapp.com/api/holdings/${holdingMatch._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        } else if (!holdingMatch && data.type === 'Buy') {
            // If user does not own the coin, create a new holding
            await fetch(`https://backend-cointracker-dev.herokuapp.com/api/holdings/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        } else if (holdingMatch && data.type === 'Sell') {
            if (parseFloat(data.quantity) > parseFloat(holdingMatch.quantity)) {
                return;
            } else if (parseFloat(data.quantity) === parseFloat(holdingMatch.quantity)) {
                // delete holding
                await fetch(`https://backend-cointracker-dev.herokuapp.com/api/holdings/${holdingMatch._id}`, {
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
                await fetch(`https://backend-cointracker-dev.herokuapp.com/api/holdings/${holdingMatch._id}`, {
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
            // create transaction
            await fetch(`https://backend-cointracker-dev.herokuapp.com/api/transactions/`, {
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
        <>
            <Typography
             className={classes.header}
             variant='h6'
             color="secondary"
            >
                New Transaction
            </Typography>
            <Grid container alignItems="center">
                <form
                 style={{width: '100%'}}
                 className={classes.root}
                 onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container item justify="space-between">
                        <Grid item>
                            <MuiSelect
                             name="type"
                             label="Type *"
                             control={control}
                             defaultValue='Buy'
                             rules={{ required: true, validate: validateForm }}
                             menuProps={menuProps}
                            >
                                <MenuItem key='Buy' value='Buy'>
                                    Buy
                                </MenuItem>
                                <MenuItem key='Sell' value='Sell'>
                                    Sell
                                </MenuItem>
                            </MuiSelect>
                        </Grid>
                        <Grid item>
                            <MuiTextField
                             name="quantity"
                             label="Quantity"
                             control={control}
                             defaultValue=''
                             required={true}
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
                        </Grid>
                        {symbols.length > 0 && (
                            <Grid item>
                                <MuiSelect
                                 name="coinId"
                                 label="Coin *"
                                 control={control}
                                 defaultValue={symbols[0].id}
                                 rules={{ required: true, validate: validateForm }}
                                 menuProps={menuProps}
                                >
                                    {symbols.map((coin) => (
                                        <MenuItem
                                         key={coin.id}
                                         value={coin.id}
                                        >
                                            {coin.symbol}
                                        </MenuItem>
                                    ))}
                                </MuiSelect>
                            </Grid>
                        )}
                        <Grid item>
                            <MuiTextField
                             inputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                             }}
                             helperText="If blank, current market price will be used"
                             name="priceAtTransaction"
                             label="Price"
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
                        </Grid>
                        <Grid item>
                            <Button
                             className={classes.button}
                             type="submit"
                             color="secondary"
                             variant="outlined"
                            >
                                Add Transaction
                            </Button>
                            {formState.isSubmitted &&
                                (formState.isSubmitSuccessful
                                    ? 'Form submitted successfully'
                                    : 'Submit failed')
                            }
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};
import {
    Box,
    Button,
    FormGroup,
    MenuItem
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SymbolsDropdown } from './Dashboard';
import { useTrackerContext } from './TrackerContext';
import { IHolding } from './types/types';
import { MuiSelect } from './MuiSelect';
import { MuiTextField } from './MuiTextField';
import { ErrorMessage } from '@hookform/error-message';


type TransactionFormData = {
    type: "Buy" | "Sell";
    coinId: number;
    quantity: number;
    priceAtTransaction: number;
    trackerId: string;
};

interface IProps {
    symbols: SymbolsDropdown[];
    findTracker: () => void;
}

export const NewTransactionForm: React.FC<IProps> = ({
    symbols,
    findTracker
}: IProps) => {
    const { tracker } = useTrackerContext()!;
    const {
        control,
        handleSubmit,
        errors,
        setError,
        formState,
        reset
    } = useForm<TransactionFormData>({
        criteriaMode: 'all',
        mode: 'onChange'
    });

    const onSubmit = async (data: TransactionFormData) => {
        data.trackerId = tracker!._id;
        // Check if user currently owns the submitted coin
        let holdingMatch: IHolding | undefined = tracker!.holdings.find((holding: IHolding) => {
            return holding.coinId === data.coinId;
        });

        // set priceAtTransaction to current market price if no user input provided
        if (data.priceAtTransaction === 0) {
            const response = await fetch(`http://localhost:5000/api/cmc/quotes/${data.coinId}`, {
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const json = await response.json();
            data.priceAtTransaction = json.json.data[data.coinId].quote.USD.price;
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
        } else if (holdingMatch === undefined && data.type === 'Buy') {
            // If user does not own the coin, create a new holding
            await fetch(`http://localhost:5000/api/holdings/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        } else if (holdingMatch && data.type === 'Sell') {
            if (data.quantity > holdingMatch.quantity) {
                setError('quantity', {
                    type: 'manual',
                    message: 'Cannot sell more than you own'
                });
            } else if (data.quantity === holdingMatch.quantity) {
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
                await fetch(`http://localhost:5000/api/holdings/${holdingMatch._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
            }
        } else if (!holdingMatch && data.type === 'Sell') {
            setError('coinId', {
                type: 'manual',
                message: 'Cannot sell a coin you do not own'
            });
        }

        // Check to see if a transaction should be created
        if (data.type === 'Buy' || (
            holdingMatch && data.type === 'Sell' && data.quantity >= holdingMatch.quantity
        )) {
            // create transaction
            await fetch(`http://localhost:5000/api/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        }
        reset();
        findTracker();
    };

    return (
        <Box bgcolor="info.main">
            <h3 id="new-transaction-form-header">New Transaction</h3>
            <div id="new-transaction-container">
                <FormGroup>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MuiSelect 
                         name="type"
                         label="Transaction type"
                         control={control}
                         defaultValue='Buy'
                         rules={{ required: true }}
                        >
                            <MenuItem key='Buy' value='Buy'>Buy</MenuItem>
                            <MenuItem key='Sell' value='Sell'>Sell</MenuItem>
                        </MuiSelect>
                        <MuiSelect 
                         name="coinId"
                         label="Coin to Buy/Sell"
                         control={control}
                         defaultValue={symbols[0].id}
                         rules={{ required: true }}
                        >
                            {symbols.map((coin) => (
                                <MenuItem key={coin.id} value={coin.id}>{coin.symbol}</MenuItem>
                            ))}
                        </MuiSelect>
                        <MuiTextField
                         name="quantity"
                         label="Quantity to Buy/Sell"
                         control={control}
                         defaultValue=''
                         rules={{
                            required: true,
                            min: 0,
                            valueAsNumber: true,
                            pattern: /^\d*?\.?\d*$/
                         }}
                        />
                        <MuiTextField
                         name="priceAtTransaction"
                         label="Price at time of transaction"
                         control={control}
                         defaultValue=''
                         rules={{
                            min: 0,
                            valueAsNumber: true,
                            pattern: /^\d*?\.?\d*$/
                         }}
                        />
                        <Button type="submit">Add Transaction</Button>
                        <ErrorMessage
                         errors={errors}
                         name='quantity'
                         render={({ message }) => <p>{message}</p>}
                        />
                        {formState.isSubmitted && 'Form is submitted'}
                    </form>
                </FormGroup>
            </div>
        </Box>
    );
};
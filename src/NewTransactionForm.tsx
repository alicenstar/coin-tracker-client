import { Box, FormGroup } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SymbolsDropdown } from './Dashboard';
import { useTrackerContext } from './TrackerContext';
import { IHolding } from './types/types';


type TransactionFormData = {
    type: "Buy" | "Sell";
    coinId: string;
    quantity: number;
    priceAtTransaction: number;
    trackerId: string;
};

type Props = {
    symbols: SymbolsDropdown[];
    findTracker: () => void;
}

export const NewTransactionForm: React.FC<Props> = ({
    symbols,
    findTracker
}: Props) => {
    const { tracker, setTracker } = useTrackerContext()!;
    const {
        register,
        handleSubmit,
        errors,
        setError,
        formState,
        reset
    } = useForm<TransactionFormData>();

    const onSubmit = async (data: TransactionFormData) => {
        data.trackerId = tracker!._id;
        // Check if user currently owns the submitted coin
        let holdingMatch: IHolding | undefined = tracker!.holdings.find((holding: IHolding) => {
            return Number(holding.coinId) === Number(data.coinId);
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
                <FormGroup row>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="type">Transaction type</label>
                            <select
                             name="type"
                             ref={register({ required: true })}
                             disabled={formState.isSubmitting}
                            >
                                <option value="Buy">Buy</option>
                                <option value="Sell">Sell</option>
                            </select>
                            {errors.type && errors.type.type === "required" && (
                                <div className="error">You must choose a transaction type</div>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="coinId">Coin to buy/sell</label>
                            <select
                             name="coinId"
                             placeholder="Select Coin"
                             ref={register({
                                 required: {
                                     value: true,
                                     message: 'You must choose a coin'
                                 }
                                })}
                             disabled={formState.isSubmitting}
                            >
                                {symbols.map((coin) => (
                                    <option key={coin.id} value={coin.id}>{coin.symbol}</option>
                                ))}
                            </select>
                            {errors.coinId && errors.coinId.type === "required" && (
                                <div className="error">You must choose a coin for your transaction</div>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="quantity">Quantity to buy/sell</label>
                            <input
                             type="text"
                             name="quantity"
                             placeholder="Transaction Amount"
                             ref={register({
                                required: true,
                                min: 0,
                                valueAsNumber: true,
                                pattern: /^\d*?\.?\d*$/
                             })}
                             disabled={formState.isSubmitting}
                            />
                            {errors.quantity && (<div className="error">{errors.quantity.message}</div>)}
                        </div>
                        <div className="field">
                            <label htmlFor="priceAtTransaction">Price at time of transaction</label>
                            <input
                             type="text"
                             name="priceAtTransaction"
                             ref={register({
                                min: 0,
                                valueAsNumber: true,
                                pattern: /^\d*?\.?\d*$/
                             })}
                             disabled={formState.isSubmitting}
                            />
                            {errors.priceAtTransaction && (
                                <div className="error">{errors.priceAtTransaction.message}</div>
                            )}
                        </div>
                        <button type="submit">Add Transaction</button>
                        {formState.isSubmitted && 'Form is submitted'}
                    </form>
                </FormGroup>
            </div>
        </Box>
    );
};
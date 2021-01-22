import { Box, FormGroup } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SymbolDropdown } from './Dashboard';
import { returnedTracker } from './NewTrackerForm';
import { IHolding } from './NewTrackerForm';

type TransactionFormData = {
    type: "Buy" | "Sell";
    coinId: string;
    quantity: number;
    priceAtPurchase: number;
    trackerId: string;
};

type Props = {
    symbols: SymbolDropdown[];
    tracker: returnedTracker;
    findTracker: () => void;
}

type Json = {
    holding: IHolding;
    transaction: Transaction;
}

export type Transaction = {
    _id: string;
    coinId: string;
    quantity: number;
    priceAtPurchase: number;
    type: 'Buy' | 'Sell' | 'Adjustment';
    tracker: string;
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}

export const NewTransactionForm: React.FC<Props> = ({
    symbols,
    tracker,
    findTracker
}: Props) => {
    const {
        register,
        handleSubmit,
        errors,
        setError,
        formState,
        reset
    } = useForm<TransactionFormData>();

    const onSubmit = async (data: TransactionFormData) => {
        console.log("submit start", data);

        let submitSuccess = false;
        let json: Json;
        data.trackerId = tracker._id;
        const holdingMatch: IHolding | undefined = tracker.holdings.find((holding: IHolding) => {
            return holding.coinId === data.coinId;
        });

        if (!data.priceAtPurchase) {
            // set priceAtPurchase to current market price
            const response = await fetch(`http://localhost:5000/api/cmc/quotes/${data.coinId}`, {
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const json = await response.json();
            data.priceAtPurchase = json[0].quote.USD.price;
        }

        if (data.type === 'Buy') {
            if (holdingMatch) {
                // update holding
                const response = await fetch(`http://localhost:5000/api/holdings/${holdingMatch._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
                json!.holding = await response.json();
            } else {
                // create holding
                const response = await fetch(`http://localhost:5000/api/holdings/`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
                json!.holding = await response.json();
            }
            // create transaction
            const response = await fetch(`http://localhost:5000/api/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            json!.transaction = await response.json();
        }

        if (data.type === 'Sell') {
            if (holdingMatch) {
                if (data.quantity > holdingMatch.quantity) {
                    setError('quantity', {
                        type: 'manual',
                        message: 'Cannot sell more than you own'
                    });
                } else if (data.quantity === holdingMatch.quantity) {
                    // send to delete endpoint
                    // create transaction
                } else {
                    // send to update endpoint
                    // create transaction
                }
            } else {
                setError('coinId', {
                    type: 'manual',
                    message: 'Cannot sell a coin you do not own'
                });
            }
        }

        // const response = await fetch('http://localhost:5000/api/holdings/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data),
        // });
        // const json = await response.json();
        // if (!response.ok) {
        //     if (json.message === 'Cannot sell more than you own') {
        //         setError('quantity', {
        //             type: 'server',
        //             message: 'Cannot sell more than you own'
        //         });
        //     }
        // } 
        if (submitSuccess) {
            reset();
            findTracker();
        }

        console.log("submit finished", json);
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
                            <label htmlFor="priceAtPurchase">Price at purchase</label>
                            <input
                             type="text"
                             name="priceAtPurchase"
                             ref={register({
                                min: 0,
                                valueAsNumber: true,
                                pattern: /^\d*?\.?\d*$/
                             })}
                             disabled={formState.isSubmitting}
                            />
                            {errors.priceAtPurchase && (
                                <div className="error">{errors.priceAtPurchase.message}</div>
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
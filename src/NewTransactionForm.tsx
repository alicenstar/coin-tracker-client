import { Box, FormGroup } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SymbolDropdown } from './Dashboard';

type TransactionFormData = {
    type: "Buy" | "Sell";
    coinId: number;
    quantity: number;
    trackerId: string;
};

type Props = {
    symbols: SymbolDropdown[];
    trackerId: string;
    findTracker: () => void;
}

export const NewTransactionForm: React.FC<Props> = ({
    symbols,
    trackerId,
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

        data['trackerId'] = trackerId;
        const response = await fetch('http://localhost:5000/api/holdings/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        if (!response.ok) {
            if (json.message === 'Cannot sell more than you own') {
                setError('quantity', {
                    type: 'server',
                    message: 'Cannot sell more than you own'
                });
            }
        } else {
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
                             ref={register({ required: true })}
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
                        {/* <div className="field">
                            <label htmlFor="newTrackerName">Currency to buy/sell in</label>
                            <select
                             name="new-transaction-currency"
                             ref={register({ required: true })}
                             disabled={formState.isSubmitting}
                            >
                                <option value="btc">BTC</option>
                                <option value="usd">USD</option>
                            </select>
                            {errors.currency && errors.currency.type === "required" && (
                                <div className="error">You must choose a currency to buy or sell in</div>
                            )}
                        </div> */}
                        <button type="submit">Add Transaction</button>
                        {formState.isSubmitted && 'Form is submitted'}
                    </form>
                </FormGroup>
            </div>
        </Box>
    );
};
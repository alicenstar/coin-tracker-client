import React from 'react';
import { useForm } from 'react-hook-form';
import { SymbolDropdown } from './Dashboard';

type NewTransaction = {
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
    const { register, handleSubmit, errors, formState, reset } = useForm<NewTransaction>();
    const onSubmit = async (data: NewTransaction) => {

        console.log("submit start", data);
        data['trackerId'] = trackerId;
        console.log('data appended', data);
        const response = await fetch('http://localhost:5000/api/holdings/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        
        // TODO: Add a way to display server side validation error messages

        console.log("submit finished", json);
        reset();
        findTracker();
    };

    return (
        <React.Fragment>
            <h3 id="new-transaction-form-header">New Transaction</h3>
            <div id="new-transaction-container">
                <div id="new-transaction-form">
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
                             ref={register({ required: true })}
                             disabled={formState.isSubmitting}
                            />
                            {errors.quantity && errors.quantity.type === "required" && (
                                <div className="error">You must enter a quantity for your transaction</div>
                            )}
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
                </div>
            </div>
        </React.Fragment>
    );
};
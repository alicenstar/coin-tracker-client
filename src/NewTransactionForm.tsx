import React from 'react';
import { useForm } from 'react-hook-form';

type NewTransaction = {
    type: "buy" | "sell";
    coin: string;
    amount: number;
    currency: string;
};

export const NewTransactionForm: React.FC = () => {
    const { register, handleSubmit, errors, formState } = useForm<NewTransaction>();
    const onSubmit = async (data: NewTransaction) => {

        console.log("submit start", data);

        const response = await fetch('http://localhost:5000/api/trackers/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        // setNewTracker(json.tracker);

        console.log("submit finished", json);
    }

    return (
        <React.Fragment>
            <h3 id="new-transaction-form-header">New Transaction</h3>
            <div id="new-transaction-container">
                <div id="new-transaction-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="newTransactionType">Transaction type</label>
                            <select
                             id="new-transaction-type"
                             name="new-transaction-type"
                             ref={register({ required: true })}
                             disabled={formState.isSubmitting}
                            >
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                            </select>
                            {errors.type && errors.type.type === "required" && (
                                <div className="error">You must choose 'buy' or 'sell'</div>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="newTrackerName">Coin to buy/sell</label>
                            <select
                             id="new-transaction-coin"
                             name="new-transaction-coin"
                             placeholder="Select Coin"
                             ref={register({ required: true })}
                             disabled={formState.isSubmitting}
                            >
                                <option value="btc">BTC</option>
                                <option value="eth">ETH</option>
                            </select>
                            {errors.coin && errors.coin.type === "required" && (
                                <div className="error">You must choose a coin to buy or sell</div>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="newTrackerName">Amount to buy/sell</label>
                            <input
                             type="text"
                             id="new-transaction-amount"
                             name="new-transaction-amount"
                             placeholder="Transaction Amount"
                             ref={register({ required: true })}
                             disabled={formState.isSubmitting}
                            />
                            {errors.amount && errors.amount.type === "required" && (
                                <div className="error">You must enter an amount to buy or sell</div>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="newTrackerName">Currency to buy/sell in</label>
                            <select
                             id="new-transaction-currency"
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
                        </div>
                        {/* {formState.isSubmitSuccessful && newTracker && (
                            <Redirect to={'/'} />
                        )} */}
                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};
import React from "react";
import { Field } from "./Field";
import { Form } from "./Form";


export const NewTransactionForm: React.FC = () => {

    return (
        <React.Fragment>
            <h3 id="new-transaction-form-header">+ New Transaction</h3>
            <div id="new-transaction-container">
                <div id="new-transaction-form">
                    <Form
                     action="https://jsonplaceholder.typicode.com/"
                     submitButtonText="Add Transaction"
                     render={() => (
                        <React.Fragment>
                            <Field
                             type="Text"
                             id="new-transaction-type"
                             options={[
                                "Buy",
                                "Sell"
                             ]}
                            />
                            <Field
                             type="Select"
                             id="new-transaction-coin"
                             placeholder="Select Coin"
                             options={[
                                "BTC",
                                "ETH"
                             ]}
                            />
                            <Field
                             type="Text"
                             id="new-transaction-amount"
                             placeholder="Transaction Amount"
                            />
                            <Field
                             type="Select"
                             id="new-transaction-currency"
                             options={[
                                "USD",
                                "BTC"
                             ]}
                            />
                        </React.Fragment>
                    )}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
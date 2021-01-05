import React from "react";
import { Form } from "./Form";
import { Field } from "./Field";


export const CreateNewTrackerForm: React.FC = () => {
    return (
        <Form
         action="https://jsonplaceholder.typicode.com/"
         submitButtonText="Create New Tracker"
         render={() => (
             <React.Fragment>
                <Field
                 type="Text"
                 id="new-tracker-name"
                 label="Enter a name for your tracker! (Optional)"
                 placeholder="My Coins"
                />
             </React.Fragment>
         )}
        />
    );
};
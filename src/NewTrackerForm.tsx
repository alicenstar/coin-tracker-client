import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

type NewTracker = {
    newTrackerName: string;
};

type returnedTracker = {
    _id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
    __v: any;
}

export const NewTrackerForm: React.FC = () => {
    const [ newTracker, setNewTracker ] = React.useState<returnedTracker | undefined>(undefined);
    const { register, handleSubmit, errors, formState } = useForm<NewTracker>();
    const onSubmit = async (data: NewTracker) => {

        console.log("submit start", data);

        const response = await fetch('http://localhost:5000/api/trackers/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        setNewTracker(json.tracker);

        console.log("submit finished", json);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label htmlFor="newTrackerName">Enter a name for your tracker</label>
                <input
                 type="text"
                 id="newTrackerName"
                 name="newTrackerName"
                 ref={register({ required: true })}
                 disabled={formState.isSubmitting}
                />
                {errors.newTrackerName && errors.newTrackerName.type === "required" && (
                    <div className="error">You must enter a name for your tracker</div>
                )}
            </div>
            {formState.isSubmitSuccessful && newTracker && (
                <Redirect to={'/' + newTracker._id} />
            )}
            <button type="submit">Create Tracker</button>
        </form>
    );
};
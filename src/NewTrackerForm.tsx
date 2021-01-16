import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { usePageContext } from './PageContext';

type NewTracker = {
    newTrackerName: string;
};

export type returnedTracker = {
    _id: string;
    name: string;
    owner?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}

interface IState {
    tracker: returnedTracker;
}

export const NewTrackerForm: React.FC = () => {
    const tracker = React.useRef<IState | null>(null);
    const { register, handleSubmit, errors, formState } = useForm<NewTracker>();
    const { setPageElement } = usePageContext()!;
    const history = useHistory();

    const onSubmit = async (data: NewTracker) => {

        // console.log("submit start", data);

        const response = await fetch('http://localhost:5000/api/trackers/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        tracker.current = json;

        // console.log("submit finished", tracker.current?.tracker._id);
        history.push(`/${tracker.current?.tracker._id}`);
        setPageElement('Portfolio');
    };

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
            {/* {formState.isSubmitSuccessful && tracker.current && (
                <Redirect to={`/${tracker.current.tracker._id}`} />
            )} */}
            <button type="submit">Create Tracker</button>
        </form>
    );
};
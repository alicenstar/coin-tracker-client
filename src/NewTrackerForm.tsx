import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { usePageContext } from './PageContext';
import { IHolding, ITracker } from './types/types';


type TrackerFormData = {
    trackerName: string;
};

interface IState {
    tracker: ITracker;
}

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const NewTrackerForm: React.FC<Props> = ({ open, setOpen }: Props) => {
    const tracker = React.useRef<IState | null>(null);
    const { register, handleSubmit, errors, formState } = useForm<TrackerFormData>();
    const { setPageElement } = usePageContext()!;
    const history = useHistory();

    const onSubmit = async (data: FormData) => {
        console.log("submit start", data);

        const response = await fetch('http://localhost:5000/api/trackers/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        tracker.current = json;
        history.push(`/${tracker.current?.tracker._id}`);
        setPageElement('Portfolio');
        setOpen(!open);

        console.log("submit finished", tracker.current?.tracker._id);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label htmlFor="trackerName">Tracker name</label>
                <input
                 type="text"
                 name="trackerName"
                 ref={register({ required: true })}
                 disabled={formState.isSubmitting}
                />
                {errors.trackerName && errors.trackerName.type === "required" && (
                    <div className="error">You must enter a name for your tracker</div>
                )}
            </div>
            <button type="submit">Create Tracker</button>
        </form>
    );
};
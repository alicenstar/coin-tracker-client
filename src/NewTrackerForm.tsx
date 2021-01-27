import {
    Button,
    DialogActions
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { MuiTextField } from './MuiTextField';
import { usePageContext } from './PageContext';
import { useTrackerContext } from './TrackerContext';


type TrackerFormData = {
    trackerName: string;
};

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const NewTrackerForm: React.FC<Props> = ({
    children,
    open,
    setOpen
}: Props) => {
    const { tracker, setTracker } = useTrackerContext()!;
    const {
        control,
        handleSubmit,
        errors,
        formState
    } = useForm<TrackerFormData>();
    const { setPageElement } = usePageContext()!;
    const history = useHistory();

    const onSubmit = async (data: FormData) => {
        const response = await fetch('http://localhost:5000/api/trackers/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        setTracker(json.tracker);
        setPageElement('Portfolio');
        setOpen(!open);
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful && tracker) {
            history.push(`/${tracker._id}`);
        }
    }, [history, formState.isSubmitSuccessful, tracker]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MuiTextField
             helperText=""
             name="trackerName"
             label="Tracker name"
             control={control}
             defaultValue=''
             rules={{
                required: 'This field is required',
             }}
             errors={errors}
            />
            <DialogActions>
                <Button type="submit">Create Tracker</Button>
                {children}
            </DialogActions>
        </form>
    );
};
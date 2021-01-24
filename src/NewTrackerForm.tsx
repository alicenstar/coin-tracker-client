import {
    Button,
    DialogActions
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { MuiTextField } from './MuiTextField';
import { usePageContext } from './PageContext';
import { ITracker } from './types/types';


type TrackerFormData = {
    trackerName: string;
};

interface IState {
    tracker: ITracker;
}

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const NewTrackerForm: React.FC<Props> = ({ children, open, setOpen }: Props) => {
    const tracker = React.useRef<IState | null>(null);
    const {
        control,
        handleSubmit,
        errors,
    } = useForm<TrackerFormData>();
    const { setPageElement } = usePageContext()!;
    const history = useHistory();

    const onSubmit = async (data: FormData) => {
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
    };

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
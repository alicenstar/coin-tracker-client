import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { MuiTextField } from "./MuiTextField";
import { usePageContext } from "./PageContext";
import { useTrackerContext } from "./TrackerContext";


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

type TrackerFormData = {
    trackerName: string;
    user?: string;
}

export const NewTracker: React.FC<Props> = ({
    open,
    setOpen
}: Props) => {
    const { tracker, setTracker } = useTrackerContext()!;
    const {
        control,
        handleSubmit,
        errors,
        formState
    } = useForm<TrackerFormData>({
        criteriaMode: 'all',
    });
    const { setPageElement } = usePageContext()!;
    const history = useHistory();

    const onSubmit = async (data: TrackerFormData) => {
        // if user logged in, associate user with tracker
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

    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create A Tracker</DialogTitle>
                <DialogContent>
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
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
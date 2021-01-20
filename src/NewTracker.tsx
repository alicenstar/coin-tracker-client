import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { NewTrackerForm } from './NewTrackerForm';


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const NewTracker: React.FC<Props> = ({ open, setOpen }: Props) => {
    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create A Tracker</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <NewTrackerForm open={open} setOpen={x => setOpen(x)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
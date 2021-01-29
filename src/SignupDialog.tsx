import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { SignupForm } from './SignupForm';


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const SignupDialog: React.FC<Props> = ({ open, setOpen }: Props) => {
    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title-signup-form">
                <DialogTitle id="dialog-title-signup-form">Sign Up</DialogTitle>
                <DialogContent>
                    <SignupForm open={open} setOpen={x => setOpen(x)}>
                        <Button onClick={handleClose}>Close</Button>
                    </SignupForm>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
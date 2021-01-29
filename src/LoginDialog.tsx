import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { LoginForm } from './LoginForm';


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const LoginDialog: React.FC<Props> = ({ open, setOpen }: Props) => {
    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title-login-form">
                <DialogTitle id="dialog-title-login-form">Login</DialogTitle>
                <DialogContent>
                    <LoginForm open={open} setOpen={x => setOpen(x)}>
                        <Button onClick={handleClose}>Close</Button>
                    </LoginForm>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
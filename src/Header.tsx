import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    makeStyles,
    SvgIcon,
    Theme,
    Tooltip,
    Typography
} from "@material-ui/core";
import React from "react";
import { useTrackerContext } from "./TrackerContext";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { useForm } from "react-hook-form";
import { MuiTextField } from "./MuiTextField";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CSVReader from "react-csv-reader";

const useStyles = makeStyles((theme: Theme) => ({
    buttons: {
        padding: 8
    },
    title: {
        paddingRight: 8
    }
}));

type UploadFormData = {
    file: any;
}

export const Header: React.FC = () => {
    const { tracker, findTracker } = useTrackerContext()!;
    const classes = useStyles();
    const [ open, setOpen ] = React.useState(false);
    const [ data, setData ] = React.useState([]);
    const [ disabled, setDisabled ] = React.useState(true);
    const {
        control,
        handleSubmit,
        errors,
        formState
    } = useForm<UploadFormData>({
        criteriaMode: 'all',
    });

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleDownloadClick = async () => {
        await fetch(`https://coin-tracker-api.herokuapp.com/api/trackers/download/${tracker!._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/csv',
            },
        })
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `tracker-${tracker!._id}.csv`,
            );
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            link.remove();
        });
    };

    const handleUploadClick = async () => {
        setOpen(true);
    };

    const handleLoaded = (data: any[]) => {
        setData(data as []);
        setDisabled(false);
    };

    const onUploadSubmit = async () => {
        const trimmedData = data.slice(1, -1);
        console.log(data.slice(1, -1));
        await fetch(`http://localhost:5000/api/trackers/upload/${tracker!._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trimmedData)
        });
        findTracker();
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Typography className={classes.title} variant="h6" color="primary">
                {tracker
                    ? '# ' + tracker!._id
                    : '< Create a tracker'
                }
            </Typography>
            {tracker && (
                <>
                    <Tooltip title="Copy URL">
                        <IconButton className={classes.buttons} onClick={handleCopyUrl}>
                            <SvgIcon children={
                                <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                </svg>
                            } />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download .csv">
                        <IconButton className={classes.buttons} onClick={handleDownloadClick}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Upload .csv">
                        <IconButton className={classes.buttons} onClick={handleUploadClick}>
                            <PublishIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
            <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload Your .csv File</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <ErrorOutlineIcon color="error" />
                        <Typography variant="subtitle1" color="error" display="inline">
                            This will override the current data associated with this tracker
                        </Typography>
                    </DialogContentText>
                        <CSVReader
                         onFileLoaded={handleLoaded}
                        />
                        {/* <MuiTextField
                        type="file"
                        helperText=""
                        name="csvFile"
                        label=".csv File"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'This field is required',
                        }}
                        errors={errors}
                        /> */}
                        <DialogActions>
                            <Button disabled={disabled} onClick={onUploadSubmit}>
                                Upload .csv
                            </Button>
                            <Button onClick={() => setOpen(!open)}>Close</Button>
                        </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
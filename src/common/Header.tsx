import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import React from "react";
import { useTrackerContext } from "../context/TrackerContext";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CSVReader from "react-csv-reader";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';


const useStyles = makeStyles((theme: Theme) => ({
    buttons: {
        padding: 8
    },
    title: {
        paddingRight: 8
    },
    headerIcons: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '32px'
        }
    }
}));

export const Header: React.FC = () => {
    const { tracker, findTracker } = useTrackerContext()!;
    const classes = useStyles();
    const [ open, setOpen ] = React.useState(false);
    const [ data, setData ] = React.useState([]);
    const [ disabled, setDisabled ] = React.useState(true);
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleDownloadClick = async () => {
        await fetch(`https://backend-cointracker-dev.herokuapp.com/api/trackers/download/${tracker!._id}`, {
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
        await fetch(`https://backend-cointracker-dev.herokuapp.com/api/trackers/upload/${tracker!._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trimmedData)
        });
        findTracker();
        setOpen(false);
    };

    // Shorten the header text on mobile
    let headerText = '';
    if (tracker) {
        if (smScreen) {
            headerText = '#' + tracker!._id.slice(0, 11) + '...';
        } else {
            headerText = '# ' + tracker!._id;
        }
    }

    return (
        <React.Fragment>
            <Typography
             className={classes.title}
             variant="h6"
             variantMapping={{ h6: "h1" }}
             color="primary"
            >
                {tracker && tracker
                    ? headerText
                    : '< Create a tracker'
                }
            </Typography>
            {tracker && (
                <React.Fragment>
                    <Tooltip title="Copy URL">
                        <IconButton
                         aria-label="Copy URL"
                         className={classes.buttons}
                         onClick={handleCopyUrl}
                        >
                            <FileCopyOutlinedIcon className={classes.headerIcons} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download .csv">
                        <IconButton
                         aria-label="Download .csv"
                         className={classes.buttons}
                         onClick={handleDownloadClick}
                        >
                            <GetAppIcon className={classes.headerIcons} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Upload .csv">
                        <IconButton
                         aria-label="Upload .csv"
                         className={classes.buttons}
                         onClick={handleUploadClick}
                        >
                            <PublishIcon className={classes.headerIcons} />
                        </IconButton>
                    </Tooltip>
                </React.Fragment>
            )}
            <Dialog
             open={open}
             onClose={() => setOpen(!open)}
             aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Upload Your .csv File
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <ErrorOutlineIcon
                         color="error"
                         style={{ verticalAlign: 'bottom' }}
                        />
                        <Typography
                         variant="body1"
                         color="error"
                         display="inline"
                        >
                            This will override the current data associated with this tracker
                        </Typography>
                    </DialogContentText>
                        <CSVReader
                         onFileLoaded={handleLoaded}
                        />
                        <DialogActions>
                            <Button
                             disabled={disabled}
                             onClick={onUploadSubmit}
                            >
                                Upload .csv
                            </Button>
                            <Button
                             onClick={() => setOpen(!open)}
                            >
                                Close
                            </Button>
                        </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
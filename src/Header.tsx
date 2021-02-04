import {
    Button,
    IconButton,
    SvgIcon,
    Tooltip,
    Typography
} from "@material-ui/core";
import React from "react";
import { useTrackerContext } from "./TrackerContext";
import GetAppIcon from '@material-ui/icons/GetApp';



export const Header: React.FC = () => {
    const { tracker } = useTrackerContext()!;

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleDownloadClick = async () => {
        await fetch(`http://localhost:5000/api/trackers/download/${tracker!._id}`, {
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

    return (
        <React.Fragment>
            <Typography variant="h6">
                {tracker
                    ? '# ' + tracker!._id
                    : '< Create a tracker'
                }
            </Typography>
            {tracker && (
                <>
                    <Tooltip title="Copy URL">
                        <IconButton onClick={handleCopyUrl}>
                            <SvgIcon children={
                                <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                </svg>
                            } />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download .csv">
                        <IconButton onClick={handleDownloadClick}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </React.Fragment>
    );
};
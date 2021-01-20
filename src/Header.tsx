import { IconButton, SvgIcon, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

export const Header: React.FC = () => {
    const params = useParams<any>();

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <React.Fragment>
            <Typography variant="h6">
                {params.id
                    ? '# ' + params.id
                    : '< Create a tracker'
                }
            </Typography>
            {params.id && (
                <Tooltip title="Copy URL">
                    <IconButton onClick={handleCopyUrl}>
                        <SvgIcon children={
                            <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                            </svg>
                        } />
                    </IconButton>
                </Tooltip>
            )}
        </React.Fragment>
    );
};
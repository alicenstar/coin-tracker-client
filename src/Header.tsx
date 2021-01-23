import { IconButton, SvgIcon, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { useTrackerContext } from "./TrackerContext";


type Props = {
    header: string | undefined;
}

export const Header: React.FC<Props> = ({ header }: Props) => {
    const { tracker } = useTrackerContext()!;

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <React.Fragment>
            <Typography variant="h6">
                {header
                    ? '# ' + header
                    : '< Create a tracker'
                }
            </Typography>
            {tracker && (
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
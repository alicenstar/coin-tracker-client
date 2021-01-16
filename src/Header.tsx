import { Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";


export const Header: React.FC = () => {
    const params = useParams<any>();

    return (
        <React.Fragment>
            <Typography variant="h6">
                {params.id
                    ? '# ' + params.id
                    : '< Create a tracker'
                }
            </Typography>
        </React.Fragment>
    );
};
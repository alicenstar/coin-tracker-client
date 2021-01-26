import React from "react";
import { OverviewTable } from "./OverviewTable";


export const Overview = ({ data }: any) => {
    return (
        <div className="overview-container">
            <OverviewTable
                headers={[
                    "Name",
                    "Symbol",
                    "USD Price",
                    "Percent Change 1HR"
                ]}
            />
        </div>
    );
};
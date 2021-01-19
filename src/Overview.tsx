import React from "react";
import { DenseTable } from "./Table";


export const Overview = ({ data }: any) => {
    return (
        <div className="overview-container">
            <DenseTable
                data={data}
                headers={[
                "Name",
                "Symbol",
                "USD Price",
                "Percent Change 1HR"
                ]}
                title="Market Overview"
            />
        </div>
    );
};
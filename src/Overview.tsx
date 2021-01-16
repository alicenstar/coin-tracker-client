import React, { useEffect, useState } from "react";
import { DenseTable } from "./Table";

interface IResult {
    loaded: boolean;
    data: any;
}

export const Overview: React.FC = () => {
    const [state, setState] = useState<IResult>({
        loaded: false,
        data: []
    });

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/cmc/latest');
        const json = await response.json();
        setState({ loaded: true, data: json.json.data });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="overview-container">
            {!state.loaded &&
                <div>Loading...</div>
            }
            {state.loaded &&
                <DenseTable
                 data={state.data}
                 headers={[
                    "Name",
                    "Symbol",
                    "USD Price",
                    "Percent Change 1HR"
                 ]}
                 title="Market Overview"
                />
            }
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { Table } from "./Table";

// Make more type safe
interface IResult {
    status: string;
    data: any;
}

export const Overview: React.FC = () => {
    const [result, setResult] = useState<IResult>({
        status: 'loading',
        data: []
    });

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/cmc/latest');
        const json = await response.json();
        setResult({ status: 'loaded', data: json.json.data });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="overview-container">
            {result.status === 'loading' &&
                <div>Loading...</div>
            }
            {result.status === 'loaded' &&
                <Table
                 data={result.data}
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
import React from "react";
import { currencyFormatter, percentFormatter } from "./Formatters";


interface ITableProps {
    data: any;
    headers?: string[];
    title?: string;
}

export const Table: React.FC<ITableProps> = ({
    data,
    headers,
    title
}: ITableProps) => {
    return (
        <div className="table-container">
            {title && (
                <h3 className="table-title">{title}</h3>
            )}
            <table className="holdings-table">
                {headers && (
                    <thead>
                        <tr>
                            {headers.map((header: string, index: number) => (
                                <th key={index}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}

                <tbody>
                    {data.map((coin: any) => (
                        <tr key={coin.id}>
                            <td>
                                {coin.name}
                            </td>
                            <td>
                                {coin.symbol}
                            </td>
                            <td>
                                {currencyFormatter.format(coin.quote.USD.price)}
                            </td>
                            <td>
                                {percentFormatter.format(coin.quote.USD.percent_change_1h)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
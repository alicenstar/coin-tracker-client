import React from "react";
import { useListingsContext } from "./LatestListingsContext";
import { OverviewTable } from "./OverviewTable";
import { OverviewTreemap } from "./OverviewTreemap";


export const Overview = () => {
    const [ loaded, setLoaded ] = React.useState(false);
    const { listings } = useListingsContext()!;
    const data = React.useRef<any>();
    const treemapData = React.useCallback(() => {
        setLoaded(false);
        let listingsData = listings.map(listing => ({
            category: 'Market Cap',
            name: listing.symbol,
            value: listing.quote.USD.market_cap,
        }));

        data.current = {
            name: 'Market Cap Treemap',
            children: listingsData
        };
        setLoaded(true);            
    }, [listings]);

    React.useEffect(() => {
        if (listings.length > 0) {
            treemapData();
        }
    }, [listings, treemapData]);

    return (
        <div className="overview-container">
            {loaded && 
                <OverviewTreemap
                 data={data.current}
                 height={400}
                 width={800}
                 key={listings[0].quote.USD.market_cap}
                />
            }
            
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
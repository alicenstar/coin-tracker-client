import { Container } from "@material-ui/core";
import React from "react";
import { useListingsContext } from "./ListingsContext";
import { OverviewTable } from "./OverviewTable";
import { OverviewTreemap } from "./OverviewTreemap";


function useContainerDimensions(myRef: React.RefObject<any>) {
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  
    React.useEffect(() => {
        const getDimensions = () => ({
            width: (myRef && myRef.current.offsetWidth) || 0,
            height: (myRef && myRef.current.offsetHeight) || 0,
        });
    
        const handleResize = () => {
            setDimensions(getDimensions());
        };

        if (myRef.current) {
            setDimensions(getDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef]);
    return dimensions;
};

export const Overview = () => {
    const [ loaded, setLoaded ] = React.useState(false);
    const { listings } = useListingsContext()!;
    const data = React.useRef<any>();
    const componentRef = React.useRef(null);
    const { width, height } = useContainerDimensions(componentRef);
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
        <Container maxWidth="lg" disableGutters>
            <div style={{ height: '400px', width: '100%' }} ref={componentRef}>
                {loaded && 
                    <OverviewTreemap
                     data={data.current}
                     height={height}
                     width={width}
                     key={listings[0].quote.USD.market_cap}
                    />
                }
            </div>
            <OverviewTable
             headers={[
                "Rank",
                "Name",
                "Price (USD)",
                "Market Cap",
                "Volume 24hr",
                "1hr",
                "24hr"
             ]}
            />

        </Container>
    );
};
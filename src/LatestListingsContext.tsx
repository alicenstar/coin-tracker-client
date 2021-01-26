import React from 'react';
import { IListing } from './types/types';
import { useInterval } from './utils';


type Props = {
	children: React.ReactNode;
};

type LatestListingsContextType = {
    listings: IListing[];
    setListings: (listings: IListing[]) => void;
};

const LatestListingsContext = React.createContext<LatestListingsContextType | undefined>(
    undefined
);

export const LatestListingsProvider = ({
    children
}: Props) => {
    const [ listings, setListings ] = React.useState<IListing[]>([]);

    const fetchListings = React.useCallback(async () => {
        const response = await fetch('http://localhost:5000/api/cmc/latest', {
            headers: {
                'Content-type': 'application/json'
            }
        });
        const json = await response.json();
        setListings(json.json.data);
    }, []);

    React.useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    useInterval(() => {
        fetchListings();
    }, 60000);

    return (
        <LatestListingsContext.Provider value={{ listings, setListings }}>
            {children}
        </LatestListingsContext.Provider>
    )
};

export const useListingsContext = () => React.useContext(LatestListingsContext);
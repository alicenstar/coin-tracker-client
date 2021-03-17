import React from 'react';
import Loading from '../utils/Loading';
import { IListing } from '../types/types';
import { useInterval } from '../utils';


type Props = {
	children: React.ReactNode;
};

type ListingsContextType = {
    listings: IListing[];
    setListings: (listings: IListing[]) => void;
};

const ListingsContext = React.createContext<ListingsContextType | undefined>(
    undefined
);

export const ListingsProvider = ({
    children
}: Props) => {
    const [ listings, setListings ] = React.useState<IListing[]>([]);
    const [ loaded, setLoaded ] = React.useState(false);

    const fetchListings = React.useCallback(async () => {
        const response = await fetch('https://backend-cointracker-dev.herokuapp.com/api/listings/');
        const json = await response.json();
        setListings(json.listings);
        setLoaded(true);
    }, []);

    React.useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    useInterval(() => {
        fetchListings();
    }, 300000);

    return (
        <ListingsContext.Provider value={{ listings, setListings }}>
            {!loaded && <Loading />}
            {children}
        </ListingsContext.Provider>
    );
};

export const useListingsContext = () => React.useContext(ListingsContext);
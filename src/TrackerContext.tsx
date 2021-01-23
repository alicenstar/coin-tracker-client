import React from 'react';
import { ITracker } from './types/types';


type Props = {
	children: React.ReactNode;
};

type TrackerContextType = {
    tracker: ITracker | undefined;
    setTracker: (tracker: ITracker | undefined) => void;
}

const TrackerContext = React.createContext<TrackerContextType | undefined>(
    undefined
);

export const TrackerProvider = ({
    children
}: Props) => {
    const [ tracker, setTracker ] = React.useState<ITracker | undefined>(undefined);

    return (
        <TrackerContext.Provider value={{ tracker, setTracker }}>
            {children}
        </TrackerContext.Provider>
    )
};

export const useTrackerContext = () => React.useContext(TrackerContext);
import React from 'react';
import { ITracker } from './types/types';


type Props = {
	children: React.ReactNode;
};

type TrackerContextType = {
    tracker: ITracker | undefined;
    setTracker: (tracker: ITracker | undefined) => void;
    findTracker: () => void;
    setId: (id: string) => void;
}

const TrackerContext = React.createContext<TrackerContextType | undefined>(
    undefined
);

export const TrackerProvider = ({
    children
}: Props) => {
    const [ tracker, setTracker ] = React.useState<ITracker | undefined>(undefined);
    const [ id, setId ] = React.useState<string | undefined>(undefined);

    const findTracker = React.useCallback(async () => {
        const response = await fetch(`http://localhost:5000/api/trackers/${id}`);
        const json = await response.json();
        if (json.tracker) {
            setTracker(json.tracker);
        } else {
            setTracker(undefined);
        }
    }, [setTracker, id]);

    React.useEffect(() => {
        if (id) {
            findTracker();
        }
    }, [findTracker, id]);

    return (
        <TrackerContext.Provider value={{ tracker, setTracker, findTracker, setId }}>
            {children}
        </TrackerContext.Provider>
    )
};

export const useTrackerContext = () => React.useContext(TrackerContext);
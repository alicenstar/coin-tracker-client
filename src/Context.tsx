import React from 'react';


type TrackerContextType = {
    trackerId: string;
    setTrackerId: (value: string) => void;
}

// const defaultTheme = "dark";
const TrackerContext = React.createContext<TrackerContextType | undefined>(
    undefined
);

type Props = {
	children: React.ReactNode
};

export const TrackerProvider = ({
	children
}: Props) => {
	const [ trackerId, setTrackerId ] = React.useState('');

	return (
		<TrackerContext.Provider value={{ trackerId, setTrackerId }}>
			{children}
		</TrackerContext.Provider>
	);
};

export const useTracker = () => React.useContext(TrackerContext);
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

	// React.useEffect(() => {
	// 	// replace with code to get the theme instead of hardcoding
	// 	const currentId = 'defaultid';
	// 	setTrackerId(currentId);
	// }, []);

	return (
		<TrackerContext.Provider value={{ trackerId, setTrackerId }}>
			{children}
		</TrackerContext.Provider>
	);
};

export const useTracker = () => React.useContext(TrackerContext);
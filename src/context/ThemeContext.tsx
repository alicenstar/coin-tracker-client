import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Cookies from 'universal-cookie';
import { darkTheme, lightTheme } from '../styles/Themes';


const cookies = new Cookies();

type Props = {
	children: React.ReactNode;
};

type ThemeContextType = {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
    undefined
);

export const DarkThemeProvider = ({
    children
}: Props) => {

    const [ darkMode, setDarkMode ] = React.useState<boolean>(true);
    const theme = createMuiTheme(darkMode ? darkTheme : lightTheme);

    // Check if user has a theme cookie already set
	React.useEffect(() => {
		const themeCookie = cookies.get('theme');
		if (themeCookie) {
			const userSetting = themeCookie === 'dark';
			setDarkMode(userSetting);
		}
	}, []);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => React.useContext(ThemeContext);
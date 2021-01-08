import React from 'react';
// import './App.css';
import { Error } from "./Error";
import { NewTracker } from './NewTracker';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import { Overview } from './Overview';
import { Trackers } from './Trackers';
import CssBaseline from '@material-ui/core/CssBaseline';
import MiniDrawer from './MiniDrawer';


// const defaultTheme = "dark";
// const ThemeContext = React.createContext(
// 	defaultTheme
// );

// type Props = {
// 	children: React.ReactNode
// };

// export const ThemeProvider = ({
// 	children
// }: Props) => {
// 	const [theme, setTheme] = React.useState(
// 		defaultTheme
// 	);

// 	React.useEffect(() => {
// 		// replace with code to get the theme instead of hardcoding
// 		const currentTheme = "light";
// 		setTheme(currentTheme);
// 	}, []);

// 	return (
// 		<ThemeContext.Provider value={theme}>
// 			{children}
// 		</ThemeContext.Provider>
// 	);
// };

// export const useTheme = () => React.useContext(ThemeContext);





function App(): JSX.Element {

	return (
		<React.Fragment>
			<CssBaseline />
			<MiniDrawer>
				<Router>
					<NewTracker />
					<nav>
						<NavLink to="/coins" className="header-link" activeClassName="header-link-active">
							Overview
						</NavLink>
					</nav>
					<Switch>
						<Route path="/coins">
							<Overview />
						</Route>
						<Route path="/:trackerid" children={<Trackers />} />
						<Route exact path="/">
						</Route>
						<Route>
							<Error />
						</Route>
					</Switch>
				</Router>
			</MiniDrawer>
		</React.Fragment>
	);
}


export default App;

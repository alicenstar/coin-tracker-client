import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import MiniDrawer from './MiniDrawer';
import { PageProvider } from './PageContext';
import { TrackerProvider } from './TrackerContext';
import { UserProvider } from './UserContext';
import { ListingsProvider } from './ListingsContext';
import { LandingPage } from './LandingPage';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core';


function App(): JSX.Element {
	// const theme = createMuiTheme({
	// 	palette: {
	// 		primary: {
	// 			main: '#5ce1e6'
	// 		},
	// 		secondary: {
	// 			main: '#ff66c4'
	// 		},
	// 		background: {
	// 			default: '#171717'
	// 		},
	// 		text: {
	// 			primary: '#ffffff',
	// 			secondary: '#ffffff'
	// 		},
	// 	},
	// 	overrides: {
	// 		MuiSelect: {
	// 			'icon': {
	// 				color: '#ffffff'
	// 			}
	// 		},
	// 		MuiTablePagination: {
	// 			'menuItem': {
	// 				color: "#000000"
	// 			}
	// 		}
	// 	}
	// });

	return (
		<UserProvider>
			<TrackerProvider>
				<PageProvider>
					<ListingsProvider>
							<Router>
								<CssBaseline />
								<Switch>
									<Route exact path="/" component={() => <LandingPage />} />
									<Route path="/:id?" component={(props: any) => <MiniDrawer {...props} />} />
								</Switch>
							</Router>
					</ListingsProvider>
				</PageProvider>
			</TrackerProvider>
		</UserProvider>
	);
}


export default App;

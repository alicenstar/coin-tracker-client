import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import MiniDrawer from './common/MiniDrawer';
import { PageProvider } from './context/PageContext';
import { TrackerProvider } from './context/TrackerContext';
import { ListingsProvider } from './context/ListingsContext';
import { LandingPage } from './landing/LandingPage';
import { ThemeProvider } from '@material-ui/core';
import { defaultTheme } from './styles/Themes';
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
		<Router>
				<TrackerProvider>
					<PageProvider>
						<ListingsProvider>
							<ThemeProvider theme={defaultTheme}>
								<CssBaseline />
								<Switch>
									<Route exact path="/">
										<LandingPage />
									</Route>
									<Route path="/:id">
										<MiniDrawer />
									</Route>
								</Switch>
							</ThemeProvider>
						</ListingsProvider>
					</PageProvider>
				</TrackerProvider>
		</Router>
	);
}


export default App;

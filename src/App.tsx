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
import { LatestListingsProvider } from './LatestListingsContext';
import { LandingPage } from './LandingPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


function App(): JSX.Element {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#5ce1e6'
			},
			secondary: {
				main: '#ff66c4'
			},
			background: {
				default: '#171717'
			},
			text: {
				primary: '#ffffff'
			},
			action: {
				hover: '#ff66c4'
			}
		}
	});

	return (
		<UserProvider>
			<TrackerProvider>
				<PageProvider>
					<LatestListingsProvider>
						<ThemeProvider theme={theme}>
							<Router>
								<CssBaseline />
								<Switch>
									<Route exact path="/" component={() => <LandingPage />} />
									<Route path="/:id?" component={(props: any) => <MiniDrawer {...props} />} />
								</Switch>
							</Router>
						</ThemeProvider>
					</LatestListingsProvider>
				</PageProvider>
			</TrackerProvider>
		</UserProvider>
	);
}


export default App;

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
import { DarkThemeProvider } from './context/ThemeContext';


function App(): JSX.Element {

	return (
		<Router>
			<TrackerProvider>
				<PageProvider>
					<ListingsProvider>
						<DarkThemeProvider>
							<CssBaseline />
							<Switch>
								<Route exact path="/">
									<LandingPage />
								</Route>
								<Route path="/:id">
									<MiniDrawer />
								</Route>
							</Switch>
						</DarkThemeProvider>
					</ListingsProvider>
				</PageProvider>
			</TrackerProvider>
		</Router>
	);
};


export default App;

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


function App(): JSX.Element {

	return (
		<UserProvider>
			<TrackerProvider>
				<PageProvider>
					<LatestListingsProvider>
						<Router>
							<CssBaseline />
							<Switch>
								<Route exact path="/" component={() => <LandingPage />} />
								<Route path="/:id?" component={(props: any) => <MiniDrawer {...props} />} />
							</Switch>
						</Router>
					</LatestListingsProvider>
				</PageProvider>
			</TrackerProvider>
		</UserProvider>
	);
}


export default App;

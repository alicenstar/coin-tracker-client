import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import MiniDrawer from './MiniDrawer';
import { PageProvider } from './PageContext';
import { TrackerProvider } from './TrackerContext';
import { UserProvider } from './UserContext';
import { LatestListingsProvider } from './LatestListingsContext';


function App(): JSX.Element {

	return (
		<UserProvider>
			<TrackerProvider>
				<PageProvider>
					<LatestListingsProvider>
						<Router>
							<CssBaseline />
							<Route path="/:id?" component={(props: any) => <MiniDrawer {...props} />} />
						</Router>
					</LatestListingsProvider>
				</PageProvider>
			</TrackerProvider>
		</UserProvider>
	);
}


export default App;

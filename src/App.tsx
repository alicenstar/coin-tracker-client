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


function App(): JSX.Element {

	return (
		<UserProvider>
			<TrackerProvider>
				<PageProvider>
					<Router>
						<CssBaseline />
						<Route path="/:id?" component={(props: any) => <MiniDrawer {...props} />} />
					</Router>
				</PageProvider>
			</TrackerProvider>
		</UserProvider>
	);
}


export default App;

import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import MiniDrawer from './MiniDrawer';
import { PageProvider } from './PageContext';
import { TrackerProvider } from './TrackerContext';


function App(): JSX.Element {

	return (
		
		<PageProvider>
			<TrackerProvider>
				<Router>
					<CssBaseline />
					<Route path="/:id?"component={(props: any) => <MiniDrawer {...props} />} />
				</Router>
			</TrackerProvider>
		</PageProvider>
		
	);
}


export default App;

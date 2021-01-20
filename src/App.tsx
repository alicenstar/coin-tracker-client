import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import MiniDrawer from './MiniDrawer';
import { PageProvider } from './PageContext';


function App(): JSX.Element {

	return (
		<Router>
			<PageProvider>
				<CssBaseline />
				<Route path="/:id?"component={(props: any) => <MiniDrawer {...props} />} />

			</PageProvider>
		</Router>
	);
}


export default App;

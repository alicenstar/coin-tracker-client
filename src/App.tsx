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
import { TrackerProvider } from './Context';


function App(): JSX.Element {

	return (
		<React.Fragment>
			<TrackerProvider>
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
							<Route path="/:id" children={<Trackers />} />
							<Route exact path="/">
							</Route>
							<Route>
								<Error />
							</Route>
						</Switch>
					</Router>
				</MiniDrawer>
			</TrackerProvider>
		</React.Fragment>
	);
}


export default App;

import React from 'react';
import './App.css';
import { Error } from "./Error";
import { Header } from "./Header";
import { NewTracker } from './NewTracker';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import { Overview } from './Overview';
import { Trackers } from './Trackers';


document.title = "Coin Tracker 2.0";

function App(): JSX.Element {
	return (
	<div className="App">
		<Header />
		<NewTracker />

		<Router>
			<nav>
				<NavLink to="/coins" className="header-link" activeClassName="header-link-active">
					Overview
				</NavLink>
				<NavLink to="/trackers" className="header-link" activeClassName="header-link-active">
					Trackers
				</NavLink>
			</nav>
			<Switch>
				<Route path="/coins">
					<Overview />
				</Route>
				<Route path="/trackers">
					<Trackers />
				</Route>
				<Route exact path="/">
				</Route>
				<Route>
					<Error />
				</Route>
			</Switch>
		</Router>
	</div>
	);
}

export default App;

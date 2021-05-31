import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import NavBar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import HomePage from './pages/Home/Home';

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/dashboard" component={Dashboard} />
				<Route component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;

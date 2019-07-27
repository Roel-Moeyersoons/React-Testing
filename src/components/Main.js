import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Overview from "./Overview";
import Title from "./Title";
import About from "./About";
import Details from "./Details";

class Main extends Component {
	render() {
		return (
			<div style={{ padding: "1em" }}>
				<Router>
					<Title />
					<Route exact path="/" render={() => <Overview />} />
					<Route exact path="/about" render={() => <About />} />
					<Route
						path="/tab/:tabId"
						component={props => <Details {...props} />}
					/>
				</Router>
			</div>
		);
	}
}

export default Main;

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Overview from "./Overview";
import Title from "./Title";
import About from "./About";
import Details from "./Details";
import Login from "./Login";
import { MyContext } from "../context/MyProvider";

class Main extends Component {
	constructor(props, context) {
		super(props);
		//context.auth.authenticate("angelo", "test");
	}
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
					<Route exact path="/login" component={Login} />
				</Router>
			</div>
		);
	}
}

Main.contextType = MyContext;
export default Main;

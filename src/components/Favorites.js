import React, { Component, Fragment } from "react";
import Axios from "axios";
import { MyContext } from "../context/MyProvider";
import { Redirect } from "react-router-dom";
import TabList from "./TabList";

class Favorites extends Component {
	_mounted = false;

	constructor(props, context) {
		super(props);
		context.auth.subscribe(this);
		//console.log(context.auth.Token);
		this.state = { token: context.auth.Token, fav: [] };
		this.fetchFavorites();
	}

	update() {
		if (this._mounted) {
			this.setState({ token: this.context.auth.Token });
			this.fetchFavorites();
		}
	}

	fetchFavorites() {
		if (this.state.token !== "") {
			Axios.get(`${process.env.REACT_APP_SITE}/user/fav`, {
				headers: { Authorization: `Bearer ${this.state.token}` }
			}).then(res => {
				if (this._mounted) {
					//console.log(res.data);
					this.setState({ fav: res.data });
				}
			});
		}
	}

	componentDidMount() {
		this._mounted = true;
	}

	render() {
		if (!this.context.auth.isAuthenticated()) {
			return <Redirect to="/" />;
		}
		//let token = <p> token: {this.state.token}</p>
		let laden = <h2>laden...</h2>;
		if (this.state.fav.length) {
			laden = <TabList tabs={this.state.fav} />;
		}
		return (
			<Fragment>
				<h2>Favorites</h2>
				{laden}
			</Fragment>
		);
	}

	componentWillUnmount() {
		this._mounted = false;
	}
}

Favorites.contextType = MyContext;
export default Favorites;

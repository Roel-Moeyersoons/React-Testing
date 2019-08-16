import React from "react";
import { MyContext } from "../context/MyProvider";
import { Link } from "react-router-dom";

class Title extends React.Component {
	constructor(props, context) {
		super(props);
		this.state = {
			loggedIn: context.auth.isAuthenticated()
		};
		context.auth.subscribe(this);
	}

	/* componentDidMount() {
		setInterval(() => {
			if (this.state.loggedIn !== this.context.auth.isAuthenticated())
				this.setState({
					loggedIn: this.context.auth.isAuthenticated()
				});
		}, 1000);
	} */

	update() {
		this.setState({ loggedIn: this.context.auth.isAuthenticated() });
	}

	render() {
		console.log(this.state.loggedIn);
		let loginNav = (
			<button
				className="btn btn-danger navbar-btn"
				onClick={() => {
					this.logOut();
				}}
			>
				Log out
			</button>
		);
		if (!this.state.loggedIn) {
			loginNav = (
				<Link to="/login" className="nav-link">
					Log in
				</Link>
			);
		}
		return (
			<nav
				className="nav"
				style={{ paddingBottom: "1em", fontSize: "20px" }}
			>
				<Link to="/" className="nav-link">
					List
				</Link>
				<Link to="/about" className="nav-link">
					About
				</Link>
				{loginNav}
			</nav>
		);
	}

	logOut() {
		console.log("logging out");
		this.context.auth.logOut();
		this.setState({ loggedIn: false });
	}
}

Title.contextType = MyContext;
export default Title;

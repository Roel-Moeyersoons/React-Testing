import React, { Component, Fragment } from "react";
import { MyContext } from "../context/MyProvider";
import { Redirect } from "react-router-dom";
class Login extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			name: "",
			pwd: "",
			redirect: context.auth.isAuthenticated()
		};
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		return (
			<Fragment>
				<form className="container">
					<div className="form-group">
						<label>name: </label>
						<input
							type="text"
							value={this.state.name}
							className="form-control"
							onChange={e => {
								this.setState({ name: e.target.value });
							}}
						/>
					</div>
					<div className="form-group">
						<label>password: </label>
						<input
							type="text"
							value={this.state.pwd}
							className="form-control"
							onChange={e =>
								this.setState({ pwd: e.target.value })
							}
						/>
					</div>
					<input
						type="button"
						className="btn btn-primary"
						onClick={() => this.submit()}
						value="Log in"
					/>
				</form>
			</Fragment>
		);
	}

	submit() {
		this.context.auth.logIn(this.state.name, this.state.pwd).then(res => {
			this.setState({
				redirect: this.context.auth.isAuthenticated()
			});
		});
	}
}

Login.contextType = MyContext;
export default Login;

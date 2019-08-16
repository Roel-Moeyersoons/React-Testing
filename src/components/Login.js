import React, { Component, Fragment } from "react";
import { MyContext } from "../context/MyProvider";
import { Redirect } from "react-router-dom";
class Login extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			name: "",
			pwd: "",
			redirect: context.auth.isAuthenticated(),
			wrongCred: false
		};
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		return (
			<Fragment>
				<form className="container">
					<div className="form-group row">
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
					<div className="form-group row">
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
						className="btn btn-primary col-md-1 row"
						onClick={() => this.submit()}
						value="Log in"
					/>
					{this.state.wrongCred && (
						<div className="alert alert-danger row">
							Wrong Credentials
						</div>
					)}
				</form>
			</Fragment>
		);
	}

	submit() {
		this.context.auth.logIn(this.state.name, this.state.pwd).then(res => {
			this.setState({
				redirect: res,
				wrongCred: !res
			});
		});
	}
}

Login.contextType = MyContext;
export default Login;

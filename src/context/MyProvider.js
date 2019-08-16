import React, { Component } from "react";
import TabsRepo from "./providers/Repo.ts";
import Auth from "./providers/Auth.ts";

export const MyContext = React.createContext();

export class MyProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repository: new TabsRepo(
				`${process.env.REACT_APP_SITE}/tabs`,
				10 * 60 * 1000
			),
			auth: new Auth(`${process.env.REACT_APP_SITE}/user`)
		};
	}

	render() {
		return (
			<MyContext.Provider
				value={{
					state: this.state,
					getTabs: () => {
						return this.state.repository.getTabs();
					},
					getTabDetails: id => {
						return this.state.repository.getDetails(id);
					},
					auth: this.state.auth
				}}
			>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}

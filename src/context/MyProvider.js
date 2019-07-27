import React, { Component } from "react";
import TabsRepo from "./data/Repo.ts";

export const MyContext = React.createContext();

export class MyProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repository: new TabsRepo(
				"http://server.magnias.be:3000/tabs",
				10 * 60 * 1000
			)
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
					}
				}}
			>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}

import React, {Component} from "react";
import TabsRepo from '../data/Repo.ts'

export const MyContext = React.createContext();

export class MyProvider extends Component {
	constructor(props){
		super(props);
		this.state = {
			repository: new TabsRepo('http://server.magnias.be:3000/tabs', 10*60*1000),
			data: "lol"
		}
	}

	render() {
		return (
			<MyContext.Provider value={{
				state: this.state
			}}>
				{this.props.children}
			</MyContext.Provider>
		)
	}
}
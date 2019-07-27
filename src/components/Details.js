import React, { Component, Fragment } from "react";
import { MyContext } from "../context/MyProvider";

class Details extends Component {
	_isMounted = false;

	constructor(props, context) {
		super(props);
		this.state = { item: {} };
		context.getTabDetails(this.props.match.params.tabId).then(tab => {
			if (this._isMounted) this.setState({ item: tab });
		});
	}

	componentDidMount() {
		this._isMounted = true;
	}

	render() {
		let songnaam = "laden...";
		let songFound = false;
		if (this.state.item.error) {
			songnaam = this.state.item.error;
		}
		if (this.state.item.song) {
			songFound = true;
			//console.log(this.state.item);
			songnaam = this.state.item.song;
		}
		return (
			<Fragment>
				<h1>song: {songnaam}</h1>
				{songFound && (
					<Fragment>
						<h2>artiest: {this.state.item.artist}</h2>
						<hr />
						<p
							className="container"
							style={{
								whiteSpace: "pre",
								fontFamily: "monospace"
							}}
						>
							{this.state.item.tab}
						</p>
					</Fragment>
				)}
			</Fragment>
		);
	}

	componentWillUnmount = () => {
		this._isMounted = false;
	};
}

Details.contextType = MyContext;

export default Details;

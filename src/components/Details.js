import React, { Component, Fragment } from "react";

class Details extends Component {
    
    render(){
        let item = this.props.getItem(this.props.match.params.tabId);
        return (
            <Fragment>
                <h1>Het werkt</h1>
                <h2>song: {item.song}</h2>
            </Fragment>
        );
    }
}

export default Details;

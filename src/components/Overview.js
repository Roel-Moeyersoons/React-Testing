import React, { Component, Fragment } from "react";
import TabList from './TabList';

class Overview extends Component {

    render(){
        let laden = <h1>Laden...</h1>;
        if(this.props.tabs){
            laden = <TabList tabs={this.props.tabs} />;
        }
        return (
            <Fragment>
                {laden}
            </Fragment>
        );
    }
}

export default Overview;
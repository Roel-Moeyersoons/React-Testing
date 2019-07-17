import React, { Component, Fragment } from 'react'
import axios from 'axios';
import TabList from './TabList';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = { tabs: null };
        axios.get('http://server.magnias.be:3000/tabs', {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(
                tabs => { console.log(tabs.data) ; this.setState({ tabs: tabs.data }); })
            .catch(
                error => { console.log(error); }
        );
    }

    render(){
        return (
            <Fragment>
                { this.state.tabs === null || <TabList tabs={this.state.tabs} /> }
                { this.state.tabs === null && <h1>Laden...</h1> }
            </Fragment>
        );
    }
}


export default Main;

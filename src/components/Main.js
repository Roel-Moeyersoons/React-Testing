import React, { Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Overview from './Overview';
import Title from './Title';
import About from './About'
import Details from './Details'

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

    getItem(id){
        console.log(this.state);
        return this.state ? this.state.tabs.filter((item) => item._id === id ).pop() : null;
    }

    render(){
        return (       
            <div style={{ padding: '1em' }}>
                <Router>
                    <Title />
                    <Route exact path="/" render={() => <Overview tabs={this.state.tabs} />}></Route>
                    <Route exact path="/about" render={() => <About />} />
                    <Route path="/tab/:tabId" component={(props) => <Details {...props} getItem={this.getItem.bind(this)} />} />
                </Router>
            </div>
        )
    }
}


export default Main;

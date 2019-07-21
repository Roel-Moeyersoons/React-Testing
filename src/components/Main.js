import React, { Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Overview from './Overview';
import Title from './Title';
import About from './About';
import Details from './Details';
import TabsRepo from '../data/Repo.ts'

class Main extends Component{

    Repository

    constructor(props){
        super(props);
        this.state = { tabs: [] };

        this.Repository = new TabsRepo('http://server.magnias.be:3000/tabs', 10*60*1000);
        this.Repository.getTabs().then(tabs => { this.setState({ tabs }); })
    }


    render(){
        return (       
            <div style={{ padding: '1em' }}>
                <Router>
                    <Title />
                    <Route exact path="/" render={() => <Overview tabs={this.state.tabs} />}></Route>
                    <Route exact path="/about" render={() => <About />} />
                    <Route path="/tab/:tabId" component={(props) => <Details {...props} repo={this.Repository}/>} />
                </Router>
            </div>
        )
    }
}


export default Main;

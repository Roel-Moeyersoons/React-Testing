import React, { Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Overview from './Overview';
import Title from './Title';
import About from './About';
import Details from './Details';
import { MyContext } from '../context/MyProvider';

class Main extends Component{
    constructor(props, context){
        super(props);
        this.state = { tabs: [] };
        
    }

    componentDidMount(){
        this.context.getTabs().then(tabs => { this.setState({ tabs }); });
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

Main.contextType = MyContext;

export default Main;

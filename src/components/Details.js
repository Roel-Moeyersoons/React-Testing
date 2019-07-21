import React, { Component, Fragment } from "react";
import { MyContext } from '../context/MyProvider';

class Details extends Component {
    constructor(props){
        super(props);
        this.state = { item: {} };
    }

    componentDidMount(){
        this.props.repo.getItem(this.props.match.params.tabId)
            .then( tab => this.setState({item : tab}));
    }

    render(){
        let songnaam = `Song niet gevonden voor id ${this.props.match.params.tabId}`;
        if(this.state.item){
            songnaam = this.state.item.song;
        }
        /*return (
                <MyContext.Consumer>
                    {(context) => (
                        <Fragment>
                            <h1>Het werkt</h1>
                            <h2>song: {context.state.data}</h2>
                        </Fragment>
                    )}                  
                </MyContext.Consumer>
        );*/
        return <h1>{this.context.state.data}</h1>
    }
}

Details.contextType = MyContext

export default Details;

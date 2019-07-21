import React, { Component, Fragment } from "react";
import { MyContext } from '../context/MyProvider';

class Details extends Component {

    _isMounted = false;

    constructor(props, context){
        super(props);
        this.state = { item: {} };
        context.findTab(this.props.match.params.tabId)
            .then( tab => {
                if(this._isMounted)
                    this.setState({item : tab})
            });
    }

    componentDidMount(){
        this._isMounted = true;
    }

    render(){
        let songnaam = `Song niet gevonden voor id ${this.props.match.params.tabId}`;
        if(this.state.item){
            songnaam = this.state.item.song;
        }
        return (
            <Fragment>
                <h1>Het werkt</h1>
                <h2>song: {songnaam}</h2>
            </Fragment>
        );
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }
}

Details.contextType = MyContext;

export default Details;

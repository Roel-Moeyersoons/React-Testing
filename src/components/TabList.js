import React, { Component } from 'react';
import TabItem from './TabItem';

class TabList extends Component {
    render() {
        return this.props.tabs.map( i => <TabItem item={i}/>)
    }
}

export default TabList;
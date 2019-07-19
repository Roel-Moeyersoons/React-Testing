import React, { Component } from "react";
import TabItem from "./TabItem";

class TabList extends Component {
  render() {
    let ide = 0;
    return (
        <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Artist</th>
                <th>Song</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
                {this.props.tabs.map(i => <TabItem tableid={ide++} key={i._id} item={i} />)}
            </tbody>
        </table>
    )
  }
}

export default TabList;

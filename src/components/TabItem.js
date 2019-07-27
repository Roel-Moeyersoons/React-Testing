import React from "react";
import { Link } from "react-router-dom";

export default function TabItem(props) {
	return (
		<tr>
			<td>{props.tableid}</td>
			<td>{props.item._id}</td>
			<td>{props.item.artist}</td>
			<td>{props.item.song}</td>
			<td>
				<Link to={`/tab/${props.item._id}`}>See details</Link>
			</td>
		</tr>
	);
}

import React from "react";
import "./Position.css";
const Position = props => {
	return (
		<div className="Position">
			Round {props.counter} / {props.totalCount}
		</div>
	);
};

export default Position;

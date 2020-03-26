import React from "react";
import "./Answer.css";
const Answer = props => {
	return (
		<div onClick={props.click} className="Answer">
			{props.answertxt}
		</div>
	);
};

export default Answer;

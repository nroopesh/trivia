import React from "react";
import "./Question.css";
const Question = props => {
	return <div className="Question">{props.question.question}</div>;
};

export default Question;

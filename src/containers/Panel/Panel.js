import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";
import "./Panel.css";
import Position from "../../components/Position/Position";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import Timer from "../../components/Timer/Timer";
import Spinner from "../../components/Spinner/Spinner";

class Panel extends Component {
	state = {
		loading: true,
		answers: [],
		counter: 0,
		score: 0,
	};

	componentDidMount() {
		axios
			.get(
				"https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple",
			)
			.then(res => {
				const fetchQuestions = [];
				for (let key in res.data.results) {
					fetchQuestions.push({ ...res.data.results[key], id: key });
				}
				this.setState({ loading: false });
				this.props.onLoadQuestion(fetchQuestions);
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	}

	answerClickHandler = ans => {
		let score = this.state.score;
		this.props.onSaveAnswer(this.props.counter, ans);

		let ques = this.props.questions[this.props.counter];
		if (ques.correct_answer === ans) {
			score++;
			console.log(ques.question + " :: True");
		} else {
			console.log(ques.question + " :: false");
		}

		this.setState({
			answers: this.state.answers.concat({
				questionId: this.props.counter,
				answer: ans,
			}),
			counter: this.state.counter + 1,
			score: score,
		});
	};

	render() {
		let panel = <Spinner></Spinner>;

		if (
			this.props.questions.length > 0 &&
			this.props.questions.length === this.props.answers.length
		) {
			panel = <h1>Score: {this.state.score}</h1>;
		} else if (this.props.questions.length) {
			let ques = this.props.questions[this.state.counter];
			let counter = this.state.counter + 1;
			let totalCount = this.props.questions.length;

			let answers = [];
			answers.push(ques.correct_answer);
			answers = answers.concat(ques.incorrect_answers);
			answers.sort(() => Math.random() - 0.5);

			let answer = answers.map(ans => (
				<Answer
					answertxt={ans}
					key={ans}
					click={() => this.answerClickHandler(ans)}
				></Answer>
			));

			panel = (
				<div className="Panel">
					<Position counter={counter} totalCount={totalCount}></Position>
					<Timer
						over={() => this.answerClickHandler(null)}
						questionId={this.state.counter}
					></Timer>
					<Question question={ques} counter={this.state.counter} />
					{answer}
				</div>
			);
		}

		return panel;
	}
}

const mapStateToProps = state => {
	return {
		questions: state.questions,
		answers: state.answers,
		counter: state.counter,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoadQuestion: questions =>
			dispatch({
				type: actionTypes.STORE_QUESTION,
				questions: questions,
			}),
		onSaveAnswer: (questionID, answer) =>
			dispatch({
				type: actionTypes.STORE_ANSWER,
				questionId: questionID,
				answer: answer,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);

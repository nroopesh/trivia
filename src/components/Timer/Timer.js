import React, { Component } from "react";
import "./Timer.css";

let timer = null;

class Timer extends Component {
	state = {
		time: 10,
	};

	componentDidMount() {
		timer = setInterval(() => {
			if (this.state.time <= 0) {
				this.setState({ time: 10 });
				this.props.over();
			} else {
				this.setState({ time: this.state.time - 1 });
			}
		}, 1000);
	}

	componentDidUpdate(prevPros) {
		if (this.props.questionId !== prevPros.questionId) {
			this.setState({ time: 10 });
		}
	}

	componentWillUnmount() {
		clearInterval(timer);
	}

	render() {
		return (
			<div className="Timer">
				0:{this.state.time > 9 ? this.state.time : "0" + this.state.time}
			</div>
		);
	}
}

export default Timer;

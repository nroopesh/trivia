import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import Trivia from "./Trivia";
import QuestionReducer from "./store/question";

import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(QuestionReducer);

ReactDOM.render(
	<Provider store={store}>
		<Trivia />
	</Provider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

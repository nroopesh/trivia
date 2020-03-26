import * as actionTypes from "./actions";
const initialState = {
	questions: [],
	answers: [],
	counter: 0,
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.STORE_QUESTION:
			return {
				...state,
				questions: action.questions,
			};
		case actionTypes.STORE_ANSWER:
			return {
				...state,
				answers: state.answers.concat({
					id: action.questionId,
					answer: action.answer,
				}),
				counter: ++state.counter,
			};
		default:
			return state;
	}
};

export default reducer;

import types from './actionTypes'
import { cloneDeep } from 'lodash'
let {
	GET_ATTEMPT_BY_ID,
	TOGGLE_ATTEMPT_ANSWER,
	API_UPDATE_ATTEMPT,
	API_FINISH_ATTEMPT
} = types;

let initialState = {
	oldAttempt: {},
	attempt: {},
	error: ''
}

export default function(state = initialState, action) {

	switch(action.type){
		case API_FINISH_ATTEMPT:
		case API_UPDATE_ATTEMPT: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				attempt: action.payload.attempt
			}
		}
		case GET_ATTEMPT_BY_ID: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				attempt: action.payload.attempt,
				oldAttempt: cloneDeep(action.payload.attempt)
			}
		}
		case TOGGLE_ATTEMPT_ANSWER: {
			let { taskNum: num, value } = action.payload;
			let answer = cloneDeep(state.attempt.answers[num]);

			switch (answer.kind){
				case 'MultipleChoiceTaskAttempt': {
					let pos = answer.values.indexOf(value)

					if (pos >= 0){
						answer.values.splice(pos, 1);
					} else {
						answer.values.push(value);
					}
					break;
				}
				case 'TextTaskAttempt':
				case 'OneChoiceTaskAttempt': {
					answer.value = value;
					break;
				}
			}

			let answers = cloneDeep(state.attempt.answers);
			answers[num] = answer;
			return {
				...state,
				attempt: {
					...state.attempt,
					answers: answers
				}
			}
		}
		default:
			return state;
	}
}

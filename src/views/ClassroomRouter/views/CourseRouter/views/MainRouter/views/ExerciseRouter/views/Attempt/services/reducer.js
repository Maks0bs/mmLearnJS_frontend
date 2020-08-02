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

			return state;
		}
		case GET_ATTEMPT_BY_ID: {
			console.log('get attempt');
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}

			return {
				...state,
				attempt: action.payload.attempt,
				oldAttempt: action.payload.attempt
			}
		}
		case TOGGLE_ATTEMPT_ANSWER: {
			let { taskNum: num, value } = action.payload;
			let answer = cloneDeep(state.attempt.answers[num]);

			switch (answer.kind){
				case 'MultipleAttemptAnswer': {
					let pos = answer.values.indexOf(value)

					if (pos >= 0){
						answer.values.splice(pos, 1);
					} else {
						answer.values.push(value);
					}
					break;
				}
				case 'OneAttemptAnswer': {
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

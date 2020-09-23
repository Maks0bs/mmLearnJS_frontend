import types from './actionTypes'
import { cloneDeep } from 'lodash'
import {addItemShallow, removeItemShallow} from "../../../../../../../../../services/helpers";
let {
	GET_ATTEMPT_BY_ID,
	TOGGLE_ATTEMPT_ANSWER,
	API_UPDATE_ATTEMPT,
	API_FINISH_ATTEMPT,
	CLEANUP
} = types;

/**
 * @typedef ExerciseAttemptState
 * @type Object
 * @property {?CourseExerciseAttempt} oldAttempt -
 * unmodified attempt data that has originally been received from the API
 * @property {?CourseExerciseAttempt} attempt - attempt data that might
 * have already been changed by the student while adding / editing solutions
 * @property {?Object|string} error
 */

let initialState = {
	oldAttempt: {},
	attempt: {},
	error: ''
}

/**
 * @function exerciseAttemptReducer
 * @param {ExerciseAttemptState} state
 * @param {?CourseExerciseAttempt} state.oldAttempt -
 * unmodified attempt data that has originally been received from the API
 * @param {?CourseExerciseAttempt} state.attempt - attempt data that might
 * have already been changed by the student while adding / editing solutions
 * @param {?Object|string} state.error
 * @param {ReduxAction} action
 * @return {ExerciseAttemptState}
 *
 * @memberOf storeState.views.classroom.course.exercise
 */
export default function(state = initialState, action) {

	switch(action.type){
		case API_FINISH_ATTEMPT:
		case API_UPDATE_ATTEMPT: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					)
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
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					)
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
			let answer = {...state.attempt.answers[num]}

			switch (answer.kind){
				case 'MultipleChoiceTaskAttempt': {
					let pos = answer.values.indexOf(value)
					if (pos >= 0){
						answer.values = removeItemShallow(answer.values, pos);
					} else {
						answer.values =
							addItemShallow(answer.values, answer.values.length, value);
					}
					break;
				}
				case 'TextTaskAttempt':
				case 'OneChoiceTaskAttempt': {
					answer.value = value;
					break;
				}
			}

			let newAnswers = [...state.attempt.answers]
			newAnswers[num] = answer;
			return {
				...state,
				attempt: {
					...state.attempt,
					answers: newAnswers
				}
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}
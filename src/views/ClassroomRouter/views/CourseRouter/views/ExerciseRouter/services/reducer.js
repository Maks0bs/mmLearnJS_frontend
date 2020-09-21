import types from './actionTypes'
import { combineReducers } from 'redux'
import attemptReducer from '../views/Attempt/services/reducer'
let { 
	API_GET_EXERCISE_BY_ID,
	GET_STUDENT_ATTEMPTS,
	API_NEW_ATTEMPT,
	CLEANUP
} = types;

/**
 * @namespace storeState.views.classroom.course.exercise
 */

/**
 * @typedef ExerciseServicesState
 * @type Object
 * @property {?CourseExercise} exercise
 * @property {?CourseExerciseAttempt[]} attempts - the attempts that user created
 * why participating in the given exercise. They are sorted by time,
 * the first one is always the latest one, may not yet be a finished attempt
 * @property {?Object|string} error
 * @property {?string} newAttemptId - the id of the attempt that is created
 * if user decides to try the exercise
 */

let initialState = {
	exercise: null,
	attempts: null,
	newAttemptId: null,
	error: ''
}

/**
 * @function exerciseServicesReducer
 * @param {ExerciseServicesState} state
 * @param {?CourseExercise} state.exercise
 * @param {?CourseExerciseAttempt[]} state.attempts - the attempts that user created
 * why participating in the given exercise. They are sorted by time,
 * the first one is always the latest one, may not yet be a finished attempt
 * @param {?Object|string} state.error
 * @param {?string} state.newAttemptId - the id of the attempt that is created
 * if user decides to try the exercise
 * @param {ReduxAction} action
 * @return {ExerciseServicesState}
 *
 * @memberOf storeState.views.classroom.course.exercise
 */
let servicesReducer =  function(state = initialState, action) {
	switch(action.type){
		case GET_STUDENT_ATTEMPTS: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				attempts: action.payload.attempts
			}
		}
		case API_GET_EXERCISE_BY_ID: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error,
				}
			}
			return {
				...state,
				exercise: action.payload
			}
		}
		case API_NEW_ATTEMPT: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error,
				}
			}
			return {
				...state,
				newAttemptId: action.payload.newAttempt._id
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}

export default combineReducers({
	services: servicesReducer,
	attempt: attemptReducer
})
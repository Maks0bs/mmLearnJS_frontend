import types from './actionTypes'
import { REACT_APP_API_URL } from "../../../../../../../../../constants";

let {
	GET_ATTEMPT_BY_ID,
	TOGGLE_ATTEMPT_ANSWER,
	API_UPDATE_ATTEMPT,
	API_FINISH_ATTEMPT,
	CLEANUP
} = types;

/**
 * @namespace storeState.views.classroom.course.exercise.exerciseAttemptActions
 */

/**
 * @function
 * @async
 * @param {string} attemptId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseAttemptActions
 */
export let getAttemptById = (attemptId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/exercise-attempt/${attemptId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: GET_ATTEMPT_BY_ID,
			payload: data
		}))
		.catch(err => console.log(err))
}

/**
 * @function
 * @param {number} taskNum
 * @param {string} value
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseAttemptActions
 */
export let toggleAttemptValue = (taskNum, value) => (dispatch) => {
	return dispatch({
		type: TOGGLE_ATTEMPT_ANSWER,
		payload: { taskNum,  value}
	})
}

/**
 * @function
 * @async
 *
 * @param {string} attemptId
 * @param {Object[]} answers
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseAttemptActions
 */
export let updateAttemptAnswers = (attemptId, answers) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/exercise-attempt/${attemptId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(answers)
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_UPDATE_ATTEMPT,
			payload: data
		}))
		.catch(err => console.log(err))
}

/**
 * @function
 * @async
 * @param {string} attemptId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseAttemptActions
 */
export let finishAttempt = (attemptId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/exercise-attempt/${attemptId}/finish`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_FINISH_ATTEMPT,
			payload: data
		}))
		.catch(err => console.log(err))
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseAttemptActions
 */
export let cleanup = () => dispatch => {
	return dispatch({ type: CLEANUP });
}
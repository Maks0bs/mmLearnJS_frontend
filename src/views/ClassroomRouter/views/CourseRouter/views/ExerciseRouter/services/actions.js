import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let {
	API_GET_EXERCISE_BY_ID,
	GET_STUDENT_ATTEMPTS,
	API_NEW_ATTEMPT,
	CLEANUP
} = types;

/**
 * @namespace storeState.views.classroom.course.exercise.exerciseServicesActions
 */

/**
 * @function
 * @async
 * @param {string} exerciseId
 * @param {string} [courseId]
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseServicesActions
 */
export let getExerciseById = (exerciseId, courseId) => (dispatch) => {
	let query = courseId ? `?courseRef=${courseId}` : ''
	return fetch(`${REACT_APP_API_URL}/exercise/${exerciseId}` + query, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_GET_EXERCISE_BY_ID,
			payload: data
		}))
		.catch(err => console.log(err))

}

/**
 * @function
 * @async
 * @param {string} exerciseId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseServicesActions
 */
export let getCurUserAttempts = (exerciseId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/exercise/${exerciseId}/user-attempts`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then((data) => {
			//test delay
			return new Promise(resolve => {
				setTimeout(() => resolve(data), 1000)
			})
		})
		.then(data => dispatch({
			type: GET_STUDENT_ATTEMPTS,
			payload: data
		}))
		.catch(err => console.log(err))
}

/**
 * @function
 * @async
 * @param {string} exerciseId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseServicesActions
 */
export let newAttempt = (exerciseId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/exercise/${exerciseId}/new-attempt`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_NEW_ATTEMPT,
			payload: data
		}))
		.catch(err => console.log(err))
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.exercise.exerciseServicesActions
 */
export let cleanup = () => dispatch => {
	return dispatch({ type: CLEANUP })
}

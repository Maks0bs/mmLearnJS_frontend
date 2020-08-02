import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../../../constants'
let {
	API_GET_EXERCISE_BY_ID,
	GET_STUDENT_ATTEMPTS,
	API_NEW_ATTEMPT,
	CLEANUP
} = types;


export let getExerciseById = (courseId, exerciseId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}`, {
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

export let getCurUserAttempts = (courseId, exerciseId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}/user-attempts`, {
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

export let newAttempt = (courseId, exerciseId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}/new-attempt`, {
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

export let cleanup = () => dispatch => {
	return dispatch({
		type: CLEANUP
	})
}

import types from './actionTypes'
import { REACT_APP_API_URL } from "../../../../../../../../../../../constants";

let {
	GET_ATTEMPT_BY_ID,
	TOGGLE_ATTEMPT_ANSWER,
	API_UPDATE_ATTEMPT,
	API_FINISH_ATTEMPT
} = types;



export let getAttemptById = (courseId, exerciseId, attemptId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}/attempt/${attemptId}`, {
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

export let toggleAttemptValue = (taskNum, value) => (dispatch) => {
	return dispatch({
		type: TOGGLE_ATTEMPT_ANSWER,
		payload: {
			taskNum,
			value
		}
	})
}

export let updateAttempt = (courseId, exerciseId, attemptId, attempt) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}/attempt/${attemptId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(attempt)
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_UPDATE_ATTEMPT,
			payload: data
		}))
		.catch(err => console.log(err))
}

import types from './actionTypes'
import { REACT_APP_API_URL } from "../../../../../../../../../../../constants";

let {
	GET_ATTEMPT_BY_ID
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

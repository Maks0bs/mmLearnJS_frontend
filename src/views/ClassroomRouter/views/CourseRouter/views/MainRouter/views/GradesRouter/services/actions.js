import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../../../constants'
let {
	API_GET_SUMMARIES
} = types;


export let getExerciseSummaries = (courseId, param) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise-summary/${param}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_GET_SUMMARIES,
			payload: data
		}))
		.catch(err => console.log(err))

}


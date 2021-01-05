import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let {
	API_GET_SUMMARIES
} = types;

/**
 * @namespace storeState.views.classroom.course.gradesActions
 */

/**
 * @function
 * @async
 * @param {string} courseId
 * @param {boolean} allStudents - set to true if the authenticated
 * user is a teacher and wants to get summaries about exercises
 * among all students. See API docs for details (`?all` param)
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.gradesActions
 */
export let getExerciseSummaries = (courseId, allStudents) => (dispatch) => {
	let url =
		`${REACT_APP_API_URL}/course/${courseId}/exercise-summary` +
		(allStudents ? '?all=true' : '')
	return fetch(url, {
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
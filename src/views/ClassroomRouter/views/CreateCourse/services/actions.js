import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_CREATE_COURSE, CLEAR_MESSAGES } = types;

/**
 * @namespace storeState.views.classroom.createCourseActions
 */

/**
 * @async
 * @function
 * @param {Object} courseData
 * @param {string} courseData.name
 * @param {string} courseData.about
 * @param {string} courseData.type
 * @param {boolean} courseData.hasPassword
 * @param {?string} courseData.password
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.classroom.createCourseActions
 */
export let createCourse = (courseData) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/create`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(courseData)
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);
		dispatch({
		type: API_CREATE_COURSE,
		payload: data
	})})
	.catch(err => console.log(err))
}
/**
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.classroom.createCourseActions
 */
export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}

import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let { API_CREATE_COURSE, CLEAR_MESSAGES } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let createCourse = (courseData) => (dispatch) => {
	console.log(courseData);
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

// add actions to change message explicitely

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}

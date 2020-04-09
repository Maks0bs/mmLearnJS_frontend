import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import { getCoursesFiltered } from '../../../../../../../services/actions'
let { API_EDIT_COURSE, CLEAR_MESSAGES, API_GET_COURSE_BY_ID, UPDATE_SECTIONS } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let updateSections = (sections) => (dispatch) => {
	dispatch({
		type:  UPDATE_SECTIONS,
		payload: sections
	})
}

export let saveChanges = (courseData) => (dispatch) => { 
	console.log(courseData);
	return fetch(`${REACT_APP_API_URL}/courses/update`, {
		method: "PUT",
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
		type: API_EDIT_COURSE,
		payload: data
	})})
	.catch(err => console.log(err))
}

export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}

// add actions to change message explicitely

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}

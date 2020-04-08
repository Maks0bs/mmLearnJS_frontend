import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import { getCoursesFiltered } from '../../../../../../../services/actions'
let { API_EDIT_COURSE, CLEAR_MESSAGES, API_GET_COURSE_BY_ID } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let editCourse = () => (dispatch) => {
	dispatch({
		type: API_EDIT_COURSE
	})
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

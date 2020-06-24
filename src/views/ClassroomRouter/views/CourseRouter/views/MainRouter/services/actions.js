import { getCoursesFiltered } from '../../../../../../../services/actions'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import types from './actionTypes'

let { 
	API_GET_COURSE_BY_ID,
	API_VIEW_COURSE
} = types;

export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId,
			viewCourses: true
		},
		API_GET_COURSE_BY_ID
	))
}

export let viewCourse = (courseId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/view/${courseId}`, {
		method: "POST",
		headers: {
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: API_VIEW_COURSE,
				payload: data
			})
		})
		.catch(err => console.log(err))
}
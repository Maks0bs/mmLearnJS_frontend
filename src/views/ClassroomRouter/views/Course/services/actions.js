import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
let { API_GET_COURSE_BY_ID } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

// not used atm
export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}
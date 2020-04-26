import { getCoursesFiltered } from '../../../../../../../services/actions'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import types from './actionTypes'

let { 
	API_GET_COURSE_BY_ID
} = types;

export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}
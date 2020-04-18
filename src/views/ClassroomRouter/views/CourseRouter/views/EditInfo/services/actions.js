import { updateCourse } from '../../../services/actions'
import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../../../services/actions'
let { API_UPDATE_COURSE_INFO, API_GET_COURSE_BY_ID } = types;


export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}

export let editCourse = (courseData, id) => (dispatch) => {
	let data = {};
	data.newCourseData = courseData
	return dispatch(updateCourse(
		data,
		id,
		API_UPDATE_COURSE_INFO
	))
}
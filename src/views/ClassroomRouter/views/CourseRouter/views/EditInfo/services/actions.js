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
	let form = new FormData();
	form.set('newCourseData', JSON.stringify(courseData));
	return dispatch(updateCourse(
		form,
		id,
		API_UPDATE_COURSE_INFO
	))
}
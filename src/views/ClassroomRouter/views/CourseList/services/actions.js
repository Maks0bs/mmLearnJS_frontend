import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
let {
	API_GET_OPEN_COURSES,
	API_GET_TEACHER_COURSES,
	API_GET_ENROLLED_COURSES ,
	API_GET_NOT_VIEWED_NOTIFICATIONS
} = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let getOpenCourses = () => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			type: 'open'
		},
		API_GET_OPEN_COURSES
	))
}


// not used atm
export let getEnrolledCourses = (userId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			enrolled: userId
		},
		API_GET_ENROLLED_COURSES
	))
}

// not used atm
export let getTeacherCourses = (userId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			teacher: userId
		},
		API_GET_TEACHER_COURSES
	))
}

export let getNotViewedNotification = (courses) => (dispatch) => {
	//TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
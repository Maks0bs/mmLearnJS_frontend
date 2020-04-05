import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_GET_COURSE_BY_ID, GET_ENROLLMENT_STATUS, API_ENROLL_IN_COURSE, CLEAR_MESSAGES } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: 'CLEAR_MESSAGES'
	})
}

// not used atm
export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}

export let getEnrollmentStatus = (courseId, user) => (dispatch) => {
	let result = 'not enrolled';//change to normal constants
	if (!user || !user._id){
		return dispatch({
			type: GET_ENROLLMENT_STATUS,
			payload: 'not logged in'
		})
	}


	let courses = user.enrolledCourses;

	for (let i of courses) {
		if (i === courseId){
			result = 'enrolled';
			break;
		}
	}

	return dispatch({
		type: GET_ENROLLMENT_STATUS,
		payload: result
	})
}

export let enrollInCourse = (data) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/enroll`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_ENROLL_IN_COURSE,
		payload: data
	}))
	.catch(err => console.log(err))
}
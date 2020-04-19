import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../../../services/actions'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let { 
	API_GET_COURSE_BY_ID, 
	API_ENROLL_IN_COURSE, 
	CLEAR_MESSAGES,
	API_DELETE_COURSE,
	API_ACCEPT_INVITE,
	API_SEND_TEACHER_INVITE
} = types;

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


export let enrollInCourse = (data) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/enroll/${data._id}`, {
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

export let deleteCourse = (courseId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_DELETE_COURSE,
		payload: data
	}))
}

export let acceptTeacherInvite = (courseId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/accept-teacher-invite/${courseId}`, {
		method: "POST",
		headers: {
			Accept: 'application/json'
		},
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_ACCEPT_INVITE,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let sendTeacherInvite = (email, courseId) => (dispatch) => {
	console.log('email', email, 'course id', courseId);
	return fetch(`${REACT_APP_API_URL}/courses/send-teacher-invite/${courseId}`, {
		method: "POST",
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email
		}),
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_SEND_TEACHER_INVITE,
		payload: data
	}))
	.catch(err => console.log(err))
}
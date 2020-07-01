import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
import {REACT_APP_API_URL} from "../../../../../constants";
let {
	API_GET_OPEN_COURSES,
	API_GET_TEACHER_COURSES,
	API_GET_ENROLLED_COURSES ,
	API_GET_NOT_VIEWED_NOTIFICATIONS,
	CLEAR_NOTIFICATIONS
} = types;

export let getOpenCourses = () => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			type: 'open',
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_GET_OPEN_COURSES
	))
}


export let getEnrolledCourses = (userId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			enrolled: userId,
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_GET_ENROLLED_COURSES
	))
}

export let getTeacherCourses = (userId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			teacher: userId,
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_GET_TEACHER_COURSES
	))
}

export let clearNotifications = () => (dispatch) => {
	return dispatch({
		type: CLEAR_NOTIFICATIONS
	})
}

export let addNotViewedNotifications = (courses) => (dispatch) => {
	//console.log(courses);
	return fetch(`${REACT_APP_API_URL}/courses/updates-notifications`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({
			courses
		})
	})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: API_GET_NOT_VIEWED_NOTIFICATIONS,
				payload: data
			})
		})
		.catch(err => console.log(err))
}
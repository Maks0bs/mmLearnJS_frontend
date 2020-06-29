import { combineReducers } from 'redux'
import types from './actionTypes'
let {
	API_GET_OPEN_COURSES,
	API_GET_ENROLLED_COURSES,
	API_GET_TEACHER_COURSES,
	API_GET_NOT_VIEWED_NOTIFICATIONS,
	CLEAR_NOTIFICATIONS
} = types;

let initialState = {
	enrolledCourses: [],
	teacherCourses: [],
	openCourses: [],
	/**
	 * notViewedNotifications saves the amount of updates, which the user hasn't seen since the last visit
	 * as the value for the corresponding course id (which is the key)
	 */
	notViewedNotifications: {},
	error: ''
}
export default  function(state = initialState, action) {
	switch(action.type){
		case CLEAR_NOTIFICATIONS: {
			return {
				...state,
				notViewedNotifications: {},
				error: ''
			}
		}
		case API_GET_NOT_VIEWED_NOTIFICATIONS: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				notViewedNotifications: action.payload
			}
		}
		case API_GET_OPEN_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				openCourses: action.payload
			}
		}
		case API_GET_ENROLLED_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				enrolledCourses: action.payload
			}
		}
		case API_GET_TEACHER_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				teacherCourses: action.payload
			}
		}
		default:
			return state;
	}
}

import { combineReducers } from 'redux'
import types from './actionTypes'
let { API_GET_COURSE_BY_ID, GET_ENROLLMENT_STATUS, API_ENROLL_IN_COURSE, CLEAR_MESSAGES } = types;

let initialState = {
	courseData: {},
	enrollmentStatus: 'not logged in',
	enrollmentMessage: '',
	enrollmentError: ''
}

export default  function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID:
			return {
				...state,
				courseData: action.payload[0]
			}
		case GET_ENROLLMENT_STATUS:
			return {
				...state,
				enrollmentStatus: action.payload
			}
		case API_ENROLL_IN_COURSE:
			return {
				...state,
				enrollmentMessage: action.payload.message,
				enrollmentError: action.payload.error && action.payload.error.message
			}
		case CLEAR_MESSAGES:
			return {
				...state,
				enrollmentMessage: '',
				enrollmentError: ''
			}
		default: 
			return state;
	}
}

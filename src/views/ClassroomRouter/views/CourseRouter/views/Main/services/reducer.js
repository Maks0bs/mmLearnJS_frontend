import { combineReducers } from 'redux'
import types from './actionTypes'
let { 
	API_GET_COURSE_BY_ID, 
	API_ENROLL_IN_COURSE, 
	CLEAR_MESSAGES, 
	API_DELETE_COURSE,
	API_ACCEPT_INVITE,
	API_SEND_TEACHER_INVITE
} = types;

let initialState = {
	courseData: {},
	enrollmentMessage: '',
	enrollmentError: '',
	redirectToDashboard: false,
	error: '',
	upd: 0
}

export default  function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID:
			return {
				...state,
				courseData: action.payload[0]
			}
		case API_ENROLL_IN_COURSE:
			return {
				...state,
				enrollmentMessage: action.payload.message,
				enrollmentError: action.payload.error && action.payload.error.message
			}
		case API_DELETE_COURSE: {
			return {
				...state,
				//courseData: {},
				redirectToDashboard: true
			}
		}
		case API_ACCEPT_INVITE:
			return {
				...state,
				error: action.payload.error && action.payload.error.message,
				upd: state.upd + 1
			}
		case API_SEND_TEACHER_INVITE:
			return {
				...state,
				error: action.payload.error && action.payload.error.message
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

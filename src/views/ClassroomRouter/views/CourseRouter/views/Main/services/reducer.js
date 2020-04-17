import { combineReducers } from 'redux'
import types from './actionTypes'
let { 
	API_GET_COURSE_BY_ID, 
	API_ENROLL_IN_COURSE, 
	CLEAR_MESSAGES, 
	API_DELETE_COURSE 
} = types;

let initialState = {
	courseData: {},
	enrollmentMessage: '',
	enrollmentError: '',
	redirectToDashboard: false
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

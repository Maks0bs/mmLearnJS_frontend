import { combineReducers } from 'redux'
import types from './actionTypes'
let {
	API_ENROLL_IN_COURSE, 
	CLEAR_MESSAGES, 
	API_DELETE_COURSE,
	API_ACCEPT_INVITE,
	API_SEND_TEACHER_INVITE,
	API_SUBSCRIBE,
	API_UNSUBSCRIBE
} = types;

let initialState = {
	redirectToDashboard: false,
	message: '',
	error: ''
}


export default function(state = initialState, action) {
	switch(action.type){
		case API_DELETE_COURSE: {
			return {
				...state,
				redirectToDashboard: true
			}
		}
		case API_ACCEPT_INVITE:
		case API_SUBSCRIBE:
		case API_UNSUBSCRIBE:
		case API_ENROLL_IN_COURSE:
		case API_SEND_TEACHER_INVITE:
			return {
				...state,
				message: action.payload.message ? action.payload.message : '',
				error: action.payload.error ? action.payload.error.message : ''
			}
		case CLEAR_MESSAGES:
			return {
				...state,
				error: '',
				message: ''
			}
		default: 
			return state;
	}
}

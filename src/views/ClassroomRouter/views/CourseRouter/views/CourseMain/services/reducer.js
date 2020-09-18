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
	message: '',
	error: ''
}

/**
 * @function courseMainReducer
 * @param {ErrorAndMessageState} state
 * @param {state} state.message
 * @param {state|Object} state.error
 * @param {ReduxAction} action
 * @return {ErrorAndMessageState}
 *
 * @memberOf storeState.views.classroom.course
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_DELETE_COURSE:
		case API_ACCEPT_INVITE:
		case API_SUBSCRIBE:
		case API_UNSUBSCRIBE:
		case API_ENROLL_IN_COURSE:
		case API_SEND_TEACHER_INVITE:
			return {
				...state,
				message: action.payload.message ? action.payload.message : '',
				error: action.payload.error ? (
					action.payload.error.message || action.payload.error
				) : ''
			}
		case CLEAR_MESSAGES:
			return initialState;
		default: 
			return state;
	}
}

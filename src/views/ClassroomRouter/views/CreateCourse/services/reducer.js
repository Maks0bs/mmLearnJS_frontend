import types from './actionTypes'
let { API_CREATE_COURSE, CLEAR_MESSAGES } = types;

let initialState = {
	message: '',
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_CREATE_COURSE:
			console.log(action.payload);
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && action.payload.error.message
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
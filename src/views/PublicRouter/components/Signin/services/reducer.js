import types from './actionTypes'
let { API_SIGNIN } = types;

let initialState = {
	message: '',
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_SIGNIN:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && action.payload.error.message
			}
		default:
			return state;
	}
}
import types from './actionTypes'
let { API_RESET_PASSWORD } = types;

let initialState = {
	message: '',
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_RESET_PASSWORD:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && action.payload.error.message
			}
		default:
			return state;
	}
}
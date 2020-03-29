import types from './actionTypes'
let { API_SIGNUP } = types;

let initialState = {
	message: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_SIGNUP:
			return {
				...state,
				message: action.payload.message
			}
		default:
			return state;
	}
}
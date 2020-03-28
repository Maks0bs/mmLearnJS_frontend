import types from './actionTypes'
let { API_ACTIVATE_ACCOUNT } = types;

let initialState = {
	message: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_ACTIVATE_ACCOUNT:
			return {
				...state,
				message: action.payload.message
			}
		default:
			return state;
	}
}
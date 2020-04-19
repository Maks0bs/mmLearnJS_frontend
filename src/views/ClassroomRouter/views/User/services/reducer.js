import types from './actionTypes'
let { API_GET_USER_BY_ID } = types;

let initialState = {
	user: null
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_GET_USER_BY_ID:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}
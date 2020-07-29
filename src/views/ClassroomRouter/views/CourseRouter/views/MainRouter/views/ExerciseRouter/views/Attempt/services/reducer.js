import types from './actionTypes'
let {
	GET_ATTEMPT_BY_ID
} = types;

let initialState = {
	attempt: {},
	error: ''
}

export default function(state = initialState, action) {

	switch(action.type){
		case GET_ATTEMPT_BY_ID: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}

			return {
				...state,
				attempt: action.payload.attempt
			}
		}
		default:
			return state;
	}
}

import types from './actionTypes'
let { API_FETCH_NEWS, CLEANUP } = types;

let initialState = {
	newsEntries: null,
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_FETCH_NEWS:
			return {
				...state,
				newsEntries: [...action.payload]
			}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}
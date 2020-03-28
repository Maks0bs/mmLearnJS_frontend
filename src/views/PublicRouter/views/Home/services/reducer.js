import types from './actionTypes'
let { API_FETCH_NEWS } = types;

let initialState = {
	newsEntries: []
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_FETCH_NEWS:
			return {
				...state,
				newsEntries: [...action.payload]
			}
		default:
			return state;
	}
}
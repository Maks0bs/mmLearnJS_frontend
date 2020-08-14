import types from './actionTypes'
let {
	API_SEARCH_COURSES,
	CLEANUP
} = types;

let initialState = {
	error: '',
	courses: null
}
export default  function(state = initialState, action) {
	switch(action.type){
		case API_SEARCH_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				courses: action.payload
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}

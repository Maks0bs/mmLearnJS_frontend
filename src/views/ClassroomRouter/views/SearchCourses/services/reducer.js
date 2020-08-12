import types from './actionTypes'
let {
	API_SEARCH_COURSES
} = types;

let initialState = {
	error: '',
	courses: []
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
		default:
			return state;
	}
}

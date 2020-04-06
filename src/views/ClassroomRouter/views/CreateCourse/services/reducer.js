import types from './actionTypes'
let { API_CREATE_COURSE, CLEAR_MESSAGES } = types;

let initialState = {
	message: '',
	error: '',
	newCourseId: null
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_CREATE_COURSE:
			console.log(action.payload);
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && action.payload.error.message,
				newCourseId: action.payload._id && action.payload._id
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
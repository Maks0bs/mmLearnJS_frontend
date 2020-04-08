import types from './actionTypes'
let { API_EDIT_COURSE, CLEAR_MESSAGES, API_GET_COURSE_BY_ID } = types;

let initialState = {
	message: '',
	error: '',
	oldCourseData: {}
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID:
			return {
				...state,
				oldCourseData: action.payload[0]
			}
		case API_EDIT_COURSE:
			return {
				...state
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
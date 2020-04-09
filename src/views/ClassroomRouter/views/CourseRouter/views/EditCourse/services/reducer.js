import types from './actionTypes'
let { API_EDIT_COURSE, CLEAR_MESSAGES, API_GET_COURSE_BY_ID, UPDATE_SECTIONS } = types;

let initialState = {
	message: '',
	error: '',
	oldCourseData: {},
	courseData: {}
}

export default function(state = initialState, action) {
	switch(action.type){
		case UPDATE_SECTIONS:
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: action.payload
				}
			}
		case API_GET_COURSE_BY_ID:
			return {
				...state,
				oldCourseData: action.payload[0],
				courseData: action.payload[0]
			}
		case API_EDIT_COURSE:
			console.log('edit course');
			return {
				...state
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
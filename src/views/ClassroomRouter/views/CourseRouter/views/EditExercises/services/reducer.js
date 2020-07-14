import types from './actionTypes'
let { 
	API_GET_COURSE_BY_ID
} = types;

let initialState = {
	oldCourseData: {},
	courseData: {},
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID: {
			return {
				...state,
				oldCourseData: action.payload[0],
				courseData: action.payload[0]
			}
		}
		default:
			return state;
	}
}
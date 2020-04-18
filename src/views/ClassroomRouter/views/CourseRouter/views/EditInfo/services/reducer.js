import types from './actionTypes'
let { 
	API_UPDATE_COURSE_INFO,
	API_GET_COURSE_BY_ID
} = types;

let initialState = {
	courseData: {},
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID: {
			return {
				...state,
				courseData: action.payload[0]
			}
		}
		case API_UPDATE_COURSE_INFO: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error
				}
			}
			return state;
		}
		default:
			return state;
	}
}
import { combineReducers } from 'redux'
import types from './actionTypes'
let { API_GET_OPEN_COURSES, API_GET_ENROLLED_COURSES, API_GET_TEACHER_COURSES } = types;

let initialState = {
	enrolledCourses: [],
	teacherCourses: [],
	openCourses: []
}

export default  function(state = initialState, action) {
	switch(action.type){
		case API_GET_OPEN_COURSES:
			return {
				...state,
				openCourses: action.payload
			}
		case API_GET_ENROLLED_COURSES:
			return {
				...state,
				enrolledCourses: action.payload
			}
		case API_GET_TEACHER_COURSES:
			return {
				...state,
				teacherCourses: action.payload
			}
		default:
			return state;
	}
}

import { combineReducers } from 'redux'
import types from './actionTypes'
let { API_GET_COURSE_BY_ID } = types;

let initialState = {
	courseData: {}
}

export default  function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID:
			return {
				...state,
				courseData: action.payload
			}
		default:
			return state;
	}
}

import { combineReducers } from 'redux'
import types from './actionTypes'

let initialState = {
	enrolledCourses: [],
	teacherCourses: []
}

export default  function(state = initialState, action) {
	switch(action.type){
		default:
			return state;
	}
}

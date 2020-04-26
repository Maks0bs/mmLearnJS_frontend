import { combineReducers } from 'redux'
import infoReducer from '../views/Info/services/reducer'
import forumReducer from '../views/Forum/services/reducer'
import types from './actionTypes'
let {
	API_GET_COURSE_BY_ID
} = types;

let initialState = {
	courseData: {}
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID:
			return {
				...state,
				courseData: action.payload[0]
			}
		default: 
			return state;
	}
}

export default combineReducers({
	info: infoReducer,
	forum: forumReducer,
	services: servicesReducer
})
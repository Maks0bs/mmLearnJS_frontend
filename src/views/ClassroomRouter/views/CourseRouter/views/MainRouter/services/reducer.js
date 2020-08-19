import { combineReducers } from 'redux'
import infoReducer from '../views/Info/services/reducer'
import forumReducer from '../views/ForumRouter/services/reducer'
import exerciseReducer from '../views/ExerciseRouter/services/reducer'
import gradesReducer from '../views/GradesRouter/services/reducer'
import types from './actionTypes'
import {isEqual} from "lodash";
let {
	API_GET_COURSE_BY_ID,
	API_VIEW_COURSE,
	CLEANUP
} = types;

let initialState = {
	courseData: {}
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID: {
			return {
				...state,
				courseData: action.payload[0]
			}
		}

		case CLEANUP: {
			return initialState;
		}
		case API_VIEW_COURSE:
		default: 
			return state;
	}
}

export default combineReducers({
	info: infoReducer,
	forum: forumReducer,
	exercise: exerciseReducer,
	services: servicesReducer,
	grades: gradesReducer
})
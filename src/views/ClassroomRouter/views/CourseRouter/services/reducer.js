import { combineReducers } from 'redux'
import mainReducer from '../views/MainRouter/services/reducer'
import editContentReducer from '../views/EditContent/services/reducer'
import editInfoReducer from '../views/EditInfo/services/reducer'
import editExercisesReducer from '../views/EditExercises/services/reducer'
import types from './actionTypes'
let {
	API_GET_COURSE_BY_ID,
	API_UPDATE_COURSE
} = types;

/**
 * @namespace storeState.views.classroom.course
 */

/**
 * @typedef CourseExercise
 * @type Object
 */
/**
 * @typedef CourseEntry
 * @type Object
 */
/**
 * @typedef CourseSection
 * @type Object
 * @property {string} name
 * @property {string} description
 * @property {CourseEntry[]} entries
 */
/**
 * @typedef CourseUpdate
 * @type Object
 */
/**
 * @typedef CourseData
 * @description See API docs for details
 * @type Object
 * @property {string} name
 * @property {?string|UserData} creator
 * @property {?string[]|UserData[]} teachers
 * @property {?string[]|UserData[]} students
 * @property {?string[]|UserData[]} invitedTeachers
 * @property {?string[]|UserData[]} subscribers
 * @property {?string} type
 * @property {string} about
 * @property {?CourseUpdate[]} updates
 * @property {CourseSection[]} sections
 * @property {CourseExercise[]} exercises
 */

/**
 * @typedef CourseRouterState
 * @type Object
 * @property {?CourseData} course
 * @property {Object|string} error
 */

let initialState = {
	course: null,
	error: ''
}
/**
 * @function courseServicesReducer
 * @param {CourseRouterState} state
 * @param {?CourseData} state.course
 * @param {Object|string} state.error
 * @param {ReduxAction} action
 * @return {CourseRouterState}
 *
 * @memberOf storeState.views.classroom.course
 */
let courseServicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID: {
			return {
				...state,
				course: action.payload[0]
			}
		}

		default: {
			return state
		}
	}
}

export default combineReducers({
	services: courseServicesReducer,
	main: mainReducer,
	editContent: editContentReducer,
	editInfo: editInfoReducer,
	editExercises: editExercisesReducer
})
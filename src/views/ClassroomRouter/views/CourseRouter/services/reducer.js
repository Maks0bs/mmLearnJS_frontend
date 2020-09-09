import { combineReducers } from 'redux'
import mainReducer from '../views/MainRouter/services/reducer'
import editContentReducer from '../views/EditContent/services/reducer'
import editExercisesReducer from '../views/EditExercises/services/reducer'
import { getCurUserCourseStatus, COURSE_USER_STATUS } from "./helpers";
import types from './actionTypes'
let {
	API_GET_COURSE_BY_ID,
	API_UPDATE_COURSE,
	API_UPDATE_COURSE_JSON_ONLY
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
 * @property {string} _id
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
	curUserCourseStatus: COURSE_USER_STATUS.NOT_AUTHENTICATED,
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
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			let newState = {
				...state,
				course: action.payload[0]
			}
			if (action.user){

				newState.curUserCourseStatus = getCurUserCourseStatus(
					action.payload[0], action.user
				)
			}
			return newState;
		}
		case API_UPDATE_COURSE:
		case API_UPDATE_COURSE_JSON_ONLY: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return state;
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
	editExercises: editExercisesReducer
})
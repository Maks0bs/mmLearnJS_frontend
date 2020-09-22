import { combineReducers } from 'redux'
import editContentReducer from '../views/EditContent/services/reducer'
import editExercisesReducer from '../views/EditExercises/services/reducer'
import { getCurUserCourseStatus, COURSE_USER_STATUS } from "./helpers";
import types from './actionTypes'
import mainReducer from "../views/CourseMain/services/reducer";
import forumReducer from "../views/ForumRouter/services/reducer";
import exerciseReducer from "../views/ExerciseRouter/services/reducer";
import gradesReducer from "../views/GradesRouter/services/reducer";
let {
	API_GET_COURSE_BY_ID,
	API_UPDATE_COURSE,
	API_UPDATE_COURSE_JSON_ONLY,
	CLEAR_ERROR,
	API_VIEW_COURSE,
	CLEANUP,
	GET_FIRST_TIME_STATUS
} = types;

/**
 * @namespace storeState.views.classroom.course
 */

/**
 * @typedef CourseTask
 * @type Object
 */

/**
 * @typedef CourseExerciseAttempt
 * @type Object
 */

/**
 * @typedef CourseExercise
 * @type Object
 * @property {string} _id
 * @property {string} name
 * @property {?boolean} [available]
 * @property {number} weight
 * @property {CourseTask[]} tasks
 * @property {Object[]} participants
 * @property {?UserData|string} [participants.user]
 * @property {?CourseExerciseAttempt[]} [participants.attempts]
 * @property {?boolean} expanded
 */
/**
 * @typedef CourseEntry
 * @type Object
 * @property {string} name
 * @property {Object|any} content
 * @property {string} type
 * @property {string} access
 * @property {?string} [deletedId] - the id of the deleted entry while editing
 */
/**
 * @typedef CourseSection
 * @type Object
 * @property {string} name
 * @property {string} description
 * @property {CourseEntry[]} entries
 * @property {?string} [deletedId] - the id of the deleted section while editing
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
 * @property {number} __v - version of the course (how many updates have occured)
 */

/**
 * @typedef CourseRouterState
 * @type Object
 * @property {?CourseData} course
 * @property {Object|string} error
 * @property {string} curUserCourseStatus - the status of the user in relation
 * to the course (enrolled, teacher, not enrolled, invited teacher, etc)
 * @property {boolean} firstTime - specifies if the user
 * is visiting the course router for the first time in the browser
 */

let initialState = {
	course: null,
	curUserCourseStatus: COURSE_USER_STATUS.NOT_AUTHENTICATED,
	error: '',
	firstTime: false
}
/**
 * @function courseServicesReducer
 * @param {CourseRouterState} state
 * @param {?CourseData} state.course
 * @param {Object|string} state.error
 * @param {string} state.curUserCourseStatus - the status of the user in relation
 * to the course (enrolled, teacher, not enrolled, invited teacher, etc)
 * @param {boolean} state.firstTime - specifies if the user
 * is visiting the course router for the first time in the browser
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
			let newState = {};
			if (!state.course || (state.course.__v !== action.payload.__v)){
				newState = {
					...state,
					course: action.payload[0]
				}
			}

			if (action.user){
				newState.curUserCourseStatus = getCurUserCourseStatus(
					action.payload[0], action.user
				)
			}
			return newState;
		}
		case API_VIEW_COURSE:
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
		case GET_FIRST_TIME_STATUS: {
			// avoid unnecessary updates
			if (state.firstTime === action.payload){
				return state;
			} else {
				return {
					...state,
					firstTime: action.payload
				}
			}
		}
		case CLEAR_ERROR: {
			return {
				...state,
				error: ''
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default: {
			return state
		}
	}
}

export default combineReducers({
	services: courseServicesReducer,
	editContent: editContentReducer,
	editExercises: editExercisesReducer,
	main: mainReducer,
	forum: forumReducer,
	exercise: exerciseReducer,
	grades: gradesReducer,
})
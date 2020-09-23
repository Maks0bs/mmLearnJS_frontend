import types from './actionTypes'
let { API_CREATE_COURSE, CLEAR_MESSAGES } = types;

/**
 * @typedef CreateCourseState
 * @type Object
 * @property {string} message
 * @property {string|Object} error
 * @property {?string} newCourseId - the id of the course that has been created after the api
 * call to add a new course
 */

let initialState = {
	message: '',
	error: '',
	newCourseId: null
}

/**
 * @function createCourseReducer
 * @param {CreateCourseState} state
 * @param {string} state.message
 * @param  {string|Object} state.error
 * @param {?string} state.newCourseId - the id of the course that has been created after the api
 * call to add a new course
 * @param {ReduxAction} action
 * @return {CreateCourseState}
 *
 * @memberOf storeState.views.classroom
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_CREATE_COURSE:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && JSON.stringify(
					action.payload.error.message || action.payload.error
				),
				newCourseId: action.payload._id && action.payload._id
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
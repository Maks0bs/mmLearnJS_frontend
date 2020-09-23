import types from './actionTypes'
let {API_SEARCH_COURSES, CLEANUP} = types;

/**
 * @typedef SearchCoursesState
 * @type Object
 * @property {string|Object} error
 * @property {?Object[]} courses - the list of courses that have been found by
 * the given search query
 */

let initialState = {
	error: '',
	courses: null
}
/**
 * @function searchCoursesReducer
 * @param {SearchCoursesState} state
 * @param {string|Object} state.error
 * @param {?Object[]} state.courses - the list of courses that have been found by
 * the given search query
 * @param {ReduxAction} action
 * @return {SearchCoursesState}
 *
 * @memberOf storeState.views.classroom
 */
export default  function(state = initialState, action) {
	switch(action.type){
		case API_SEARCH_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					)
				}
			}
			return {
				...state,
				courses: action.payload
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}

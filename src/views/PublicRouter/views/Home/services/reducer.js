import types from './actionTypes'
let { API_FETCH_NEWS, CLEANUP } = types;

/**
 * @typedef HomeState
 * @type Object
 * @property {Object[]} newsEntries
 * @property {string|Object} error -
 */
let initialState = {
	newsEntries: null,
	error: ''
}
/**
 * @function homeReducer
 * @param {HomeState} state
 * @param {Object[]} state.newsEntries
 * @param {string|Object} state.error
 * @param {ReduxAction} action
 * @return {HomeState}
 *
 * @memberOf storeState.views.public
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_FETCH_NEWS:
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
				newsEntries: [...action.payload]
			}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}
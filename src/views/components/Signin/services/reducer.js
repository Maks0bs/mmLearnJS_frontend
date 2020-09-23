import types from './actionTypes'
let { API_SIGNIN, CLEAR_MESSAGES } = types;

/**
 * @typedef SigninState
 * @type Object
 * @property {string} message - the message about signin status
 * @property {string} error - any error messages that can happen during the
 * log in process
 */

let initialState = {
	message: '',
	error: ''
}
/**
 * @function signinReducer
 * @param {SigninState} state
 * @param {string} state.message - the message about signin status
 * @param {string|Object} state.error - any error messages that can happen during the log in process
 * @param {ReduxAction} action
 * @return {SigninState}
 *
 * @memberOf storeState.views.serviceComponents
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_SIGNIN:
			return {
				...state,
				message: JSON.stringify(action.payload.message),
				error: action.payload.error && JSON.stringify(
					action.payload.error ? action.payload.error.message : state.error
				)
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
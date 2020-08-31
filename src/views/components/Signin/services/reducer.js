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
 * @param {state} state.message - the message about signin status
 * @param {state|Object} state.error - any error messages that can happen during the log in process
 * @param {ReduxAction} action
 * @return {SigninState}
 *
 * @memberOf storeState.views.components
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_SIGNIN:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error ? action.payload.error.message : state.error
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
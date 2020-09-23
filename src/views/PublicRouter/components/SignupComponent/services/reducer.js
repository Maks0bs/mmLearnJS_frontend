import types from './actionTypes'
let { API_SIGNUP, CLEAR_MESSAGES, API_SIGNUP_INVITE } = types;

let initialState = {
	message: '',
	error: ''
}
/**
 * @function signupReducer
 * @param {ErrorAndMessageState} state
 * @param {state} state.message - message about the status of created account
 * @param {state|Object} state.error
 * @param {ReduxAction} action
 * @return {ErrorAndMessageState}
 *
 * @memberOf storeState.views.public
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_SIGNUP:
		case API_SIGNUP_INVITE:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && JSON.stringify(
					action.payload.error.message || action.payload.error
				)
			}
		case CLEAR_MESSAGES:
			return initialState
		default:
			return state;
	}
}
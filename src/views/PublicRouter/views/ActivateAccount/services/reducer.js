import types from './actionTypes'
let { API_ACTIVATE_ACCOUNT, CLEAR_MESSAGES } = types;

let initialState = {
	message: '',
	error: ''
}

/**
 * @function activateAccountReducer
 * @param {ErrorAndMessageState} state
 * @param {state} state.message
 * @param {state|Object} state.error
 * @param {ReduxAction} action
 * @return {ErrorAndMessageState}
 *
 * @memberOf storeState.views.public
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_ACTIVATE_ACCOUNT:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && JSON.stringify(
					action.payload.error.message || action.payload.error
				)
			}
		case CLEAR_MESSAGES: {
			return initialState;
		}
		default:
			return state;
	}
}
import types from './actionTypes'
let { API_RESET_PASSWORD } = types;

let initialState = {
	message: '',
	error: ''
}

/**
 * @function resetPasswordReducer
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
		case API_RESET_PASSWORD:
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error && JSON.stringify(
					action.payload.error.message || action.payload.error
				)
			}
		default:
			return state;
	}
}
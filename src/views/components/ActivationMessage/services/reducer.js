import types from './actionTypes'
let { TOGGLE_ACTIVATION_MESSAGE, GET_ACTIVATION_MESSAGE_STATUS } = types;

/**
 * @typedef ActivationMessageState
 * @type Object
 * @property {boolean} show - true if the activation message should be displayed
 */

let initialState = {
	show: true 
}

/**
 * @function activationMessageReducer
 * @param {ActivationMessageState} state
 * @param {boolean} state.show
 * @param {ReduxAction} action
 * @return {ActivationMessageState}
 *
 * @memberOf storeState.views.components
 */
export default function(state = initialState, action) {
	switch(action.type) {
		case TOGGLE_ACTIVATION_MESSAGE: {
			return {
				...state,
				show: action.payload
			}
		}
		case GET_ACTIVATION_MESSAGE_STATUS: {
			let value = initialState.show;
			if (typeof window !== 'undefined' && localStorage.getItem(GET_ACTIVATION_MESSAGE_STATUS	)){
				value = JSON.parse(localStorage.getItem(GET_ACTIVATION_MESSAGE_STATUS));
			}
			return {
				...state,
				show: value
			}
		}
		default: 
			return state
	}
}

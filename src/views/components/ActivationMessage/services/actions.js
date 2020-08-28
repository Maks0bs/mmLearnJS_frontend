import types from './actionTypes'
let { TOGGLE_ACTIVATION_MESSAGE, GET_ACTIVATION_MESSAGE_STATUS } = types;

/**
 * @namespace storeState.views.components.activationMessageActions
 */

/**
 * Show/hide the activation message
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.components.activationMessageActions
 */
export let toggleActivationMessage = () => (dispatch) => {
	let curValue = true;
	if (typeof window !== 'undefined' && localStorage.getItem(GET_ACTIVATION_MESSAGE_STATUS)){
		curValue = JSON.parse(localStorage.getItem(GET_ACTIVATION_MESSAGE_STATUS));
	}
	if (typeof window !== 'undefined'){
		localStorage.setItem(GET_ACTIVATION_MESSAGE_STATUS, JSON.stringify(!curValue));
	}
	return dispatch({
		type: TOGGLE_ACTIVATION_MESSAGE,
		payload: !curValue
	})
}


/**
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.components.activationMessageActions
 */
export let getActivationMessageStatus = () => (dispatch) => {
	return dispatch({
		type: GET_ACTIVATION_MESSAGE_STATUS
	})
}
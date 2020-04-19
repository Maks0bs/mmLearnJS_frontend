import types from './actionTypes'

let { TOGGLE_ACTIVATION_MESSAGE, GET_ACTIVATION_MESSAGE_STATUS } = types;

export let toggleActivationMessage = () => (dispatch) => {
	let curValue = true;
	if (typeof window !== 'undefined' && localStorage.getItem(GET_ACTIVATION_MESSAGE_STATUS)){
		curValue = JSON.parse(localStorage.getItem(GET_ACTIVATION_MESSAGE_STATUS));
	}
	if (typeof window !== 'undefined'){
		localStorage.setItem(GET_ACTIVATION_MESSAGE_STATUS, JSON.stringify(!curValue));
	}
	dispatch({
		type: TOGGLE_ACTIVATION_MESSAGE,
		payload: !curValue
	})
}

export let getActivationMessageStatus = () => (dispatch) => {
	dispatch({
		type: GET_ACTIVATION_MESSAGE_STATUS
	})
}
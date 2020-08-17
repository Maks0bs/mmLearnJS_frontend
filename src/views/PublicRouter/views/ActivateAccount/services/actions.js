import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_ACTIVATE_ACCOUNT, CLEAR_MESSAGES } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let activateAccount = (token) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/activate`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({token})
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_ACTIVATE_ACCOUNT,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}
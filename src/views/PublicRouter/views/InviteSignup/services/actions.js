import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_SIGNUP, CLEAR_MESSAGES } = types;

export let inviteSignup = (user) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/invite-signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(user)
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_SIGNUP,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}
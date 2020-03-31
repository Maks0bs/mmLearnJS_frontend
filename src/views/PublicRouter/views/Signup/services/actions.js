import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_SIGNUP, CLEAR_MESSAGES } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let signup = (user) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/signup`, {
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
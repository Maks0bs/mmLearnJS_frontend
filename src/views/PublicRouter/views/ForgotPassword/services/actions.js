import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_FORGOT_PASSWORD } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let forgotPassword = (email) => (dispatch) => {
	console.log(email);
	return fetch(`${REACT_APP_API_URL}/auth/forgot-password`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({
			email: email
		})
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_FORGOT_PASSWORD,
		payload: data
	}))
	.catch(err => console.log(err))
}

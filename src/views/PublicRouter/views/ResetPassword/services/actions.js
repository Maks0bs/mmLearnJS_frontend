import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_RESET_PASSWORD } = types;

export let resetPassword = (password, token) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/reset-password`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({
			token: token,
			newPassword: password
		})
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_RESET_PASSWORD,
		payload: data
	}))
	.catch(err => console.log(err))
}
